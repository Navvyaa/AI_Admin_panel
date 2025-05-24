import { useEffect, useState } from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import { useTheme } from '../context/themeContext';

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const { darkMode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing AI Copilot...",
    "Loading conversations...",
    "Setting up workspace...",
    "Ready to assist!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className={`fixed inset-0 ${darkMode
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950'
        : 'bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-400'
      } flex items-center justify-center z-50`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${darkMode ? 'bg-white/10' : 'bg-white/20'
              } rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'} z-10`}>
        {/* Main logo area */}
        <div className="relative mb-8">
          <div className={`w-24 h-24 ${darkMode ? 'bg-white/10' : 'bg-white/20'
            } rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm`}>
            <MessageSquare size={48} className={darkMode ? 'text-white' : 'text-gray-800'} />
          </div>

          {/* Floating AI icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Bot size={16} className={darkMode ? 'text-white' : 'text-gray-800'} />
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles size={12} className={darkMode ? 'text-white' : 'text-gray-800'} />
          </div>
        </div>

        {/* App title */}
        <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${darkMode ? 'from-gray-200 to-gray-400' : 'from-gray-800 to-gray-900'
          } bg-clip-text text-transparent`}>
          ChatBot Pro
        </h1>
        <p className={darkMode ? 'text-white/80' : 'text-black/80'}>Your intelligent conversation assistant</p>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className={`${darkMode ? 'bg-white/10' : 'bg-white/20'} rounded-full h-3 backdrop-blur-sm`}>
            <div
              className={`bg-gradient-to-r ${darkMode ? 'from-blue-500 to-purple-600' : 'from-gray-800 to-gray-900'
                } h-3 rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className={darkMode ? 'text-white/60' : 'text-black/60'}>0%</span>
            <span className={darkMode ? 'text-white/60' : 'text-black/60'}>{progress}%</span>
            <span className={darkMode ? 'text-white/60' : 'text-black/60'}>100%</span>
          </div>
        </div>

        {/* Loading steps */}
        <div className="h-6">
          <p className={`text-sm animate-pulse ${darkMode ? 'text-white' : 'text-black'}`}>
            {steps[currentStep]}
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto text-xs">
          {['AI Powered', 'Smart Replies', 'Intuitive'].map((text, i) => (
            <div key={i} className="text-center">
              <div className={`w-8 h-8 ${darkMode ? 'bg-white/10' : 'bg-white/20'
                } rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm`}>
                {[<Bot />, <MessageSquare />, <Sparkles />][i]}
              </div>
              <p className={darkMode ? 'text-white/70' : 'text-black/70'}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}