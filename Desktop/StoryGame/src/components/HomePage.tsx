import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, GraduationCap, Briefcase, ArrowRight, Star, Users, Trophy } from 'lucide-react';

const HomePage = () => {
  const games = [
    {
      id: 'ip-detective',
      title: 'IP Detective',
      description: 'Investigate copyright cases, analyze evidence, and make crucial decisions about intellectual property rights.',
      icon: Scale,
      color: 'from-story-blue to-story-purple',
      features: ['Interactive Cases', 'Evidence Analysis', 'Witness Interviews'],
      difficulty: 'Medium',
      timeToComplete: '15-20 min'
    },
    {
      id: 'ip-quiz',
      title: 'IP Knowledge Quest',
      description: 'Test your intellectual property knowledge through engaging quizzes covering patents, trademarks, and copyrights.',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      features: ['Multiple Choice', 'Instant Feedback', 'Progress Tracking'],
      difficulty: 'Easy',
      timeToComplete: '10-15 min'
    },
    {
      id: 'young-lawyer',
      title: 'The Young Lawyer',
      description: 'Step into the shoes of a junior IP lawyer, advise clients, and build your legal reputation.',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-500',
      features: ['Client Consultations', 'Legal Research', 'Case Management'],
      difficulty: 'Hard',
      timeToComplete: '20-25 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-story-blue via-story-purple to-story-pink bg-clip-text text-transparent">
            Story Protocol Academy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master intellectual property through interactive games. Learn about copyrights, patents, and trademarks while solving real-world cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map(game => (
            <Link
              key={game.id}
              to={`/${game.id}`}
              className="group bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 hover:border-story-blue/50 transition-all"
            >
              <div className="mb-6">
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${game.color}`}>
                  <game.icon className="w-8 h-8" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3">{game.title}</h2>
              <p className="text-gray-300 mb-6">{game.description}</p>

              <div className="space-y-4 mb-8">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-story-purple" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-story-blue" />
                    <span className="text-gray-400">{game.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-story-purple" />
                    <span className="text-gray-400">{game.timeToComplete}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-story-pink group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-story-purple/20 text-story-purple">
            <Star className="w-5 h-5" />
            <span>Complete all games to earn your IP Master certificate!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;