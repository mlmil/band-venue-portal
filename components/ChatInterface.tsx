
import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAboutBand } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I'm the Neon Blonde Concierge. How can I help you today with your booking or venue needs?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askGeminiAboutBand(input);
      const aiMessage: ChatMessage = {
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass rounded-3xl overflow-hidden shadow-2xl">
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl shadow-sm
              ${msg.role === 'user' 
                ? 'bg-neonBlue/20 border border-neonBlue/40 text-blue-50 rounded-tr-none' 
                : 'bg-cardBg border border-gray-800 text-gray-200 rounded-tl-none'}
            `}>
              <p className="leading-relaxed">{msg.content}</p>
              <span className="text-[10px] text-gray-500 mt-2 block opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-cardBg border border-gray-800 p-4 rounded-2xl rounded-tl-none animate-pulse text-gray-500">
              Neon Blonde is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-cardBg/50 backdrop-blur-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about tour dates, technical riders, or base rates..."
            className="flex-1 bg-black/40 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-neonPink transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-gradient-to-r from-neonPink to-neonPurple px-6 py-3 rounded-xl font-bold hover:shadow-neon-pink transition-all active:scale-95 disabled:opacity-50"
          >
            SEND
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-2 text-center">
          Powered by Gemini Flash 3.0 • Verified Band Info only.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
