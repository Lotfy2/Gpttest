export interface Case {
  id: string;
  title: string;
  category: 'Copyright' | 'Trademark' | 'Patent';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  evidence: Evidence[];
  interviews: Interview[];
  options: DecisionOption[];
  correctOption: string;
  reward: number;
}

export interface Evidence {
  id: string;
  type: 'image' | 'document' | 'email' | 'blockchain' | 'legal';
  title: string;
  content: string;
  imageUrl?: string;
  highlights?: Highlight[];
  notes?: string[];
}

export interface Highlight {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  note: string;
}

export interface Interview {
  id: string;
  character: string;
  role: string;
  avatar: string;
  dialogue: DialogueLine[];
  trust: number;
}

export interface DialogueLine {
  id: string;
  text: string;
  responses?: DialogueResponse[];
  next?: string;
}

export interface DialogueResponse {
  id: string;
  text: string;
  impact: {
    trust: number;
    evidence?: string[];
  };
  next: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  explanation: string;
  reasons: string[];
  consequences: {
    score: number;
    reputation: number;
    feedback: string;
  };
}

export interface GameState {
  score: number;
  reputation: number;
  currentCase: string | null;
  completedCases: string[];
  reviewedEvidence: string[];
  conductedInterviews: string[];
  notes: Record<string, string[]>;
  highlights: Record<string, Highlight[]>;
  investigationStep: 'evidence' | 'fairUse' | 'interviews' | null;
  selectedReason: string | null;
}