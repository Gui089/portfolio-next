import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Terminal, 
  Database, 
  Cloud, 
  Globe, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink,
  Languages,
  Briefcase,
  Cpu,
  Download,
  ArrowRight,
  Zap,
  Layers,
  Copy,
  Check
} from 'lucide-react';

// --- Data & Translations ---

const DATA = {
  pt: {
    nav: {
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Stack',
      contact: 'Contato'
    },
    hero: {
      role: 'Senior Software Engineer',
      greeting: 'Olá, sou',
      name: 'Guilherme Coutinho',
      description: 'Engenheiro de Software focado em Arquitetura de Sistemas, Escalabilidade e Engenharia de Produto. Especialista em desenhar soluções robustas de backend e integrações de IA.',
      cta: 'Baixar Currículo',
      available: 'Disponível para novos desafios'
    },
    experience: {
      title: 'Trajetória Profissional',
      subtitle: 'Uma linha do tempo das minhas contribuições profissionais e crescimento técnico.',
      jobs: [
        {
          company: 'Dopster',
          role: 'Senior Software Engineer',
          period: 'Há 10 meses - Atualmente',
          current: true,
          description: 'Liderança técnica na arquitetura de microsserviços escaláveis. Implementação de Clean Architecture e DDD para sistemas de alta complexidade. Responsável por gateways de pagamento críticos e mensageria assíncrona com RabbitMQ.',
          stack: ['.NET', 'NestJS', 'Next.js', 'Docker', 'SQL', 'RabbitMQ']
        },
        {
          company: 'Sentiria',
          role: 'Principal Engineer (Freelance)',
          period: 'Atualmente',
          current: true,
          description: 'Engenheiro Principal focado em R&D de Agentes Autônomos. Arquitetura de pipelines de IA generativa (Gemini) e APIs de alta performance com FastAPI para automação empresarial.',
          stack: ['React', 'FastAPI', 'Postgres', 'AI Agents', 'Gemini']
        },
        {
          company: 'SinergiaRh',
          role: 'Software Engineer Pleno',
          period: 'Jun 2023 - Dez 2024',
          current: false,
          description: 'Modernização de sistemas legados críticos de RH. Foco em otimização de queries SQL, refatoração de componentes frontend para React e melhoria de performance em aplicações .NET.',
          stack: ['C#', '.NET', 'React', 'SQL Server']
        },
        {
          company: 'SinergiaRh',
          role: 'Jr Software Engineer',
          period: 'Jan 2022 - Jun 2023',
          current: false,
          description: 'Desenvolvimento full-stack focado em manutenção corretiva e evolutiva. Participação ativa em code reviews e implementação de novas features no ecossistema web.',
          stack: ['JavaScript', 'React', 'CSS']
        }
      ]
    },
    projects: {
      title: 'Projetos & Engenharia',
      subtitle: 'Uma seleção de implementações técnicas e produtos.',
      items: [
        {
          title: 'Nexus AI Core',
          category: 'AI Architecture',
          description: 'Um orquestrador de agentes de IA capaz de processar fluxos de dados em tempo real e tomar decisões autônomas baseadas em prompts dinâmicos.',
          image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop',
          stack: ['Next.js', 'Gemini API', 'FastAPI', 'Vector DB']
        },
        {
          title: 'Dopster Cloud',
          category: 'SaaS Platform',
          description: 'Plataforma de gerenciamento de infraestrutura. Dashboard interativo para monitoramento de containers em tempo real com WebSockets.',
          image: 'https://images.unsplash.com/photo-1558494949-efdeb6aa2753?q=80&w=1600&auto=format&fit=crop',
          stack: ['.NET 8', 'Docker', 'React', 'PostgreSQL']
        },
        {
          title: 'Sentiria Auto',
          category: 'Automation',
          description: 'Engine de automação de marketing que utiliza LLMs para personalizar campanhas de outreach em escala massiva.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
          stack: ['Python', 'LangChain', 'Redis', 'React']
        }
      ]
    },
    skills: {
      title: 'Tech Stack & Ferramentas',
      subtitle: 'Meu arsenal técnico para construir aplicações de alta performance.',
      categories: [
        { name: 'Core', skills: ['Next.js', 'React', '.NET', 'Python', 'TypeScript'] },
        { name: 'Backend & Data', skills: ['Node.js', 'NestJS', 'FastAPI', 'SQL', 'PostgreSQL', 'RabbitMQ'] },
        { name: 'DevOps & Cloud', skills: ['Docker', 'AWS', 'CI/CD', 'Clean Arch', 'DDD'] },
        { name: 'AI Engineering', skills: ['Gemini AI', 'AI Agents', 'LLMs', 'Prompt Eng'] }
      ]
    },
    contact: {
      title: 'Vamos Conversar?',
      subtitle: 'Estou sempre aberto a discutir código, arquitetura ou novas oportunidades.',
      emailLabel: 'Copiar email',
      copied: 'Copiado!',
      footer: 'Designed & Built by Guilherme Coutinho.'
    }
  },
  en: {
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Stack',
      contact: 'Contact'
    },
    hero: {
      role: 'Senior Software Engineer',
      greeting: 'Hello, I\'m',
      name: 'Guilherme Coutinho',
      description: 'Software Engineer focused on System Architecture, Scalability, and Product Engineering. Specialist in designing robust backend solutions and AI integrations.',
      cta: 'Download CV',
      available: 'Available for new challenges'
    },
    experience: {
      title: 'Career Trajectory',
      subtitle: 'A timeline of my professional contributions and technical growth.',
      jobs: [
        {
          company: 'Dopster',
          role: 'Senior Software Engineer',
          period: '10 months ago - Present',
          current: true,
          description: 'Technical leadership in scalable microservices architecture. Implementation of Clean Architecture and DDD for high-complexity systems. Responsible for critical payment gateways and asynchronous messaging with RabbitMQ.',
          stack: ['.NET', 'NestJS', 'Next.js', 'Docker', 'SQL', 'RabbitMQ']
        },
        {
          company: 'Sentiria',
          role: 'Principal Engineer (Freelance)',
          period: 'Present',
          current: true,
          description: 'Principal Engineer focused on Autonomous Agents R&D. Architecting generative AI pipelines (Gemini) and high-performance APIs with FastAPI for business automation.',
          stack: ['React', 'FastAPI', 'Postgres', 'AI Agents', 'Gemini']
        },
        {
          company: 'SinergiaRh',
          role: 'Mid-Level Software Engineer',
          period: 'Jun 2023 - Dec 2024',
          current: false,
          description: 'Modernization of critical legacy HR systems. Focused on SQL query optimization, frontend component refactoring to React, and performance improvements in .NET applications.',
          stack: ['C#', '.NET', 'React', 'SQL Server']
        },
        {
          company: 'SinergiaRh',
          role: 'Jr Software Engineer',
          period: 'Jan 2022 - Jun 2023',
          current: false,
          description: 'Full-stack development focused on corrective and evolutive maintenance. Active participation in code reviews and implementation of new features in the web ecosystem.',
          stack: ['JavaScript', 'React', 'CSS']
        }
      ]
    },
    projects: {
      title: 'Projects & Engineering',
      subtitle: 'A selection of technical implementations and products.',
      items: [
        {
          title: 'Nexus AI Core',
          category: 'AI Architecture',
          description: 'An AI agent orchestrator capable of processing real-time data streams and making autonomous decisions based on dynamic prompts.',
          image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop',
          stack: ['Next.js', 'Gemini API', 'FastAPI', 'Vector DB']
        },
        {
          title: 'Dopster Cloud',
          category: 'SaaS Platform',
          description: 'Infrastructure management platform. Interactive dashboard for real-time container monitoring via WebSockets.',
          image: 'https://images.unsplash.com/photo-1558494949-efdeb6aa2753?q=80&w=1600&auto=format&fit=crop',
          stack: ['.NET 8', 'Docker', 'React', 'PostgreSQL']
        },
        {
          title: 'Sentiria Auto',
          category: 'Automation',
          description: 'Marketing automation engine utilizing LLMs to personalize outreach campaigns at massive scale.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
          stack: ['Python', 'LangChain', 'Redis', 'React']
        }
      ]
    },
    skills: {
      title: 'Tech Stack & Tools',
      subtitle: 'My technical arsenal for building high-performance applications.',
      categories: [
        { name: 'Core', skills: ['Next.js', 'React', '.NET', 'Python', 'TypeScript'] },
        { name: 'Backend & Data', skills: ['Node.js', 'NestJS', 'FastAPI', 'SQL', 'PostgreSQL', 'RabbitMQ'] },
        { name: 'DevOps & Cloud', skills: ['Docker', 'AWS', 'CI/CD', 'Clean Arch', 'DDD'] },
        { name: 'AI Engineering', skills: ['Gemini AI', 'AI Agents', 'LLMs', 'Prompt Eng'] }
      ]
    },
    contact: {
      title: 'Let\'s Talk?',
      subtitle: 'I am always open to discussing code, architecture, or new opportunities.',
      emailLabel: 'Copy email',
      copied: 'Copied!',
      footer: 'Designed & Built by Guilherme Coutinho.'
    }
  }
};

// --- Utilities & Shared Components ---

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 text-zinc-100 transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:text-xs font-medium font-mono text-zinc-400 ring-1 ring-inset ring-white/5 transition-colors hover:text-white hover:border-primary/30 ${className}`}>
    {children}
  </span>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-16 md:mb-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
      </h2>
      <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  </div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

// --- Components ---

const Navbar = ({ lang, setLang, t }: { lang: 'pt' | 'en', setLang: (l: 'pt' | 'en') => void, t: any }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-center">
        <div className={`flex items-center gap-1 md:gap-2 px-4 py-3 rounded-full border transition-all duration-500 ${scrolled ? 'bg-zinc-900/80 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50' : 'bg-transparent border-transparent backdrop-blur-sm'}`}>
          
          <div 
            className="font-mono font-bold text-lg tracking-tighter text-white cursor-pointer mr-6 hidden md:flex items-center gap-1 group"
            onClick={(e) => scrollToSection(e as any, 'top')}
          >
            <Terminal size={18} className="text-primary group-hover:rotate-12 transition-transform" />
            GC
          </div>

          <ul className="flex items-center gap-1">
            {['experience', 'projects', 'skills', 'contact'].map((key) => (
              <li key={key}>
                <a 
                  href={`#${key}`} 
                  onClick={(e) => scrollToSection(e, key)}
                  className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg group overflow-hidden"
                >
                  <span className="relative z-10">{t.nav[key]}</span>
                  <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg origin-center"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-white/10 mx-4"></div>

          <button 
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono text-zinc-300 transition-all hover:scale-105 active:scale-95"
          >
            <Languages size={14} />
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-purple-500/10 rounded-full blur-[100px] opacity-20" />
      <div className="absolute bottom-0 left-[20%] w-[60%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] opacity-20" />
    </div>
  );
};

const Hero = ({ t }: { t: any }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Character stagger animation for name
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.03 + 0.5 }
    })
  };

  const name = t.hero.name.split('');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="top">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-background bg-grid-white/[0.03] bg-[size:40px_40px]" />
      <BackgroundGradient />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: y1, opacity }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 flex-1"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t.hero.available}
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-zinc-400 mb-2"
              >
                {t.hero.greeting}
              </motion.p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9] overflow-visible">
                {name.map((char: string, i: number) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={nameVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block hover:text-primary transition-colors duration-300 cursor-default"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl"
              >
                {t.hero.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-wrap gap-4"
              >
                <a 
                  href="#" 
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 px-8 font-medium text-zinc-900 transition-all hover:bg-white hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  <span className="mr-2"><Download size={18} /></span>
                  {t.hero.cta}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                </a>
                
                <div className="flex items-center gap-4">
                  <a href="https://github.com" className="p-3 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Github size={20} /></a>
                  <a href="https://linkedin.com" className="p-3 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Linkedin size={20} /></a>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Abstract Shape */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="order-1 md:order-2 flex-1 relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[80px] opacity-20 animate-pulse" />
                <div className="absolute inset-4 border border-white/10 rounded-2xl bg-zinc-900/50 backdrop-blur-sm rotate-6 z-10" />
                <div className="absolute inset-4 border border-white/10 rounded-2xl bg-zinc-900/80 backdrop-blur-md -rotate-3 z-20 flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-3 gap-4 opacity-20 p-8">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg bg-white/20" />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-transparent to-transparent" />
                  <Code2 size={64} className="absolute text-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const Experience = ({ t }: { t: any }) => {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <SectionHeader title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="max-w-3xl mx-auto relative pl-4 md:pl-0">
           {/* Vertical Line */}
           <div className="absolute left-4 md:left-0 top-2 bottom-0 w-px bg-zinc-800 md:hidden"></div>

          {t.experience.jobs.map((job: any, index: number) => (
            <div key={index} className="relative pb-12 md:pb-16 last:pb-0 group">
              {/* Desktop Timeline Layout */}
              <div className="hidden md:flex gap-10">
                 {/* Date Column */}
                 <div className="w-32 flex-shrink-0 text-right pt-2">
                    <span className={`text-xs font-mono font-medium ${job.current ? 'text-indigo-400' : 'text-zinc-500'}`}>
                      {job.period}
                    </span>
                 </div>
                 
                 {/* Line & Dot */}
                 <div className="relative flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 z-10 ${job.current ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-zinc-950 border-zinc-700 group-hover:border-zinc-500 transition-colors'}`}></div>
                    {index !== t.experience.jobs.length - 1 && (
                        <div className="w-px bg-zinc-800 absolute top-3 bottom-[-4rem] group-hover:bg-zinc-700 transition-colors"></div>
                    )}
                 </div>

                 {/* Content */}
                 <div className="flex-1 pt-1">
                    <motion.div
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5 }}
                    >
                       <div className="flex flex-col gap-2 mb-3">
                          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                             <Briefcase size={14} />
                             <span>{job.company}</span>
                          </div>
                       </div>
                       
                       <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-xl">
                          {job.description}
                       </p>
                       
                       <div className="flex flex-wrap gap-2">
                          {job.stack.map((tech: string) => (
                             <span key={tech} className="text-[10px] px-2 py-1 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-500 font-mono group-hover:border-zinc-700 group-hover:text-zinc-400 transition-colors">
                               {tech}
                             </span>
                          ))}
                       </div>
                    </motion.div>
                 </div>
              </div>

              {/* Mobile Timeline Layout */}
              <div className="md:hidden pl-8 relative">
                 <div className={`absolute left-[11px] top-[5px] w-2.5 h-2.5 rounded-full border-2 z-10 ${job.current ? 'bg-indigo-500 border-indigo-500' : 'bg-zinc-950 border-zinc-700'}`}></div>
                 
                 <div className="mb-1">
                    <span className="text-xs font-mono text-zinc-500">{job.period}</span>
                 </div>
                 <h3 className="text-lg font-bold text-zinc-100 mb-1">{job.role}</h3>
                 <div className="text-sm text-zinc-400 mb-3 flex items-center gap-2">
                    <Briefcase size={12} /> {job.company}
                 </div>
                 <p className="text-sm text-zinc-500 leading-relaxed mb-4">{job.description}</p>
                 <div className="flex flex-wrap gap-2">
                    {job.stack.map((tech: string) => (
                       <span key={tech} className="text-[10px] px-2 py-1 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-500 font-mono">
                         {tech}
                       </span>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ t }: { t: any }) => {
  return (
    <section id="projects" className="py-32 bg-zinc-900/20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="space-y-24 md:space-y-32">
          {t.projects.items.map((project: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Browser Mockup Image */}
              <div className="w-full lg:w-3/5 perspective-1000 group">
                <div className="relative rounded-xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:shadow-indigo-500/10">
                  {/* Browser Header */}
                  <div className="h-8 bg-zinc-800/50 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    <div className="ml-4 flex-1 h-4 bg-white/5 rounded text-[10px] flex items-center px-2 text-zinc-600 font-mono">
                      localhost:3000
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-950">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-primary"></div>
                  <span className="text-primary text-sm font-mono uppercase tracking-widest font-semibold">{project.category}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h3>
                
                <p className="text-lg text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-4">
                   <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Built With</h4>
                   <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech: string) => (
                      <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-xs font-mono text-zinc-300 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-colors">
                        <Terminal size={12} className="text-primary/70" />
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button className="group flex items-center gap-2 text-white font-medium hover:text-primary transition-colors">
                    View Live Project <ExternalLink size={16} />
                  </button>
                  <button className="group flex items-center gap-2 text-zinc-400 font-medium hover:text-white transition-colors">
                    Source Code <Github size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = ({ t }: { t: any }) => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-zinc-950">
         <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.skills.categories.map((cat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full bg-zinc-900/50 hover:bg-zinc-900/80 backdrop-blur-sm">
                <div className="p-8 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white mb-6 border border-white/10 shadow-lg group-hover:shadow-primary/20 transition-shadow">
                    {index === 0 ? <Layers size={24} className="text-blue-400" /> : 
                     index === 1 ? <Database size={24} className="text-emerald-400" /> :
                     index === 2 ? <Cloud size={24} className="text-orange-400" /> : <Zap size={24} className="text-yellow-400" />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6">{cat.name}</h3>
                  
                  <div className="space-y-3 mt-auto">
                    {cat.skills.map((skill: string) => (
                      <div key={skill} className="flex items-center justify-between group/skill">
                        <div className="flex items-center gap-3 text-sm text-zinc-400 group-hover/skill:text-zinc-200 transition-colors">
                           <div className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover/skill:bg-primary transition-colors"></div>
                           {skill}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ t }: { t: any }) => {
  const [copied, setCopied] = useState(false);
  const email = "guilhermesilba811@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-zinc-900 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              {t.contact.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>

            <div className="pt-8">
              <button 
                onClick={handleCopy}
                className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95 w-full md:w-auto justify-center"
              >
                <Mail className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-lg md:text-xl font-mono text-zinc-300 group-hover:text-white transition-colors">{email}</span>
                <div className="ml-4 pl-4 border-l border-white/10 text-xs uppercase tracking-wider text-zinc-500 group-hover:text-primary transition-colors">
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400"><Check size={14} /> {t.contact.copied}</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy size={14} /> {t.contact.emailLabel}</span>
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="mt-32 border-t border-white/5 pt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm font-mono">{t.contact.footer}</p>
          <div className="flex gap-6">
             <a href="https://linkedin.com" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
             <a href="https://github.com" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </footer>
    </section>
  );
};

const App = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = DATA[lang];

  return (
    <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-100">
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);