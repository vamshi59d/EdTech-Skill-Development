
import React, { useState } from 'react';
import { generateFlashcards } from '../services/geminiService';
import { Flashcard } from '../types';

const FlashcardGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const generated = await generateFlashcards(topic);
      setCards(generated);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Flashcard Generator</h1>
          <p className="text-slate-500">AI-powered memory boosters for any topic.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g. Mitochondria)"
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none w-full md:w-64"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-100"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-magic"></i>
            )}
            Generate
          </button>
        </div>
      </header>

      {cards.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-between items-center text-slate-500 font-medium">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <span>{Math.round(((currentIndex + 1) / cards.length) * 100)}% Complete</span>
          </div>

          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group perspective h-96 w-full cursor-pointer"
          >
            <div className={`relative h-full w-full duration-700 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white border-2 border-slate-100 shadow-xl p-12 text-center" style={{ backfaceVisibility: 'hidden' }}>
                <div className="space-y-4">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Question</span>
                  <h2 className="text-2xl font-bold text-slate-800">{cards[currentIndex].question}</h2>
                  <p className="text-slate-400 text-sm mt-8">Click to reveal answer</p>
                </div>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-indigo-600 p-12 text-center text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <div className="space-y-4">
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Answer</span>
                  <p className="text-xl font-medium leading-relaxed">{cards[currentIndex].answer}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setCurrentIndex(prev => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === 0}
              className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-30"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={() => {
                setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === cards.length - 1}
              className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-30 shadow-lg shadow-indigo-100"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-4xl">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-700">No cards generated yet</h3>
            <p className="text-slate-400">Enter a topic above to create your first study set.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardGen;
