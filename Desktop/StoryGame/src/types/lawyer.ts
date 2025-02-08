export interface LegalCase {
  id: string;
  title: string;
  description: string;
  background: string;
  clientName: string;
  clientRole: string;
  evidence: Evidence[];
  options: LegalOption[];
  correctOption: string;
  reward: number;
}

export interface Evidence {
  id: string;
  type: 'document' | 'email' | 'screenshot';
  title: string;
  content: string;
}

export interface LegalOption {
  id: string;
  text: string;
  explanation: string;
  consequences: {
    reputation: number;
    feedback: string;
    outcome: string;
  };
}

export interface LawyerGameState {
  currentCase: string | null;
  reviewedEvidence: string[];
  selectedOption: string | null;
  reputation: number;
  casesWon: number;
  completed: boolean;
}