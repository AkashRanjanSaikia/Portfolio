import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const suggestedQuestions = [
  { id: 'q1', text: 'Who is Akash?' },
  { id: 'q2', text: 'What are his skills?' },
  { id: 'q3', text: 'Tell me about his projects' },
  { id: 'q4', text: 'How can I contact him?' },
];

const ChatBot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your FAQ assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [summary, setSummary] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (text: string, questionId?: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    // Get last 4 messages for context (excluding the very first greeting if possible, or just last 4)
    const history = updatedMessages.slice(-4).map(msg => ({
      sender: msg.sender,
      text: msg.text
    }));

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text, 
          questionId,
          history,
          summary
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          throw new Error(data.error || 'Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: data.answer,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (error: any) {
      console.error('There was a problem with the fetch operation:', error);
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: error.message || "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-in fade-in zoom-in duration-700">
      {isOpen && (
        <Card className="mb-4 w-[320px] sm:w-[380px] h-[500px] flex flex-col shadow-2xl border-primary/20 bg-slate-950 text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between rounded-t-lg border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img src="/bot.gif" alt="Bot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Portfolio Assistant</h3>
                <p className="text-[10px] opacity-80">Always active</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden bg-slate-950">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-none shadow-md'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-none px-4 py-2 text-sm shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t border-white/10 bg-slate-950 flex flex-col gap-4">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 w-full">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSendMessage(q.text, q.id)}
                    className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-white/5 transition-colors"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-primary/50"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <button
        onClick={toggleChat}
        className={`group relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden border-2 border-primary/20 ${
          isOpen ? 'bg-destructive' : 'bg-slate-950'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isOpen ? (
            <X className="w-8 h-8 text-destructive-foreground animate-in zoom-in duration-300" />
          ) : (
            <img
              src="/bot.gif"
              alt="Chat Bot"
              className="w-full h-full object-cover p-1"
            />
          )}
        </div>
        {/* {!isOpen && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary items-center justify-center text-[10px] text-primary-foreground font-bold">
              1
            </span>
          </span>
        )} */}
      </button>
    </div>
  );
};

export default ChatBot;
