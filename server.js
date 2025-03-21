{
  "name": "fair-use-assistant",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "postinstall": "npm install" // Add this line
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^6.9.0",
    "helmet": "^7.0.0",
    "express-validator": "^7.0.1",
    "winston": "^3.10.0",
    "hpp": "^0.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
