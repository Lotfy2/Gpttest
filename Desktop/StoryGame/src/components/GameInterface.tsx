import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Case, GameState, Evidence, Interview, DialogueResponse, Highlight } from '../types';
import { cases } from '../data/cases';
import {
  Briefcase, Scale, Award, ZoomIn, ZoomOut,
  Highlighter, MessageCircle, Star, GraduationCap,
  Shield, Trophy, Lightbulb, FileText, Users, Check,
  ArrowLeft
} from 'lucide-react';

const initialGameState: GameState = {
  score: 0,
  reputation: 100,
  currentCase: null,
  completedCases: [],
  reviewedEvidence: [],
  conductedInterviews: [],
  notes: {},
  highlights: {},
  investigationStep: null,
  selectedReason: null
};

const GameInterface: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [gamePhase, setGamePhase] = useState<'selection' | 'investigation' | 'decision'>('selection');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [visibleResponses, setVisibleResponses] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const renderFairUseContent = (content: string | undefined) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const result = [];
    let currentSection = null;
    let sectionContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        if (sectionContent.length > 0) {
          result.push(
            <div key={`section-${i}`} className="mb-4">
              {sectionContent}
            </div>
          );
          sectionContent = [];
        }
        result.push(
          <h1 key={line} className="text-3xl font-bold mb-6 bg-gradient-to-r from-story-blue to-story-purple bg-clip-text text-transparent">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        if (sectionContent.length > 0) {
          result.push(
            <div key={`section-${i}`} className="mb-4">
              {sectionContent}
            </div>
          );
          sectionContent = [];
        }
        result.push(
          <h2 key={line} className="text-2xl font-bold mt-8 mb-4 text-white">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        if (sectionContent.length > 0) {
          result.push(
            <div key={`section-${i}`} className="mb-4">
              {sectionContent}
            </div>
          );
          sectionContent = [];
        }
        currentSection = line;
        result.push(
          <div key={line} className="p-4 bg-gray-700/30 rounded-xl mb-4">
            <h3 className="text-xl font-bold text-story-blue mb-4">{line.slice(4)}</h3>
          </div>
        );
      } else if (line.startsWith('- ')) {
        sectionContent.push(
          <p key={line} className="ml-4 mb-2 text-gray-300">• {line.slice(2)}</p>
        );
      } else if (line.startsWith('  • ')) {
        sectionContent.push(
          <p key={line} className="ml-8 mb-2 text-gray-400">{line}</p>
        );
      } else if (line.startsWith('• ')) {
        sectionContent.push(
          <p key={line} className="ml-4 mb-2 text-gray-300">{line}</p>
        );
      } else if (line) {
        sectionContent.push(
          <p key={line} className="mb-4 text-gray-300">{line}</p>
        );
      } else {
        sectionContent.push(<br key={`br-${i}`} />);
      }
    }

    if (sectionContent.length > 0) {
      result.push(
        <div key="final-section" className="mb-4">
          {sectionContent}
        </div>
      );
    }

    return <div className="prose prose-invert max-w-none">{result}</div>;
  };

  const handleCaseSelection = (caseId: string) => {
    const selectedCase = cases.find(c => c.id === caseId);
    setSelectedCase(selectedCase || null);
    setGameState(prev => ({ 
      ...prev, 
      currentCase: caseId,
      investigationStep: 'evidence'
    }));
    setGamePhase('investigation');
    setVisibleResponses({});
  };

  const handleHighlight = (evidenceId: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHighlighting) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const highlight: Highlight = {
      id: Date.now().toString(),
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      width: 20,
      height: 20,
      color: '#ffeb3b',
      note: noteInput
    };

    setGameState(prev => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [evidenceId]: [...(prev.highlights[evidenceId] || []), highlight]
      }
    }));
    setIsHighlighting(false);
    setNoteInput('');
  };

  const handleDialogueResponse = (dialogueId: string, response: DialogueResponse) => {
    setVisibleResponses(prev => ({
      ...prev,
      [dialogueId + response.id]: !prev[dialogueId + response.id]
    }));

    if (response.impact.evidence) {
      setGameState(prev => ({
        ...prev,
        reviewedEvidence: [...prev.reviewedEvidence, ...response.impact.evidence]
      }));
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleReasonSelect = (option: any) => {
    if (!selectedCase || !selectedOption) return;

    const selectedDecision = selectedCase.options.find(opt => opt.id === selectedOption);
    if (!selectedDecision) return;

    const { score, reputation, feedback } = selectedDecision.consequences;
    setGameState(prev => ({
      ...prev,
      score: prev.score + score,
      reputation: Math.max(0, Math.min(100, prev.reputation + reputation)),
      completedCases: [...prev.completedCases, selectedCase.id],
    }));
    alert(feedback);
    setGamePhase('selection');
    setSelectedCase(null);
    setSelectedOption(null);
  };

  const renderInterviews = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {selectedCase?.interviews.map(interview => (
        <div key={interview.id} className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-story-blue bg-gradient-to-br from-story-blue to-story-purple flex items-center justify-center">
              <span className="text-2xl font-bold">{interview.character[0]}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{interview.character}</h3>
              <p className="text-gray-400">{interview.role}</p>
            </div>
          </div>
          {interview.dialogue.map((line, index) => {
            const isFirstLine = index === 0;
            const isVisible = visibleResponses[line.id];
            
            return (
              <div key={line.id} className="mb-6">
                {(isFirstLine || isVisible) && (
                  <p className="mb-4 text-gray-300">{line.text}</p>
                )}
                {line.responses && (isFirstLine || isVisible) && (
                  <div className="space-y-2">
                    {line.responses.map(response => {
                      const isResponseVisible = visibleResponses[line.id + response.id];
                      const nextLine = interview.dialogue.find(d => d.id === response.next);
                      
                      return (
                        <div key={response.id} className="mb-4">
                          <button
                            onClick={() => handleDialogueResponse(line.id, response)}
                            className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                              isResponseVisible 
                                ? 'bg-story-blue text-white'
                                : 'bg-story-blue/20 text-story-blue hover:bg-story-blue/30'
                            }`}
                          >
                            {response.text}
                          </button>
                          {isResponseVisible && nextLine && (
                            <div className="mt-3 ml-4 pl-4 border-l-2 border-story-purple/50 animate-fadeIn">
                              <p className="text-gray-300">{nextLine.text}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderEvidence = () => {
    if (!selectedCase) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-story-blue to-story-purple bg-clip-text text-transparent">
                Investigation Phase
              </h2>
              <p className="text-gray-300">Review evidence and conduct interviews to build your case.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
                className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
                className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsHighlighting(!isHighlighting)}
                className={`p-3 rounded-xl transition-colors ${
                  isHighlighting ? 'bg-story-purple text-white' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Highlighter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setGameState(prev => ({ ...prev, investigationStep: 'evidence' }))}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                gameState.investigationStep === 'evidence'
                  ? 'bg-story-blue text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              Evidence
            </button>
            <button
              onClick={() => setGameState(prev => ({ ...prev, investigationStep: 'fairUse' }))}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                gameState.investigationStep === 'fairUse'
                  ? 'bg-story-purple text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Scale className="w-5 h-5" />
              Fair Use Guidelines
            </button>
            <button
              onClick={() => setGameState(prev => ({ ...prev, investigationStep: 'interviews' }))}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                gameState.investigationStep === 'interviews'
                  ? 'bg-story-pink text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              Interviews
            </button>
          </div>

          {gameState.investigationStep === 'evidence' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {selectedCase.evidence.slice(0, 2).map(evidence => (
                <div
                  key={evidence.id}
                  className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700/50"
                  onClick={(e) => handleHighlight(evidence.id, e)}
                  style={{ cursor: isHighlighting ? 'crosshair' : 'default' }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-story-blue" />
                    {evidence.title}
                  </h3>
                  {evidence.type === 'image' && evidence.imageUrl && (
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img
                        src={evidence.imageUrl}
                        alt={evidence.title}
                        className="w-full h-64 object-cover transition-transform"
                        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                      />
                      {gameState.highlights[evidence.id]?.map(highlight => (
                        <div
                          key={highlight.id}
                          className="absolute bg-story-purple/30 backdrop-blur-sm rounded-lg"
                          style={{
                            left: `${highlight.x}%`,
                            top: `${highlight.y}%`,
                            width: `${highlight.width}%`,
                            height: `${highlight.height}%`
                          }}
                          title={highlight.note}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-gray-300 whitespace-pre-wrap">{evidence.content}</p>
                </div>
              ))}
            </div>
          )}

          {gameState.investigationStep === 'fairUse' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur rounded-xl p-8 border border-gray-700/50">
                {renderFairUseContent(selectedCase.evidence.find(e => e.id === 'fair-use-doc')?.content)}
              </div>
            </div>
          )}

          {gameState.investigationStep === 'interviews' && renderInterviews()}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setGamePhase('decision')}
            className="px-8 py-4 bg-gradient-to-r from-story-blue to-story-purple text-white rounded-xl hover:opacity-90 transition-opacity font-bold text-lg"
          >
            Make Your Decision
          </button>
        </div>
      </div>
    );
  };

  const renderDecision = () => {
    if (!selectedCase) return null;

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-story-blue via-story-purple to-story-pink bg-clip-text text-transparent">
          Make Your Decision
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Based on the evidence and interviews, choose your verdict carefully.
        </p>
        
        {!selectedOption ? (
          <div className="space-y-6">
            {selectedCase.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="w-full p-6 text-left bg-gray-800/50 backdrop-blur rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-story-blue/50"
              >
                <p className="text-xl font-bold mb-3">{option.text}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">Select Your Reasons</h3>
              <div className="space-y-4">
                {selectedCase.options.find(opt => opt.id === selectedOption)?.reasons.map((reason, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-600"
                      onChange={() => setGameState(prev => ({
                        ...prev,
                        selectedReason: reason
                      }))}
                    />
                    <span className="text-gray-200">{reason}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => handleReasonSelect(selectedOption)}
                disabled={!gameState.selectedReason}
                className="mt-6 w-full px-6 py-3 bg-story-purple text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Submit Decision
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCaseSelection = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-story-blue via-story-purple to-story-pink bg-clip-text text-transparent">
          Select Your Case
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose a challenging intellectual property case to investigate. Your decisions will impact the future of innovation.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {cases.map(case_ => (
          <div
            key={case_.id}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 hover:bg-gray-700/50 transition-all cursor-pointer border border-gray-700/50 hover:border-story-blue/50"
            onClick={() => handleCaseSelection(case_.id)}
          >
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-story-blue to-story-purple p-4 rounded-xl">
                {case_.category === 'Patent' && <Briefcase className="w-8 h-8" />}
                {case_.category === 'Copyright' && <Scale className="w-8 h-8" />}
                {case_.category === 'Trademark' && <Award className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold">{case_.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      case_.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                      case_.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {case_.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-story-purple/20 text-story-purple text-sm font-medium flex items-center gap-1">
                      <Trophy className="w-4 h-4" /> {case_.reward} pts
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{case_.description}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-5 h-5" /> {case_.category}
                  </span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <GraduationCap className="w-5 h-5" /> {case_.evidence.length} Evidence Items
                  </span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <MessageCircle className="w-5 h-5" /> {case_.interviews.length} Interviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Games
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-story-blue via-story-purple to-story-pink bg-clip-text text-transparent">
                IP Detective - Story Protocol
              </h1>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-story-blue" />
                <span className="font-bold">{gameState.score}</span>
                <span className="text-gray-400">points</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-story-purple" />
                <span className="font-bold">{gameState.reputation}%</span>
                <span className="text-gray-400">reputation</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {gamePhase === 'selection' && renderCaseSelection()}
        {gamePhase === 'investigation' && renderEvidence()}
        {gamePhase === 'decision' && renderDecision()}
      </main>

      {isHighlighting && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-800 p-6">
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add a note for this highlight..."
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-story-blue"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameInterface;