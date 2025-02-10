import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import srClothingPreview from '../images/sr-clothingpreview.jpg';
import srcryptoPreview from '../images/sr-cryptopreview.jpg';
import kaamkaajPreview from '../images/kamkaaj-connect.jpg';
import {
  Terminal,
  Code2,
  Cpu,
  Database,
  Globe,
  Cloud,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Brain,
  Heart,
  Lightbulb,
  Rocket,
  Users,
  Target
} from 'lucide-react';

function Portfolio() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [terminalText, setTerminalText] = useState('');
  const [visionIndex, setVisionIndex] = useState(0);
  const gridRef = useRef<SVGSVGElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sections = ['home', 'vision', 'interactive', 'impact', 'projects', 'connect'];
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const visionStatements = [
    "Transforming ordinary challenges into extraordinary opportunities",
    "Building technology that empowers humanity",
    "Creating ripples of positive change across generations",
    "Leading with vision, ethics, and purpose"
  ];

  // Initialize section refs
  useEffect(() => {
    sections.forEach(section => {
      sectionRefs.current[section] = document.getElementById(section);
    });
  }, []);

  // Handle navigation
  const handleNavigation = (item: string) => {
    if (item === 'Interactive Art & AI') {
      navigate('/interactive', { replace: true });
      return;
    }

    const sectionId = item.toLowerCase();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section === 'interactive') continue;
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const text = '> const visionary = {\n  name: "Rahul Bhat",\n  mission: "Transforming ordinary into extraordinary",\n  impact: "Revolutionizing tech & innovation",\n  status: "Building the future, one idea at a time"\n};';
    let index = 0;

    const typeText = setInterval(() => {
      setTerminalText(text.slice(0, index));
      index++;

      if (index > text.length) {
        clearInterval(typeText);
      }
    }, 50);

    return () => clearInterval(typeText);
  }, []);

  // Vision statement rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisionIndex((prev) => (prev + 1) % visionStatements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        'service_5e3ob5v',
        'template_ke71w1j',
        formRef.current,
        'f-gUD6XScF9NdOYxT'
      );

      toast.success("Thank you! I'll get back to you soon.", {
        style: {
          background: '#10B981',
          color: '#fff'
        }
      });

      formRef.current.reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        style: {
          background: '#EF4444',
          color: '#fff'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Toaster />

      {/* Interactive Background */}
      <svg
        ref={gridRef}
        className="interactive-bg"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              className="grid-line"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-2 hover:text-green-400 transition-colors"
            >
              <Terminal className="w-8 h-8 text-green-400" />
              <span className="font-bold text-xl">RB</span>
            </button>
            <div className="hidden md:flex space-x-8">
              {['Vision', 'Interactive Art & AI', 'Impact', 'Projects', 'Connect'].map((item) => (
                item === 'Interactive Art & AI' ? (
                  <button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    className="px-4 py-2 rounded-lg transition-all hover:text-green-400"
                  >
                    {item}
                  </button>
                ) : (
                  <button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    className={`
                      px-4 py-2 rounded-lg transition-all
                      ${activeSection === item.toLowerCase()
                        ? 'glass text-green-400'
                        : 'hover:text-green-400'
                      }
                    `}
                  >
                    {item}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-8 animate-float">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Sparkles className="w-8 h-8 text-green-400" />
              <span className="text-xl text-green-400">Full Stack Developer & Visionary</span>
              <Sparkles className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
              Rahul Bhat
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {visionStatements[visionIndex]}
            </p>
            <div className="terminal max-w-2xl mx-auto mt-12">
              <pre className="terminal-text whitespace-pre-wrap text-left">
                {terminalText}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold gradient-text text-center mb-16">
            Vision & Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-xl">
              <div className="text-green-400 mb-4">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vision</h3>
              <p className="text-gray-400">Looking beyond the horizon to shape the future</p>
            </div>
            <div className="glass p-8 rounded-xl">
              <div className="text-green-400 mb-4">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Purpose</h3>
              <p className="text-gray-400">Creating meaningful impact in everything we do</p>
            </div>
            <div className="glass p-8 rounded-xl">
              <div className="text-green-400 mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">Building together for a better tomorrow</p>
            </div>
            <div className="glass p-8 rounded-xl">
              <div className="text-green-400 mb-4">
                <Rocket className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-400">Pushing boundaries and redefining possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold gradient-text text-center mb-16">
            Areas of Impact
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-green-400 mb-6">
                <Brain className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-400">Pushing boundaries and redefining possibilities in technology</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-green-400 mb-6">
                <Heart className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Human Impact</h3>
              <p className="text-gray-400">Creating solutions that enhance and simplify human lives</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-green-400 mb-6">
                <Globe className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Global Reach</h3>
              <p className="text-gray-400">Building solutions that transcend geographical boundaries</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-green-400 mb-6">
                <Lightbulb className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inspiration</h3>
              <p className="text-gray-400">Motivating others to dream bigger and achieve more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative bg-black/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold gradient-text text-center mb-16">
            Visionary Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="project-card">
              <div className="relative h-64">
                <img
                  src={srClothingPreview}
                  alt="SR Clothing "
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-xl" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">SR Clothing E-Commerce Website</h3>
                <p className="text-gray-300 mb-4">
                  I developed an interactive and visually appealing e-commerce website for SR Clothing, showcasing seasonal collections and exclusive fits for men and women. The platform features a modern UI/UX with a responsive design, built using TypeScript, React (TSX), Tailwind CSS, and Vite for a seamless user experience.
                </p>
                <p className="text-gray-400">
                  Key functionalities include:

                  Category-based shopping: SR Exclusive, New Arrivals, and seasonal collections (Summer, Winter, Autumn, Rainy).
                  User authentication: Implemented Firebase login/logout with email and phone number (billing feature pending for phone auth).
                  Scalable and fast performance: Leveraging Vite for optimized builds and rapid development.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-sm glass rounded-full">TypeScript</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">React (TSX)</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">Tailwind CSS</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="relative h-64">
                <img
                  src={srcryptoPreview}
                  alt="SR Crypto"
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-xl" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  SR Crypto: Live Crypto Market Tracker </h3>
                <p className="text-gray-300 mb-4">
                  I developed SR Crypto, a real-time cryptocurrency tracking platform with a modern tech stack and seamless user experience.
                </p>
                <p className="text-gray-400">
                  🔹 Tech Stack: TypeScript, React (TSX), Next.js, Tailwind CSS, Vite, Supabase
                  🔹 Features I Implemented:

                  Live Crypto Data Fetching via API integration
                  3D Interactive Visuals with Next.js
                  Optimized Performance & Fast Builds using Vite
                  User Authentication & Database with Supabase
                  Modern UI & Responsive Design using Tailwind CSS
                  A high-performance, real-time crypto tracker with an interactive and sleek design. 🚀
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-sm glass rounded-full">API</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">React (TSX)</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">Next.js</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="relative h-64">
                <img
                  src={kaamkaajPreview}
                  alt="Kaamkaaj"
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-xl" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Kaamkaaj Connect</h3>
                <p className="text-gray-300 mb-4">
                  Kamkaj Connect is a local work marketplace connecting job seekers and businesses across India, including remote villages. It bridges employment gaps by offering location-based job opportunities and instant hiring solutions.
                </p>
                <p className="text-gray-400"> Key Features
                  ✅ Find Nearby Jobs with real-time location detection
                  ✅ State-Based Specialization showcasing industries & workforce
                  ✅ State Leaderboard ranking top job-creating regions
                  ✅ Dual Marketplace for workers & businesses</p>
                <p className="text-gray-400"> Vision
                  Empowering India’s workforce by making jobs accessible, boosting local economies, and driving financial stability. 🚀
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm glass rounded-full">React (TSX)</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">Tailwind CSS</span>
                  <span className="px-3 py-1 text-sm glass rounded-full">Status: Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold gradient-text text-center mb-16">
            Join the Vision
          </h2>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xl text-gray-300">
              Let's collaborate to create meaningful impact and shape the future together.
              Whether you're a fellow visionary, potential collaborator, or someone who
              shares the dream of making a difference, I'd love to connect.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="glass p-1 rounded-lg">
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-6 py-4 bg-transparent outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="glass p-1 rounded-lg">
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-6 py-4 bg-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div className="glass p-1 rounded-lg">
                <textarea
                  name="message"
                  required
                  className="w-full px-6 py-4 bg-transparent outline-none"
                  rows={4}
                  placeholder="Share your vision or ideas for collaboration..."
                />
              </div>
              <button
                type="submit"
                className="w-full glass px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                Connect & Collaborate
              </button>
            </form>
            <div className="mt-16 flex justify-center space-x-6">
              <a
                href="https://github.com/rahahahaa"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-full hover:bg-white/10 transition-all"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/rahulbhat06"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-full hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:rahulbhat7169@gmail.com"
                className="glass p-4 rounded-full hover:bg-white/10 transition-all"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;