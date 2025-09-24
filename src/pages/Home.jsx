import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, StaggerContainer, FloatingCard, TypewriterText } from '../components/Animations';
import Modal from '../components/Modal';
import { SiGo, SiPython, SiJavascript, SiReact, SiLaravel, SiHtml5, SiCss3, SiGit, SiGithub, SiJenkins, SiCisco, SiBurpsuite, SiMetasploit } from "react-icons/si";
import { FaNetworkWired, FaShieldAlt } from "react-icons/fa";

async function fetchReadmeSummary(user, repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}/readme`, { headers: { Accept: 'application/vnd.github.raw' } });
    if (!res.ok) return '';
    const raw = await res.text();
    const cleaned = cleanMarkdown(raw);
    const para = cleaned.split(/\n{2,}/)[0]?.trim() || '';
    let summary = (para || cleaned).slice(0, 280).trim();
    if ((para || cleaned).length > 280) summary += '…';
    return summary;
  } catch {
    return '';
  }
}

function cleanMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/<img[^>]*>/g, '')
    .replace(/<\/?\w+[^>]*>/g, '')
    .replace(/^\|.*\|$/gm, '')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const GITHUB_USER = 'KxroTM';

export default function Home() {
  const experiences = [
    {
      id: 'exp-b2-reseau',
      title: 'Projet Réseau – B2 (Académique)',
      company: 'Ynov Campus',
      period: '2024',
      category: 'Académique',
      description: 'Conception d’une architecture réseau multi‑VLAN avec switches L2/L3, postes et documentation (DPGF, CCTP).',
      details: 'Étude des besoins, schémas d’architecture et adressage IP. Configuration de switches L2/L3 (VLAN, trunk, routage inter‑VLAN), plan de câblage et inventaire. Rédaction des livrables DPGF/CCTP, matrice de flux, procédures d’exploitation et PV de tests (connectivité, performances). Outils : Cisco Packet Tracer, GNS3.',
      technologies: ['VLAN', 'L2/L3 Switching', 'GNS3', 'Cisco Packet Tracer', 'Firewall'],
      status: 'Terminé'
    },
    {
      id: 'exp-b2-infra',
      title: 'Infra SI – B2 (Académique)',
      company: 'Ynov Campus',
      period: '2024',
      category: 'Académique',
      description: 'Serveur Apache2 avec reverse proxy et load balancing, DNS/DHCP et pipeline CI/CD avec automatisations.',
      details: 'Installation et durcissement d’Apache2 (vhosts, reverse proxy), équilibrage de charge, supervision de base. Mise en place DNS/DHCP, certificats et renouvellements. Chaîne CI/CD (build/test/deploy) avec automatisations de configuration et rollback. Documentation d’exploitation et sécurité. Environnement Linux.',
      technologies: ['Apache2', 'DNS', 'DHCP', 'CI/CD', 'Linux'],
      status: 'Terminé'
    },
    {
      id: 'exp-lab-websec',
      title: 'Laboratoire de tests de sécurité web',
      company: 'Projet perso / Ynov',
      period: '2024',
      category: 'Académique',
      description: 'Application web volontairement vulnérable hébergée sur VM pour l’entraînement au pentest.',
      details: 'Conception d’une VM d’entraînement (applications vulnérables OWASP) : énumération (Nmap, Gobuster), tests auth/injections/XSS, exploitation (Burp Suite, SQLmap), brute force (Hydra), et post‑exploitation basique. Mise en place de correctifs et bonnes pratiques défensives, journalisation et notes de remédiation.',
      technologies: ['Burp Suite', 'Kali/Parrot', 'OWASP', 'SQLmap', 'Nmap'],
      status: 'Terminé'
    },
    {
      id: 'exp-mobile-rn',
      title: 'Application mobile – Invocations (Expo/React Native)',
      company: 'KF Compagny',
      period: '2025',
      category: 'Professionnel',
      location: 'Distanciel',
      description: 'App iOS/Android pour mettre en favoris des invocations du livre "La citadelle du musulman" et les apprendre.',
      details: 'Application mobile iOS/Android qui permet de consulter des invocations tirées du livre "La citadelle du musulman", de les enregistrer en favoris et de les apprendre/mémoriser. Conçue en Expo Go + React Native : parcours par catégories, recherche rapide, ajout/suppression de favoris avec persistance locale (AsyncStorage), mode apprentissage (sélection séquentielle, répétitions) et thèmes clair/sombre. Tests réels via Expo Go sur iOS/Android, packaging et optimisation des performances (listes virtuelles).',
      technologies: ['Expo Go', 'React Native', 'AsyncStorage', 'React Navigation', 'iOS', 'Android'],
      status: 'Terminé'
    },
    {
      id: 'exp-autodidacte',
      title: 'Apprentissage en autodidacte (THM/RootMe/HTB)',
      company: 'Personnel',
      period: '2023 – 2025',
      category: 'Personnel',
      description: 'Montée en compétences régulière sur plateformes d’entraînement en cybersécurité.',
      details: 'Cheminement structuré sur TryHackMe, RootMe et HackTheBox : bonnes pratiques de recon, exploitation web/réseau, cracking et forensics. Création de fiches de révision, scripts d’automatisation (Bash/Python) et veille technique. Objectif court‑terme : eJPT / JR Penetration Tester.',
      technologies: ['TryHackMe', 'RootMe', 'HackTheBox', 'Metasploit', 'Hydra'],
      status: 'Actuel'
    }
    ,{
      id: 'exp-portfolio',
      title: 'Portfolio (React/Vite/Tailwind)',
      company: 'Ynov Campus',
      period: '2025',
      category: 'Académique',
      description: 'Site portfolio moderne à page unique avec intégration GitHub et animations.',
      details: 'Conception et développement d’un portfolio SPA (React 19 + Vite 5, Tailwind CSS, Framer Motion). Sections : À propos, Expériences (avec filtres), Projets dynamiques via API GitHub (lecture et résumé de README), Certifications et Contact. Navbar à ancres avec progression de scroll, fond animé, cartes animées, modale de détails et mises à jour de contenu alignées CV. Intégrations : récupération GitHub, summarization README, tri/filtre des expériences, responsive design et build de production.',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
      status: 'Terminé'
    }
  ];

  const [expOpen, setExpOpen] = useState(null);
  const selectedExp = experiences.find(e => e.id === expOpen) || null;

  function getEndYear(period) {
    if (!period) return 0;
    const m = String(period).match(/(\d{4})(?!.*\d{4})/);
    return m ? parseInt(m[1], 10) : 0;
    }
  const isStage = (e) => /stage/i.test(`${e.title} ${e.description} ${e.details || ''}`);
  const isPortfolio = (e) => e.id === 'exp-portfolio' || /portfolio/i.test(e.title || '');
  const sortedExperiences = [...experiences].sort((a, b) => {
    const ya = getEndYear(a.period);
    const yb = getEndYear(b.period);
    if (yb !== ya) return yb - ya;
    const pa = isPortfolio(a) ? 1 : 0;
    const pb = isPortfolio(b) ? 1 : 0;
    if (pb !== pa) return pb - pa;
    const sa = isStage(a) ? 1 : 0;
    const sb = isStage(b) ? 1 : 0;
    if (sb !== sa) return sb - sa;
    return 0;
  });
  const [expFilter, setExpFilter] = useState('Tous');
  const filteredExperiences = sortedExperiences.filter(e => expFilter === 'Tous' ? true : e.category === expFilter);

  const skills = [
    { name: 'Golang', icon: <SiGo /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'React', icon: <SiReact /> },
    { name: 'Laravel', icon: <SiLaravel /> },
    { name: 'HTML/CSS', icon: <><SiHtml5 /> <SiCss3 /></> },
    { name: 'Git/GitHub', icon: <><SiGit /> <SiGithub /></> },
    { name: 'Jenkins', icon: <SiJenkins /> },
    { name: 'Cisco Packet Tracer', icon: <SiCisco /> },
    { name: 'VLAN/Routing/Firewall', icon: <FaNetworkWired /> },
    { name: 'DNS/DHCP', icon: <FaShieldAlt /> },
    { name: 'Burp Suite', icon: <SiBurpsuite /> },
    { name: 'Metasploit', icon: <SiMetasploit /> }
  ];

  // --- Projets GitHub en dur ---
const githubProjectsData = [
  {
    id: 1,
    title: 'projet_dev',
    description: 'Projet de développement Python.',
    github: 'https://github.com/KxroTM/projet_dev',
    homepage: '',
    topics: ['Python']
  },
  {
    id: 2,
    title: 'TetrisGame',
    description: 'Jeu Tetris en C#.',
    github: 'https://github.com/KxroTM/TetrisGame',
    homepage: '',
    topics: ['C#', 'Game']
  },
  {
    id: 3,
    title: 'ui_design',
    description: 'Projet de design d’interface en Go.',
    github: 'https://github.com/KxroTM/ui_design',
    homepage: '',
    topics: ['Go', 'UI']
  },
  {
    id: 4,
    title: 'Projet-Reseau',
    description: 'Projet académique réseau.',
    github: 'https://github.com/KxroTM/Projet-Reseau',
    homepage: '',
    topics: ['Réseau']
  },
  {
    id: 5,
    title: 'ynov-html-deployment',
    description: 'Déploiement HTML pour Ynov.',
    github: 'https://github.com/KxroTM/ynov-html-deployment',
    homepage: '',
    topics: ['HTML']
  },
  {
    id: 6,
    title: 'e-commerce-SQL',
    description: 'Projet e-commerce avec SQL et Go.',
    github: 'https://github.com/KxroTM/e-commerce-SQL',
    homepage: '',
    topics: ['Go', 'SQL', 'E-commerce']
  },
  {
    id: 7,
    title: 'OFP-discord_MMORPG',
    description: 'MMORPG Discord en Python.',
    github: 'https://github.com/KxroTM/OFP-discord_MMORPG',
    homepage: '',
    topics: ['Python', 'Discord', 'MMORPG']
  },
  {
    id: 8,
    title: 'Portfolio',
    description: 'Portfolio JavaScript.',
    github: 'https://github.com/KxroTM/Portfolio',
    homepage: '',
    topics: ['JavaScript', 'Portfolio']
  },
  {
    id: 9,
    title: 'TP-Ammari_Youssef',
    description: 'TP académique en Go.',
    github: 'https://github.com/KxroTM/TP-Ammari_Youssef',
    homepage: '',
    topics: ['Go', 'TP']
  },
  {
    id: 10,
    title: 'InfraSI',
    description: 'Projet d’infrastructure SI en CSS.',
    github: 'https://github.com/KxroTM/InfraSI',
    homepage: '',
    topics: ['CSS', 'Infrastructure']
  },
  {
    id: 11,
    title: 'Groupie-Trackers',
    description: 'Application Groupie Trackers en Go.',
    github: 'https://github.com/KxroTM/Groupie-Trackers',
    homepage: '',
    topics: ['Go', 'Application']
  },
  {
    id: 12,
    title: 'HangmanSouls',
    description: 'Jeu du pendu (Hangman) en HTML.',
    github: 'https://github.com/KxroTM/HangmanSouls',
    homepage: '',
    topics: ['HTML', 'Game', 'Student project']
  },
  {
    id: 13,
    title: 'Netpbm',
    description: 'Projet Netpbm en Go.',
    github: 'https://github.com/KxroTM/Netpbm',
    homepage: '',
    topics: ['Go', 'Netpbm']
  },
  {
    id: 14,
    title: 'Hangman-Ultimate',
    description: 'Jeu Hangman Ultimate en Go.',
    github: 'https://github.com/KxroTM/Hangman-Ultimate',
    homepage: '',
    topics: ['Go', 'Game', 'Student project']
  },
  {
    id: 15,
    title: 'T2OTFP-RPG',
    description: 'Premier projet RPG étudiant en Go.',
    github: 'https://github.com/KxroTM/T2OTFP-RPG',
    homepage: '',
    topics: ['Go', 'RPG', 'Student project']
  }
];
const PROJECTS_PER_PAGE = 9;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(githubProjectsData.length / PROJECTS_PER_PAGE);
const paginatedProjects = githubProjectsData.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

  return (
    <div>
      <section id="home" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="text-center mb-24">
            <FadeInUp><br /><br /><br /><br /><br /><br />
              <div className="text-4xl sm:text-5xl font-bold leading-tight">Ammari Youssef</div>
              <div className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                <TypewriterText>Expert en</TypewriterText>
                <motion.span className="block text-sky-400 mt-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  Cybersécurité
                </motion.span>
              </div>
            </FadeInUp>
            <br /><br /><br />
          </div>
          <StaggerContainer className="grid md:grid-cols-3 gap-12 mt-16">
            {[
              { icon: '🛡️', title: 'Cybersécurité', desc: 'Protection des données et systèmes' },
              { icon: '💻', title: 'Développement', desc: 'Applications web sécurisées' },
              { icon: '🔍', title: 'Analyse', desc: 'Audit et tests de pénétration' }
            ].map((h, i) => (
              <FloatingCard key={h.title} delay={i * 0.1} className="p-8 text-center">
                <motion.div className="text-3xl mb-2" whileHover={{ scale: 1.1 }}>{h.icon}</motion.div>
                <h3 className="text-lg font-semibold text-sky-400 mb-1">{h.title}</h3>
                <p className="text-gray-300 text-sm">{h.desc}</p>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <section id="about" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="section-header mb-12">
            <FadeInUp>
              <h2 className="section-title">À propos</h2>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <p className="section-subtitle">Passionné par le développement et la sécurité.</p>
            </FadeInUp>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 gap-12">
            <FloatingCard delay={0} className="p-8">
              <h3 className="text-sky-400 text-lg font-semibold mb-3">Qui je suis</h3>
              <p className="text-gray-300 leading-relaxed">
                Étudiant en cybersécurité et développement basé à Paris, je conçois des solutions sécurisées et fiables.
                Compétent en réseaux (VLAN, routage, firewall), développement (Golang, Python, JavaScript/React, Laravel)
                et pentest (Burp Suite, Nmap, Metasploit). À la recherche d’une alternance, je renforce mes pratiques sur
                TryHackMe, RootMe et HackTheBox.
              </p>
              <br />
            </FloatingCard>
            <FloatingCard delay={0.1} className="p-8">
              <h3 className="text-sky-400 text-lg font-semibold mb-3">Compétences clés</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.span
                    key={s.name}
                    className="px-3 py-1 bg-sky-400/10 text-sky-300 rounded-full text-sm border border-sky-400/20 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                  >
                    <span className="text-lg">{s.icon}</span>
                    {s.name}
                  </motion.span>
                ))}
              </div>
              <br />
            </FloatingCard>
          </StaggerContainer>
        </div>
      </section>
      <section id="experience" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="section-header mb-10">
            <h2 className="section-title">Expérience</h2>
            <p className="section-subtitle">Mon parcours professionnel</p>
          </div>
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {['Tous', 'Professionnel', 'Académique', 'Personnel'].map(cat => (
              <button
                key={cat}
                onClick={() => setExpFilter(cat)}
                className={`px-3 py-1 rounded-full text-sm border transition ${expFilter === cat ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'border-sky-400/20 text-sky-300 hover:border-sky-400/40'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <br />
          <br />
          <StaggerContainer className="grid md:grid-cols-2 gap-12">
            {filteredExperiences.map((exp, i) => (
              <FloatingCard key={exp.id} delay={i * 0.1} className="relative overflow-hidden rounded-xl border border-sky-400/15 bg-[var(--bg-card)] backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all hover:border-sky-400/35 hover:bg-[var(--bg-card-hover)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] ring-0 hover:ring-1 hover:ring-sky-400/25 before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(250px_100px_at_top,rgba(125,211,252,0.07),transparent_60%)] p-8">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-sky-400">{exp.title}</h3>
                    <span className="text-xs text-sky-300/80">{exp.category}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${exp.status === 'Actuel' ? 'text-green-400 border-green-400/40' : 'text-gray-400 border-gray-400/40'}`}>{exp.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <span>{exp.company}{exp.location ? ` • ${exp.location}` : ''}</span>
                  <span className="text-sky-300">{exp.period}</span>
                </div>
                <p className="text-gray-300 mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((t) => (
                    <span key={t} className="px-2 py-1 bg-sky-400/10 text-sky-300 rounded text-xs border border-sky-400/20">{t}</span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setExpOpen(exp.id)} className="modern-button px-4 py-2 text-sm border-sky-400 text-sky-400">Voir les détails</button>
                </div>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <section id="projects" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="section-header mb-10">
            <h2 className="section-title">Projets</h2>
            <p className="section-subtitle">Sélection de travaux</p>
          </div>
          {paginatedProjects.length === 0 ? (
            <p className="text-gray-400">Aucun projet public trouvé.</p>
          ) : (
            <>
              <br />
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {paginatedProjects.map(p => (
                  <FloatingCard
                    key={p.id}
                    className="relative overflow-hidden rounded-xl border border-sky-400/15 hover:border-sky-400/35 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] hover:ring-1 hover:ring-sky-400/25 p-8 flex flex-col h-full"
                  >
                    <h3 className="text-lg font-semibold text-sky-400 mb-2 break-words">{p.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{p.description}</p>
                    {p.topics?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.topics.slice(0, 6).map(t => (
                          <span key={t} className="text-xs text-sky-300/90 bg-sky-400/10 border border-sky-400/20 rounded-md px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-2">
                      <a
                        href={p.github || 'https://github.com/'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-sky-400/40 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400/60 transition"
                      >
                        GitHub
                      </a>
                      {p.homepage && (
                        <a
                          href={p.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-sky-400/40 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400/60 transition"
                        >
                          Démo
                        </a>
                      )}
                    </div>
                  </FloatingCard>
                ))}
              </StaggerContainer>
              {totalPages > 1 && (
                <>
                  <br />
                  <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => {
                          setCurrentPage(i + 1);
                          const section = document.getElementById('projects');
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm border transition ${currentPage === i + 1 ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'border-sky-400/20 text-sky-300 hover:border-sky-400/40'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
      <section id="certifications" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="section-header mb-10">
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">Gages de confiance et de compétence</p>
          </div>
          <StaggerContainer className="grid md:grid-cols-4 gap-10">
            {[
              { name: 'Objectif: eJPT', org: 'INE', year: '2025' },
              { name: 'En cours: JR Penetration Tester', org: 'TryHackMe', year: '2025' },
              { name: 'Intro Cybersecurity', org: 'Cisco NetAcad', year: '2025' },
              { name: 'Linux Essentials', org: 'Cisco/NDG', year: '2024' }
            ].map((c,i)=>(
              <FloatingCard key={c.name} delay={i*0.1} className="p-7 text-center">
                <h3 className="text-sky-400 font-semibold">{c.name}</h3>
                <p className="text-gray-400 text-sm">{c.org} • {c.year}</p>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <section id="contact" className="scroll-mt-28 page-container">
        <div className="page-content">
          <div className="section-header mb-10">
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">Discutons de votre besoin</p>
          </div>
          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {[{label:'Email',icon:'✉️',href:'mailto:ammari.youssef2003@gmail.com'},{label:'LinkedIn',icon:'💼',href:'https://www.linkedin.com/in/youssef-ammari2003/'},{label:'GitHub',icon:'🐱',href:'https://github.com/KxroTM'}].map((item,i)=> (
              <FloatingCard key={item.label} delay={i*0.1} className="relative overflow-hidden rounded-xl border border-sky-400/15 bg-[var(--bg-card)] backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all hover:border-sky-400/35 hover:bg-[var(--bg-card-hover)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] ring-0 hover:ring-1 hover:ring-sky-400/25 before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(250px_100px_at_top,rgba(125,211,252,0.07),transparent_60%)] p-8 text-center">
                <a href={item.href} className="block w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl leading-none">{item.icon}</span>
                  <span className="text-sky-400 font-semibold text-center">{item.label}</span>
                </a>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <Modal
        isOpen={!!selectedExp}
        onClose={() => setExpOpen(null)}
        title={selectedExp ? selectedExp.title : ''}
        footer={selectedExp ? (
          <div className="flex justify-end">
            <button onClick={() => setExpOpen(null)} className="modern-button px-4 py-2 text-sm border-sky-400 text-sky-400">Fermer</button>
          </div>
        ) : null}
      >
        {selectedExp ? (
          <div className="space-y-3">
            <p className="text-gray-300"><span className="text-gray-400">Organisation:</span> {selectedExp.company}</p>
            <p className="text-gray-300"><span className="text-gray-400">Période:</span> {selectedExp.period}</p>
            <p className="text-gray-200 leading-relaxed">{selectedExp.details}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedExp.technologies.map(t => (
                <span key={t} className="text-xs text-sky-300/90 bg-sky-400/10 border border-sky-400/20 rounded-md px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}