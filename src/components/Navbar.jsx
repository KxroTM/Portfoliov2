import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      setProgress(p);
    };
    const handleResize = () => handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const links = [
    { href: '#home', label: 'Accueil' },
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`modern-nav ${isScrolled ? 'shadow-[0_12px_30px_rgba(0,0,0,0.35)]' : ''}`}>
      <div className="nav-container">
        <div className="hidden md:flex w-full items-center justify-center relative">
          <ul className="nav-links flex relative">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link relative px-3 py-1 rounded-md transition-all duration-200 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden ml-auto p-3 text-gray-300 hover:text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${open ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </div>
        </button>

        {open && (
          <div className="absolute top-full left-0 w-full bg-black/90 border-b border-sky-500/20 md:hidden">
            <ul className="flex flex-col py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 text-center transition-colors duration-300 text-gray-300 hover:text-sky-400 hover:bg-sky-400/5"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-sky-400/70 pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
