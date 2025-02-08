import { LegalCase } from '../types/lawyer';

export const legalCases: LegalCase[] = [
  {
    id: 'stolen-blog',
    title: 'The Stolen Blog Post',
    description: 'A major tech news website copies content from a small blogger without permission.',
    background: 'A small blogger discovers their AI article copied and modified by a major tech news website.',
    clientName: 'Sarah Chen',
    clientRole: 'Independent Tech Blogger',
    evidence: [
      {
        id: 'original-post',
        type: 'document',
        title: 'Original Blog Post',
        content: 'Date: March 1, 2024\n\nTitle: "Breaking Ground: AI\'s Impact on Healthcare"\n\nAuthor: Sarah Chen\nPublication: TechInsights Blog\n\nCopyright Notice: © 2024 Sarah Chen. All rights reserved.\n\nThe article discusses groundbreaking applications of AI in healthcare, featuring original interviews with leading researchers.'
      },
      {
        id: 'copied-article',
        type: 'screenshot',
        title: 'TechGiant News Article',
        content: 'Date: March 5, 2024\n\nTitle: "AI Revolution in Healthcare"\n\nThe article contains multiple paragraphs copied verbatim from Sarah\'s blog, with minor word changes and no attribution. The copied content makes up approximately 70% of the article.'
      }
    ],
    options: [
      {
        id: 'dmca-notice',
        text: 'Send a DMCA Takedown Notice',
        explanation: 'File a formal DMCA notice to have the infringing content removed immediately.',
        consequences: {
          reputation: 10,
          feedback: 'The DMCA notice was effective. The website removed the article within 24 hours and issued an apology.',
          outcome: 'Quick resolution but potentially strained relationship with the news website.'
        }
      },
      {
        id: 'negotiate',
        text: 'Negotiate for Credit and Compensation',
        explanation: 'Contact the website to request proper attribution and compensation.',
        consequences: {
          reputation: 20,
          feedback: 'The website agreed to add proper attribution, pay compensation, and offer a collaboration opportunity.',
          outcome: 'Win-win resolution that maintains professional relationships and sets a positive precedent.'
        }
      },
      {
        id: 'lawsuit',
        text: 'File a Copyright Infringement Lawsuit',
        explanation: 'Take immediate legal action for damages.',
        consequences: {
          reputation: -10,
          feedback: 'The lawsuit created negative publicity and high legal costs, despite eventual settlement.',
          outcome: 'Pyrrhic victory that damaged industry relationships.'
        }
      }
    ],
    correctOption: 'negotiate',
    reward: 100
  },
  {
    id: 'student-publishing',
    title: 'The Student vs. Publishing House',
    description: 'A publishing house includes a student\'s research in their book without permission.',
    background: 'A university student\'s research paper was published in a book without permission or credit.',
    clientName: 'Alex Rivera',
    clientRole: 'Graduate Student',
    evidence: [
      {
        id: 'original-research',
        type: 'document',
        title: 'Original Research Paper',
        content: 'Date: January 15, 2024\n\nTitle: "Novel Approaches to Quantum Computing"\n\nAuthor: Alex Rivera\nUniversity of Technology\n\nPublished on personal academic blog with clear copyright notice.'
      },
      {
        id: 'book-excerpt',
        type: 'document',
        title: 'Published Book Excerpt',
        content: 'Book: "Quantum Computing: The Next Frontier"\nPublisher: Academic Press\nPublication Date: March 2024\n\nPages 45-52 contain Alex\'s research without attribution or permission.'
      }
    ],
    options: [
      {
        id: 'cease-desist',
        text: 'Send Cease and Desist Letter',
        explanation: 'Demand immediate removal from future printings and compensation.',
        consequences: {
          reputation: 5,
          feedback: 'Publisher agreed to remove content from future editions but offered minimal compensation.',
          outcome: 'Partial victory with limited financial benefit.'
        }
      },
      {
        id: 'settlement',
        text: 'Negotiate Private Settlement',
        explanation: 'Work with publisher for fair compensation and proper attribution.',
        consequences: {
          reputation: 15,
          feedback: 'Publisher agreed to add proper attribution, pay fair compensation, and offer future publishing opportunities.',
          outcome: 'Positive resolution that benefits both parties.'
        }
      },
      {
        id: 'public-lawsuit',
        text: 'File Public Lawsuit',
        explanation: 'Sue for copyright infringement and damages.',
        consequences: {
          reputation: -5,
          feedback: 'Case gained media attention but resulted in lengthy legal proceedings and damaged academic relationships.',
          outcome: 'Mixed results with significant time and emotional cost.'
        }
      }
    ],
    correctOption: 'settlement',
    reward: 100
  }
];