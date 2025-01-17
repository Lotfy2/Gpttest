const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, query, validationResult } = require('express-validator');
const winston = require('winston');
const hpp = require('hpp');

// Configure Winston logger for Vercel
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Fair use analysis function
async function analyzeFairUse(content_type, intended_use, description) {
  // Analysis logic remains the same
  const factors = {
    educational: 0.8,
    commentary: 0.7,
    criticism: 0.7,
    research: 0.8,
    commercial: 0.3,
    entertainment: 0.4
  };

  const contentWeights = {
    image: 0.7,
    text: 0.8,
    music: 0.5,
    video: 0.6,
    software: 0.4
  };

  const useScore = factors[intended_use.toLowerCase()] || 0.5;
  const contentScore = contentWeights[content_type.toLowerCase()];
  const isFairUse = (useScore * contentScore) > 0.5;

  return {
    is_fair_use: isFairUse,
    explanation: isFairUse 
      ? `Based on your intended ${intended_use} use of this ${content_type}, this likely qualifies as fair use.`
      : `This use case may not qualify as fair use. Consider obtaining permission.`,
    recommendations: [
      'Always attribute the original work',
      'Use only the portion necessary for your purpose',
      'Consider whether your use could affect the market for the original work',
      'Document your fair use analysis'
    ]
  };
}

// Rights info function
async function getRightsInfo(content_type) {
  const rightsData = {
    image: {
      info: 'Images are protected by copyright as soon as they are created.',
      restrictions: [
        'Cannot be used commercially without permission',
        'Modifications may require permission',
        'Must attribute the creator when required'
      ],
      allowed: [
        'Fair use for education',
        'Personal, non-commercial use',
        'Commentary and criticism',
        'News reporting'
      ]
    },
    text: {
      info: 'Written works are protected by copyright from the moment of creation.',
      restrictions: [
        'Cannot be reproduced without permission',
        'Cannot be distributed commercially',
        'Translations may require permission'
      ],
      allowed: [
        'Quoting small portions with attribution',
        'Academic use with citation',
        'Review and criticism',
        'Personal reference'
      ]
    },
    music: {
      info: 'Music has multiple copyright layers including composition and recording.',
      restrictions: [
        'No public performance without license',
        'No commercial use without permission',
        'No unauthorized sampling'
      ],
      allowed: [
        'Personal listening',
        'Academic analysis',
        'Short quotes for criticism',
        'Classroom use'
      ]
    },
    video: {
      info: 'Videos are protected by multiple copyright elements including visual and audio.',
      restrictions: [
        'No public screening without license',
        'No redistribution without permission',
        'No commercial use without rights'
      ],
      allowed: [
        'Personal viewing',
        'Educational use',
        'Critical review',
        'News reporting'
      ]
    },
    software: {
      info: 'Software is protected by copyright and often additional licenses.',
      restrictions: [
        'No unauthorized distribution',
        'No modification without permission',
        'License terms must be followed'
      ],
      allowed: [
        'Personal use as licensed',
        'Backup copies',
        'Study and research',
        'Fair use analysis'
      ]
    }
  };

  const data = rightsData[content_type.toLowerCase()] || {
    info: 'Content type not recognized',
    restrictions: ['Please specify a valid content type'],
    allowed: ['Please specify a valid content type']
  };

  return {
    rights_info: data.info,
    common_restrictions: data.restrictions,
    allowed_uses: data.allowed
  };
}

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));
app.use(hpp());

// Updated CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Rate limiting - adjusted for serverless
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json({ limit: '10kb' }));

// Legal disclaimer middleware
app.use((req, res, next) => {
  res.setHeader('X-Legal-Disclaimer', 
    'This service provides general information about fair use and copyright. ' +
    'It is not legal advice. Consult a qualified attorney for specific guidance.');
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/.well-known', express.static(path.join(__dirname, '../.well-known')));
app.use('/openapi.yaml', express.static(path.join(__dirname, '../openapi.yaml')));

// Validation middleware
const validateFairUseRequest = [
  body('content_type').trim().notEmpty().isString(),
  body('intended_use').trim().notEmpty().isString(),
  body('description').trim().notEmpty().isString().isLength({ max: 1000 })
];

const validateRightsRequest = [
  query('content_type').trim().notEmpty().isString()
];

// Fair use analysis endpoint
app.post('/api/fair-use/analyze', validateFairUseRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content_type, intended_use, description } = req.body;
    const analysis = await analyzeFairUse(content_type, intended_use, description);
    
    res.json({
      ...analysis,
      disclaimer: 'This analysis is for informational purposes only and should not be considered legal advice.'
    });
  } catch (error) {
    logger.error('Error in fair use analysis:', error);
    res.status(500).json({
      error: 'An error occurred while analyzing fair use',
      requestId: req.id
    });
  }
});

// Rights checking endpoint
app.get('/api/rights/check', validateRightsRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content_type } = req.query;
    const rightsInfo = await getRightsInfo(content_type);
    
    res.json({
      ...rightsInfo,
      disclaimer: 'This information is general in nature and should not be considered legal advice.'
    });
  } catch (error) {
    logger.error('Error in rights check:', error);
    res.status(500).json({
      error: 'An error occurred while checking rights',
      requestId: req.id
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', {
    error: err.message,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    error: 'An unexpected error occurred',
    requestId: req.id
  });
});

// Export the Express app
module.exports = app;

// Only start the server if not being imported
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Fair Use Assistant plugin server running on port ${PORT}`);
  });
}