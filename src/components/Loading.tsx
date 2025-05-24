import { useEffect, useState } from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Main logo area */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm shadow-lg border border-white/50">
            <MessageSquare size={48} className="text-indigo-600" />
          </div>
          
          {/* Floating AI icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
            <Bot size={16} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Sparkles size={12} className="text-white" />
          </div>
        </div>

        {/* App title */}
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
          AI Admin Panel
        </h1>
        <p className="text-gray-700 mb-8 font-medium">Your intelligent conversation assistant</p>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="bg-gray-200/60 rounded-full h-3 backdrop-blur-sm shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2 font-medium">
            <span>0%</span>
            <span>{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading steps */}
        <div className="h-6">
          <p className="text-gray-700 text-sm animate-pulse font-medium">
            {steps[currentStep]}
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto text-xs">
          <div className="text-center">
            <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm shadow-md border border-white/50">
              <Bot size={16} className="text-indigo-600" />
            </div>
            <p className="text-gray-600 font-medium">AI Powered</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm shadow-md border border-white/50">
              <MessageSquare size={16} className="text-indigo-600" />
            </div>
            <p className="text-gray-600 font-medium">Smart Replies</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm shadow-md border border-white/50">
              <Sparkles size={16} className="text-indigo-600" />
            </div>
            <p className="text-gray-600 font-medium">Intuitive</p>
          </div>
        </div>
      </div>
    </div>
  );
}