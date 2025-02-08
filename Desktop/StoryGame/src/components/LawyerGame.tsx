import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Scale, Trophy, Star, FileText, MessageCircle, CheckCircle2 } from 'lucide-react';
import { legalCases } from '../data/legal-cases';
import { LawyerGameState, LegalCase } from '../types/lawyer';

const LawyerGame = () => {
  const [gameState, setGameState] = useState<LawyerGameState>({
    currentCase: null,
    reviewedEvidence: [],
    selectedOption: null,
    reputation: 100,
    casesWon: 0,
    completed: false
  });

  const currentCase = legalCases.find(c => c.id === gameState.currentCase);

  const handleCaseSelect = (caseId: string) => {
    setGameState(prev => ({
      ...prev,
      currentCase: caseId,
      reviewedEvidence: [],
      selectedOption: null
    }));
  };

  const handleOptionSelect = (optionId: string) => {
    const option = currentCase?.options.find(o => o.id === optionId);
    if (!option || !currentCase) return;

    const isCorrect = optionId === currentCase.correctOption;

    setGameState(prev => ({
      ...prev,
      selectedOption: optionId,
      reputation: Math.max(0, Math.min(100, prev.reputation + option.consequences.reputation)),
      casesWon: isCorrect ? prev.casesWon + 1 : prev.casesWon,
      completed: true
    }));
  };

  const handleReset = () => {
    setGameState({
      currentCase: null,
      reviewedEvidence: [],
      selectedOption: null,
      reputation: 100,
      casesWon: 0,
      completed: false
    });
  };

  const renderCaseSelection = () => (
    <div className="grid grid-cols-1 gap-8">
      {legalCases.map(case_ => (
        <div
          key={case_.id}
          className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all cursor-pointer"
          onClick={() => handleCaseSelect(case_.id)}
        >
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-xl">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{case_.title}</h3>
              <p className="text-gray-300 mb-4">{case_.description}</p>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {case_.evidence.length} Evidence Items
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {case_.options.length} Options
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCase = (case_: LegalCase) => (
    <div>
      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <span className="text-2xl font-bold">{case_.clientName[0]}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{case_.clientName}</h3>
            <p className="text-gray-400">{case_.clientRole}</p>
          </div>
        </div>
        <p className="text-gray-300 mb-6">{case_.background}</p>
        <div className="space-y-6">
          {case_.evidence.map(evidence => (
            <div key={evidence.id} className="bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold mb-2">{evidence.title}</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{evidence.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50">
        <h3 className="text-xl font-bold mb-6">Legal Options</h3>
        <div className="space-y-4">
          {case_.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={gameState.selectedOption !== null}
              className={`w-full p-6 rounded-xl text-left transition-all ${
                gameState.selectedOption === option.id
                  ? option.id === case_.correctOption
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                  : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start gap-4">
                {gameState.selectedOption === option.id && (
                  <div className="mt-1">
                    <CheckCircle2 className={`w-5 h-5 ${
                      option.id === case_.correctOption ? 'text-emerald-500' : 'text-red-500'
                    }`} />
                  </div>
                )}
                <div>
                  <p className="font-bold mb-2">{option.text}</p>
                  {gameState.selectedOption === option.id && (
                    <div className="animate-fadeIn">
                      <p className="text-gray-300 mb-4">{option.explanation}</p>
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-gray-300 mb-2">{option.consequences.feedback}</p>
                        <p className="text-gray-400">{option.consequences.outcome}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {gameState.selectedOption && (
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            Take Another Case
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              <span className="font-bold">{gameState.reputation}</span>
              <span className="text-gray-400">reputation</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              <span className="font-bold">{gameState.casesWon}</span>
              <span className="text-gray-400">cases won</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            The Young Lawyer
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Step into the role of an IP lawyer and handle challenging cases. Your decisions will shape your reputation and career.
          </p>
        </div>

        {!currentCase && renderCaseSelection()}
        {currentCase && renderCase(currentCase)}
      </div>
    </div>
  );
};

export default LawyerGame;