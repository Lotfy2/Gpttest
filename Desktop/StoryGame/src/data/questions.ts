import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: '1',
    category: 'Copyright',
    text: 'Can You Copyright a Recipe?',
    options: [
      { id: 'A', text: 'Yes, recipes are automatically protected by copyright.' },
      { id: 'B', text: 'No, because copyright does not protect functional things like recipes.' },
      { id: 'C', text: 'Yes, but only if they publish it in a book.' },
      { id: 'D', text: 'No, unless they patent it.' }
    ],
    correctAnswer: 'B',
    explanation: 'Copyright protects creative expression (like a written cookbook) but not the functional aspect of a recipe. A chef could patent a unique cooking process, but not the list of ingredients.'
  },
  {
    id: '2',
    category: 'Copyright',
    text: 'A journalist writes a news report about a political event. Can another news website copy and republish the entire article?',
    options: [
      { id: 'A', text: 'Yes, because news is public information.' },
      { id: 'B', text: 'No, because the specific wording is copyrighted.' },
      { id: 'C', text: 'Yes, if they credit the journalist.' },
      { id: 'D', text: 'No, unless the original publisher allows it.' }
    ],
    correctAnswer: 'B',
    explanation: 'Facts and events are not protected, but the way they are written (the expression) is copyrighted.'
  },
  {
    id: '3',
    category: 'Copyright',
    text: 'A professor delivers an insightful lecture at a university. Can someone record it and publish it online without permission?',
    options: [
      { id: 'A', text: 'Yes, because it was presented in public.' },
      { id: 'B', text: 'No, unless the professor agrees.' },
      { id: 'C', text: 'Yes, if the lecture discusses general knowledge.' },
      { id: 'D', text: 'No, unless the professor wrote it down first.' }
    ],
    correctAnswer: 'B',
    explanation: 'A speech, if original and recorded in some form (written or audio), is protected by copyright.'
  },
  {
    id: '4',
    category: 'Trademark',
    text: 'A shoe company designs sneakers that look almost identical to Nike\'s but removes the logo. Is this a trademark violation?',
    options: [
      { id: 'A', text: 'Yes, because the design itself could cause confusion.' },
      { id: 'B', text: 'No, because they removed the logo.' },
      { id: 'C', text: 'Yes, but only if Nike files a lawsuit.' },
      { id: 'D', text: 'No, because shoes cannot be trademarked.' }
    ],
    correctAnswer: 'A',
    explanation: 'Trademark law protects not just logos but also distinctive designs that could cause consumer confusion.'
  },
  {
    id: '5',
    category: 'Trademark',
    text: 'A chocolate company wants to trademark the color purple for its packaging. Is this possible?',
    options: [
      { id: 'A', text: 'Yes, if the color is strongly associated with the brand.' },
      { id: 'B', text: 'No, because colors cannot be trademarked.' },
      { id: 'C', text: 'Yes, but only for food products.' },
      { id: 'D', text: 'No, unless multiple brands use it.' }
    ],
    correctAnswer: 'A',
    explanation: 'Some companies, like Cadbury and Tiffany & Co., have successfully trademarked specific colors in their industries.'
  },
  {
    id: '6',
    category: 'Patent',
    text: 'A scientist discovers a new mathematical formula that improves computer encryption. Can they patent it?',
    options: [
      { id: 'A', text: 'Yes, because it\'s a new discovery.' },
      { id: 'B', text: 'No, because formulas are considered abstract concepts.' },
      { id: 'C', text: 'Yes, but only if they keep it secret.' },
      { id: 'D', text: 'No, unless it\'s part of a new software application.' }
    ],
    correctAnswer: 'B',
    explanation: 'Mathematical formulas by themselves are not patentable, but their application in an invention may be.'
  },
  {
    id: '7',
    category: 'Patent',
    text: 'A biologist discovers a new type of bacteria in the Amazon. Can they patent it?',
    options: [
      { id: 'A', text: 'Yes, because it\'s a new discovery.' },
      { id: 'B', text: 'No, because natural organisms cannot be patented.' },
      { id: 'C', text: 'Yes, but only if they genetically modify it.' },
      { id: 'D', text: 'No, unless they publish their findings first.' }
    ],
    correctAnswer: 'C',
    explanation: 'Natural discoveries cannot be patented, but genetically modified organisms can be if they serve a unique purpose.'
  },
  {
    id: '8',
    category: 'Plagiarism',
    text: 'A student copies three paragraphs from a research paper into their essay without citation. Is this plagiarism?',
    options: [
      { id: 'A', text: 'Yes, because they did not give credit.' },
      { id: 'B', text: 'No, because they only took a small part.' },
      { id: 'C', text: 'Yes, but only if they publish the essay.' },
      { id: 'D', text: 'No, because research papers are public information.' }
    ],
    correctAnswer: 'A',
    explanation: 'Plagiarism occurs when someone uses another person\'s words or ideas without proper attribution, regardless of length.'
  },
  {
    id: '9',
    category: 'Plagiarism',
    text: 'A professor includes two sentences from a historical book in their research paper without permission. Is this copyright infringement?',
    options: [
      { id: 'A', text: 'No, because short quotes are allowed under fair use.' },
      { id: 'B', text: 'Yes, because all copyrighted content requires permission.' },
      { id: 'C', text: 'No, because academic papers are exempt from copyright laws.' },
      { id: 'D', text: 'Yes, but only if the book\'s author complains.' }
    ],
    correctAnswer: 'A',
    explanation: 'Fair use allows limited use of copyrighted material for educational and research purposes, provided proper attribution is given.'
  },
  {
    id: '10',
    category: 'Business',
    text: 'A startup launches a company called "SpeedTech." A year later, another company in the same industry registers the trademark "SpeedTech Solutions." Who has the stronger claim?',
    options: [
      { id: 'A', text: 'The first company, because they used the name first.' },
      { id: 'B', text: 'The second company, because they registered it.' },
      { id: 'C', text: 'Neither, because generic names can\'t be protected.' },
      { id: 'D', text: 'Both, because they added "Solutions" to the name.' }
    ],
    correctAnswer: 'B',
    explanation: 'Trademark rights depend on registration and industry usage. If the first company did not trademark "SpeedTech," the second company may gain stronger legal protection.'
  }
];