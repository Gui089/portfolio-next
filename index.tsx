import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
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
  GitBranch
} from 'lucide-react';

// --- Data & Translations ---

const DATA = {
  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Stack',
    },
    hero: {
      role: 'Senior Software Engineer',
      greeting: 'Olá, sou Guilherme Coutinho',
      description: 'Engenheiro de Software focado em Arquitetura de Sistemas, Escalabilidade e Engenharia de Produto. Especialista em desenhar soluções robustas de backend e integrações de IA.',
      cta: 'Baixar CV',
      available: 'Disponível para novos desafios'
    },
    experience: {
      title: 'Trajetória Profissional',
      jobs: [
        {
          company: 'Dopster',
          role: 'Senior Software Engineer',
          period: 'Há 10 meses - Atualmente',
          description: 'Liderança técnica na arquitetura de microsserviços escaláveis. Implementação de Clean Architecture e DDD para sistemas de alta complexidade. Responsável por gateways de pagamento críticos e mensageria assíncrona com RabbitMQ.',
          stack: ['.NET', 'NestJS', 'Next.js', 'Docker', 'SQL', 'RabbitMQ']
        },
        {
          company: 'Sentiria',
          role: 'Principal Engineer (Freelance)',
          period: 'Atualmente',
          description: 'Engenheiro Principal focado em R&D de Agentes Autônomos. Arquitetura de pipelines de IA generativa (Gemini) e APIs de alta performance com FastAPI para automação empresarial.',
          stack: ['React', 'FastAPI', 'Postgres', 'AI Agents', 'Gemini']
        },
        {
          company: 'SinergiaRh',
          role: 'Software Engineer Pleno',
          period: 'Jun 2023 - Dez 2024',
          description: 'Modernização de sistemas legados críticos de RH. Foco em otimização de queries SQL, refatoração de componentes frontend para React e melhoria de performance em aplicações .NET.',
          stack: ['C#', '.NET', 'React', 'SQL Server']
        },
        {
          company: 'Fuvir',
          role: 'Jr Software Engineer',
          period: 'Jan 2022 - Jun 2023',
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
      categories: [
        { name: 'Core', skills: ['Next.js', 'React', '.NET', 'Python', 'TypeScript'] },
        { name: 'Backend & Data', skills: ['Node.js', 'NestJS', 'FastAPI', 'SQL', 'PostgreSQL', 'RabbitMQ'] },
        { name: 'DevOps & Cloud', skills: ['Docker', 'AWS', 'CI/CD', 'Clean Arch', 'DDD'] },
        { name: 'AI Engineering', skills: ['Gemini AI', 'AI Agents', 'LLMs', 'Prompt Eng'] }
      ]
    },
    footer: {
      rights: 'Designed & Built by Guilherme Coutinho.'
    }
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Stack',
    },
    hero: {
      role: 'Senior Software Engineer',
      greeting: 'Hello, I\'m Guilherme Coutinho',
      description: 'Software Engineer focused on System Architecture, Scalability, and Product Engineering. Specialist in designing robust backend solutions and AI integrations.',
      cta: 'Download CV',
      available: 'Available for new challenges'
    },
    experience: {
      title: 'Career Trajectory',
      jobs: [
        {
          company: 'Dopster',
          role: 'Senior Software Engineer',
          period: '10 months ago - Present',
          description: 'Technical leadership in scalable microservices architecture. Implementation of Clean Architecture and DDD for high-complexity systems. Responsible for critical payment gateways and asynchronous messaging with RabbitMQ.',
          stack: ['.NET', 'NestJS', 'Next.js', 'Docker', 'SQL', 'RabbitMQ']
        },
        {
          company: 'Sentiria',
          role: 'Principal Engineer (Freelance)',
          period: 'Present',
          description: 'Principal Engineer focused on Autonomous Agents R&D. Architecting generative AI pipelines (Gemini) and high-performance APIs with FastAPI for business automation.',
          stack: ['React', 'FastAPI', 'Postgres', 'AI Agents', 'Gemini']
        },
        {
          company: 'SinergiaRh',
          role: 'Mid-Level Software Engineer',
          period: 'Jun 2023 - Dec 2024',
          description: 'Modernization of critical legacy HR systems. Focused on SQL query optimization, frontend component refactoring to React, and performance improvements in .NET applications.',
          stack: ['C#', '.NET', 'React', 'SQL Server']
        },
        {
          company: 'SinergiaRh',
          role: 'Jr Software Engineer',
          period: 'Jan 2022 - Jun 2023',
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
      categories: [
        { name: 'Core', skills: ['Next.js', 'React', '.NET', 'Python', 'TypeScript'] },
        { name: 'Backend & Data', skills: ['Node.js', 'NestJS', 'FastAPI', 'SQL', 'PostgreSQL', 'RabbitMQ'] },
        { name: 'DevOps & Cloud', skills: ['Docker', 'AWS', 'CI/CD', 'Clean Arch', 'DDD'] },
        { name: 'AI Engineering', skills: ['Gemini AI', 'AI Agents', 'LLMs', 'Prompt Eng'] }
      ]
    },
    footer: {
      rights: 'Designed & Built by Guilherme Coutinho.'
    }
  }
};

// --- Utilities ---

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 text-zinc-100 transition-colors duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] md:text-xs font-medium font-mono text-zinc-400 ring-1 ring-inset ring-white/5 ${className}`}>
    {children}
  </span>
);

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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-center">
        <div className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 rounded-full border transition-all duration-500 ${scrolled ? 'bg-zinc-900/80 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50' : 'bg-transparent border-transparent'}`}>
          
          <div 
            className="font-mono font-bold text-lg tracking-tighter text-white cursor-pointer mr-4 md:mr-8 hidden md:block"
            onClick={(e) => scrollToSection(e as any, 'top')}
          >
            GC<span className="text-primary">.dev</span>
          </div>

          <ul className="flex items-center gap-1 md:gap-2">
            {['experience', 'projects', 'skills'].map((key) => (
              <li key={key}>
                <a 
                  href={`#${key}`} 
                  onClick={(e) => scrollToSection(e, key)}
                  className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-white/10 mx-2 md:mx-4"></div>

          <button 
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono text-zinc-300 transition-all"
          >
            <Languages size={14} />
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ t }: { t: any }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-background bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      {/* Radial Spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
          style={{ y: y1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            {t.hero.available}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
            {t.hero.greeting.split("Guilherme").map((part, i) => 
              i === 0 ? part : <span key={i} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Guilherme Coutinho</span>
            )}
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="#" 
              download
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-zinc-50 px-8 font-medium text-zinc-900 transition-all hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              <span className="mr-2"><Download size={18} /></span>
              {t.hero.cta}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            </a>
            
            <div className="flex items-center gap-6 md:ml-8 mt-4 md:mt-0">
              <a href="https://github.com" className="text-zinc-400 hover:text-white transition-colors"><Github size={22} /></a>
              <a href="https://linkedin.com" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={22} /></a>
              <a href="mailto:guilhermesilba811@gmail.com" className="text-zinc-400 hover:text-white transition-colors"><Mail size={22} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = ({ t }: { t: any }) => {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
          
          {/* Sticky Title */}
          <div className="md:w-1/3 md:sticky md:top-32">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {t.experience.title}
            </h2>
            <p className="text-zinc-400 mb-8">
              {t.nav.experience === 'Experience' 
                ? 'A timeline of my professional contributions and technical growth.' 
                : 'Uma linha do tempo das minhas contribuições profissionais e crescimento técnico.'}
            </p>
            <div className="h-px w-12 bg-primary/50"></div>
          </div>

          {/* Timeline */}
          <div className="md:w-2/3 space-y-8">
            {t.experience.jobs.map((job: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="group">
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-primary transition-colors">{job.role}</h3>
                      <span className="text-xs font-mono text-zinc-500">{job.period}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <Briefcase size={14} className="text-zinc-500" />
                      <span className="text-sm font-medium text-zinc-300">{job.company}</span>
                    </div>

                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.stack.map((tech: string) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = ({ t }: { t: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = t.projects.items;

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section id="projects" className="py-32 bg-zinc-900/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">{t.projects.title}</h2>
          <p className="text-zinc-400 text-lg">{t.projects.subtitle}</p>
        </div>

        <div className="relative">
          <div className="flex justify-end gap-4 mb-6">
            <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]"
              >
                {/* Project Image */}
                <div className="lg:col-span-3 relative h-64 lg:h-auto overflow-hidden bg-black">
                  <img 
                    src={items[currentIndex].image} 
                    alt={items[currentIndex].title} 
                    className="object-cover w-full h-full opacity-80 transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent lg:bg-gradient-to-l" />
                </div>

                {/* Project Details */}
                <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 bg-zinc-900/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-primary"></div>
                    <span className="text-primary text-xs font-mono uppercase tracking-widest">{items[currentIndex].category}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">{items[currentIndex].title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-8">
                    {items[currentIndex].description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {items[currentIndex].stack.map((tech: string) => (
                          <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-xs font-mono text-zinc-300 border border-white/5">
                            {tech === 'Next.js' || tech === 'React' ? <Code2 size={12} /> : <Terminal size={12} />}
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="group flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors pt-4">
                      See Project Details
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = ({ t }: { t: any }) => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">{t.skills.title}</h2>
          <p className="text-zinc-400">
             {t.nav.skills === 'Skills' 
                ? 'My technical arsenal for building high-performance applications.' 
                : 'Meu arsenal técnico para construir aplicações de alta performance.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.skills.categories.map((cat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
                    {index === 0 ? <Layers size={20} /> : 
                     index === 1 ? <Database size={20} /> :
                     index === 2 ? <Cloud size={20} /> : <Zap size={20} />}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-4">{cat.name}</h3>
                  
                  <div className="space-y-2 mt-auto">
                    {cat.skills.map((skill: string) => (
                      <div key={skill} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                        <div className="h-1 w-1 rounded-full bg-zinc-700"></div>
                        {skill}
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

const App = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = DATA[lang];

  return (
    <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-indigo-500/30">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
      </main>
      <footer className="py-12 border-t border-white/5 bg-zinc-900/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">{t.footer.rights}</p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-600">
            <span>React 19</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);