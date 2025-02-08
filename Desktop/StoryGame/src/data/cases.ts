import { Case } from '../types';

export const cases: Case[] = [
  {
    id: 'alice-vs-bob',
    title: 'Alice vs. Bob - Copyright Violation',
    category: 'Copyright',
    difficulty: 'Easy',
    description: `• 🔍 BREAKING CASE


• 📱 A groundbreaking AI article becomes the center of a heated copyright dispute.


• 👩‍💼 Alice, an investigative journalist, discovers her work copied verbatim on Bob's tech blog.


• ⚖️ Your mission: Navigate the complex waters of copyright law and Fair Use doctrine to deliver justice.


• 🎯 Can you uncover the truth and protect intellectual property rights?`,
    evidence: [
      {
        id: 'copyright-statement',
        type: 'document',
        title: '📜 Original Article & Copyright Notice',
        content: 'Article: "The Future of AI: Breaking New Frontiers"\nAuthor: Alice Johnson\nPublication: Tech Insights Weekly\n\n⚖️ Copyright Notice:\n"All rights reserved. This article cannot be copied without permission."\n\nDate Published: March 15, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200'
      },
      {
        id: 'website-content',
        type: 'document',
        title: '🌐 Bob\'s Website Content',
        content: 'Date Published: March 17, 2024\n\nBob\'s personal tech blog "TechInsights Daily" features Alice\'s article copied word-for-word, without any modifications, commentary, or attribution to the original author. The article appears under the heading "Latest in AI Technology" and is presented as website content, accessible to all visitors.\n\nNo attempt was made to contact the original author or obtain permission for republication.',
      },
      {
        id: 'fair-use-doc',
        type: 'legal',
        title: '⚖️ Fair Use Guidelines',
        content: '# 📋 Fair Use Doctrine: Your Legal Compass\n\n## Key Factors in Fair Use Analysis\n\n### 1. 🎯 Purpose & Character of Use\n\n- Commercial vs. Educational\n  • Is the work being used for profit?\n  • Is it for teaching or research?\n\n- Transformation\n  • Has new value been added?\n  • Does it serve a different purpose?\n\n### 2. 📚 Nature of Copyrighted Work\n\n- Type of Work\n  • Factual or creative content?\n  • Published or unpublished?\n\n- Protection Level\n  • Creative works receive stronger protection\n  • Facts cannot be copyrighted\n\n### 3. 📏 Amount and Substantiality\n\n- Quantity Used\n  • How much of the original was taken?\n  • Was it more than necessary?\n\n- Quality of Portion\n  • Was it the heart of the work?\n  • How essential was the used portion?\n\n### 4. 💹 Market Effect\n\n- Economic Impact\n  • Does it harm potential sales?\n  • Does it affect market value?\n\n- Licensing Opportunities\n  • Could permission have been obtained?\n  • Is there a licensing market?\n\n## ✅ Protected Uses Include\n\n• Education & Research\n• Commentary & Criticism\n• News Reporting\n• Parody\n• Transformative Works\n\n## ❌ Not Protected\n\n• Complete copies without transformation\n• Commercial use without adding value\n• Substitutes for original work\n• Uses that harm the market',
        imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200'
      }
    ],
    interviews: [
      {
        id: 'alice-interview',
        character: 'Alice Johnson',
        role: 'Original Author',
        avatar: '',
        trust: 100,
        dialogue: [
          {
            id: 'intro',
            text: '"This article represents months of research and interviews with leading AI experts. I discovered Bob had copied it entirely - word for word - on his blog. No attribution, no permission, nothing."',
            responses: [
              {
                id: 'copyright-notice',
                text: '📝 Can you tell me about your copyright protection?',
                impact: { trust: 10, evidence: ['copyright-statement'] },
                next: 'notice-response'
              },
              {
                id: 'contact-attempt',
                text: '📱 Did Bob attempt to contact you?',
                impact: { trust: 10, evidence: ['website-content'] },
                next: 'contact-response'
              }
            ]
          },
          {
            id: 'notice-response',
            text: '"Absolutely. Every article I publish includes a clear copyright notice. It\'s right there at the bottom: \'All rights reserved.\' I also register my work with the Copyright Office."'
          },
          {
            id: 'contact-response',
            text: '"No, he never reached out. I only found out when a colleague sent me a link to his site. He didn\'t even try to hide it - it\'s an exact copy."'
          }
        ]
      },
      {
        id: 'bob-interview',
        character: 'Bob Smith',
        role: 'Website Owner',
        avatar: '',
        trust: 100,
        dialogue: [
          {
            id: 'intro',
            text: '"Look, I run a tech blog. The article was interesting, and I wanted to share it with my readers. Isn\'t sharing knowledge what the internet is all about?"',
            responses: [
              {
                id: 'fair-use-knowledge',
                text: '📚 What do you know about Fair Use?',
                impact: { trust: 10, evidence: ['fair-use-doc'] },
                next: 'fair-use-response'
              },
              {
                id: 'modifications',
                text: '✏️ Did you modify the article?',
                impact: { trust: 10, evidence: ['website-content'] },
                next: 'modifications-response'
              }
            ]
          },
          {
            id: 'fair-use-response',
            text: '"Fair Use lets you share information for education, right? I\'m educating people about AI. That\'s what matters, not all these legal technicalities."'
          },
          {
            id: 'modifications-response',
            text: '"No, I didn\'t change anything. The article was perfect as it was. Why mess with good content?"'
          }
        ]
      }
    ],
    options: [
      {
        id: 'copyright-violation',
        text: '⚖️ Rule as Copyright Violation',
        explanation: '🔍 Analysis:\n\n1. Complete Copy: Bob reproduced the entire article without changes\n2. No Transformation: No commentary or analysis added\n3. Clear Copyright Notice: Alice\'s rights were clearly stated\n4. No Fair Use: Copying without transformation isn\'t protected\n\nVerdict: Clear copyright violation requiring immediate action.',
        reasons: [
          'Complete copy without permission',
          'No transformative changes made',
          'Clear copyright notice was present',
          'No educational purpose or commentary added',
          'Potential market harm to original work'
        ],
        consequences: {
          score: 100,
          reputation: 10,
          feedback: '✅ Excellent ruling, Detective!\n\nYou\'ve correctly identified that:\n- Wholesale copying isn\'t Fair Use\n- Copyright notices matter\n- Transformation is key for Fair Use\n\nBob must remove the article and respect copyright law.'
        }
      },
      {
        id: 'fair-use',
        text: '🤝 Rule as Fair Use',
        explanation: 'Accept Bob\'s defense that sharing knowledge online constitutes Fair Use.',
        reasons: [
          'Educational purpose claimed',
          'Information sharing is important',
          'Content was already public',
          'No commercial benefit intended',
          'Original work remains available'
        ],
        consequences: {
          score: -50,
          reputation: -20,
          feedback: '❌ Investigation Error!\n\nKey Issues Missed:\n- Fair Use requires transformation\n- Full copies aren\'t protected\n- Educational use needs more than just sharing\n\nReview the Fair Use guidelines and try again!'
        }
      }
    ],
    correctOption: 'copyright-violation',
    reward: 100
  }
];