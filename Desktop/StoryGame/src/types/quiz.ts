export interface Question {
  id: string;
  category: 'Copyright' | 'Trademark' | 'Patent' | 'Plagiarism' | 'Business';
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  showExplanation: boolean;
  completed: boolean;
}