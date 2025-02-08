import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Star, BarChart3 } from 'lucide-react';
import { questions } from '../data/questions';
import { QuizState } from '../types/quiz';

const QuizGame = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    showExplanation: false,
    completed: false
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (answerId: string) => {
    if (quizState.showExplanation) return;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerId,
      showExplanation: true,
      score: answerId === currentQuestion.correctAnswer ? prev.score + 10 : prev.score
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex === questions.length - 1) {
      setQuizState(prev => ({ ...prev, completed: true }));
      return;
    }

    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      showExplanation: false
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      showExplanation: false,
      completed: false
    });
  };

  const renderQuizComplete = () => (
    <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto text-center">
      <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
      <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-2xl mb-8">
        Your Score: <span className="text-emerald-500 font-bold">{quizState.score}</span>/100
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <div className="px-4 py-2 bg-gray-700/50 rounded-lg">
          <Star className="w-5 h-5 text-yellow-500 mb-2 mx-auto" />
          <div className="text-sm text-gray-300">Perfect Score</div>
          <div className="font-bold">{quizState.score === 100 ? 'Achieved!' : 'Not Yet'}</div>
        </div>
        <div className="px-4 py-2 bg-gray-700/50 rounded-lg">
          <BarChart3 className="w-5 h-5 text-emerald-500 mb-2 mx-auto" />
          <div className="text-sm text-gray-300">Questions</div>
          <div className="font-bold">{questions.length}</div>
        </div>
      </div>
      <button
        onClick={resetQuiz}
        className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const renderQuestion = () => (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">
            Question {quizState.currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-400">
            Score: {quizState.score}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((quizState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 mb-8">
        <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 mb-4">
          {currentQuestion.category}
        </div>
        <h2 className="text-2xl font-bold mb-8">{currentQuestion.text}</h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                quizState.selectedAnswer === option.id
                  ? option.id === currentQuestion.correctAnswer
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                  : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
              }`}
              disabled={quizState.showExplanation}
            >
              <div className="flex items-center gap-3">
                {quizState.showExplanation && option.id === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                {quizState.showExplanation && 
                  quizState.selectedAnswer === option.id && 
                  option.id !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {quizState.showExplanation && (
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700/50 mb-8 animate-fadeIn">
          <h3 className="font-bold mb-2">Explanation:</h3>
          <p className="text-gray-300 mb-6">{currentQuestion.explanation}</p>
          <button
            onClick={handleNextQuestion}
            className="w-full px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
          >
            {quizState.currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            IP Knowledge Quest
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Test your intellectual property knowledge through this interactive quiz. Each correct answer brings you closer to becoming an IP master!
          </p>
        </div>

        {quizState.completed ? renderQuizComplete() : renderQuestion()}
      </div>
    </div>
  );
};

export default QuizGame;