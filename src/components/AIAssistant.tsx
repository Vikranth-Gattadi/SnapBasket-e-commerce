
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getChatbotResponse } from '../services/geminiService';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

interface AIAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen: externalIsOpen, onClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI shopping assistant powered by Gemini 1.5 Flash. I can help you find products, compare prices, track orders, and answer any questions about your shopping experience. How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state } = useApp();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(true);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Thinking...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      const context = state.cart.length > 0 ? `User's cart: ${state.cart.map(item => `${item.product.name} (${item.quantity}x)`).join(', ')}` : '';
      const response = await getChatbotResponse(currentMessage, context);

      // Remove loading message and add actual response
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        id: (Date.now() + 2).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }));
    } catch (error) {
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        id: (Date.now() + 2).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date()
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Find trending products under ₹1000",
    "Suggest electronics for home office",
    "Show me today's best deals",
    "Compare smartphones under ₹30k"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={handleOpen}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-navy to-mint hover:from-navy/90 hover:to-mint/90 shadow-lg z-50 transition-all duration-300 animate-pulse ${
          isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative">
          <Bot className="w-6 h-6 md:w-7 md:h-7 text-white" />
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
      </Button>

      {/* Chat Window - Responsive */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[70vh] md:h-[32rem] flex flex-col bg-white shadow-2xl z-50 animate-scale-in border-2 border-mint/20">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b bg-gradient-to-r from-navy via-mint to-navy text-white rounded-t-lg">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-semibold text-sm md:text-base">AI Assistant</span>
                <p className="text-xs text-white/80">Powered by Gemini 1.5 Flash</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="p-3 md:p-4 border-b bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick Actions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickActions.slice(0, 2).map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-left justify-start h-auto p-2 hover:bg-mint/10 hover:text-mint transition-colors"
                    onClick={() => {
                      setCurrentMessage(action);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-2 md:p-3 rounded-lg text-sm transition-all duration-200 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-mint to-mint/90 text-white shadow-md'
                      : message.isLoading
                      ? 'bg-gray-200 text-gray-600 animate-pulse'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI is thinking...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about shopping..."
                className="flex-1 border-gray-300 focus:border-mint focus:ring-mint/20 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim()}
                className="bg-gradient-to-r from-mint to-mint/90 hover:from-mint/90 hover:to-mint text-white shadow-md transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
