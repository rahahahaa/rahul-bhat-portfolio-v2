import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import p5 from 'p5';
import { Terminal, ArrowLeft, Send, Sparkles } from 'lucide-react';

function Interactive() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('innovation');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'bot', content: string }>>([
    { role: 'bot', content: 'Hi! I\'m your AI assistant. Ask me anything about Rahul\'s skills, projects, or experience!' }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Generative Art
  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      const particleCount = 100;

      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight);
        canvas.parent(canvasRef.current!);
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-1, 1),
            vy: p.random(-1, 1)
          });
        }
      };

      p.draw = () => {
        p.background(0, 20);
        
        // Update and draw particles
        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
          
          // Draw particle
          const hue = (p.frameCount + i * 2) % 360;
          p.stroke(hue, 80, 100);
          p.strokeWeight(2);
          p.point(particle.x, particle.y);
          
          // Connect nearby particles
          particles.slice(i + 1).forEach(other => {
            const d = p.dist(particle.x, particle.y, other.x, other.y);
            if (d < 100) {
              p.stroke(hue, 80, 100, p.map(d, 0, 100, 255, 0));
              p.line(particle.x, particle.y, other.x, other.y);
            }
          });
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight);
      };
    };

    new p5(sketch);
  }, []);

  // Chat functionality
  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const responses = [
        "I'd be happy to tell you more about Rahul's expertise in full-stack development.",
        "Rahul has worked on several innovative projects, including cultural preservation platforms.",
        "The neural interface project showcases Rahul's interest in cutting-edge technology.",
        "Rahul specializes in React, Node.js, and modern web technologies."
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { role: 'bot', content: response }]);
    }, 1000);

    setMessage('');
  };

  // Scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <Terminal className="w-8 h-8 text-green-400" />
              <span className="font-bold text-xl">RB</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Generative Art Section */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-green-400" />
              Generative Art Wall
            </h2>
            <div className="relative">
              <div ref={canvasRef} className="w-full h-[400px] rounded-lg overflow-hidden" />
              <div className="mt-4">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter a keyword (e.g., innovation)"
                  className="w-full px-4 py-2 bg-black/50 rounded-lg border border-white/10 focus:border-green-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* AI Chat Section */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Terminal className="w-6 h-6 mr-2 text-green-400" />
              AI Assistant
            </h2>
            <div className="flex flex-col h-[400px]">
              <div 
                ref={chatRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 glass rounded-lg"
              >
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-green-400/20 text-white'
                          : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about skills, projects, or experience..."
                  className="flex-1 px-4 py-2 bg-black/50 rounded-lg border border-white/10 focus:border-green-400 outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="glass p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interactive;