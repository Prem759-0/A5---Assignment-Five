/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ArrowUpRight, 
  ChevronDown, 
  Instagram, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  Monitor,
  Layout,
  Eye,
  Palette,
  ArrowUp,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// --- Layout Helpers ---

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// --- Components ---

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-9 h-9 rounded-full border-2 border-black flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-black">
      <div className="w-1.5 h-1.5 rounded-full bg-black transition-all duration-500 group-hover:bg-white group-hover:scale-150" />
      <div className="absolute inset-0 border-[3px] border-transparent border-t-black/10 rounded-full animate-spin-slow" />
    </div>
    <span className="font-bold text-2xl tracking-tighter uppercase">øliv</span>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/#blog" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </Link>
          <div className="hidden md:flex items-center">
             <span className="bg-[#FFF4E8] text-[#D18F45] px-3 py-1 rounded-full text-xs font-medium border border-[#FBEAD6]">
              We are hiring!
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <a key={link.name} href={link.href} className="hover:opacity-60 transition-opacity">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.href} className="hover:opacity-60 transition-opacity">{link.name}</Link>
            )
          ))}
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-60 transition-opacity group">
            <span>Pages</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-60 transition-opacity">
            <span>Cart</span>
            <span className="bg-[#F3F3F3] px-2 py-0.5 rounded-full text-[10px]">0</span>
          </div>
          <Link to="/contact" className="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition-all duration-300">
            Get in Touch
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="bg-black text-white rounded-full py-3 mt-4 text-center">Get in Touch</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3 mb-8 overflow-hidden">
          <motion.div 
            initial={{ w: 0 }}
            whileInView={{ w: "2rem" }}
            viewport={{ once: true }}
            className="w-8 h-[1px] bg-black/20"
          />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Øliv Branding Agency</span>
        </div>
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] font-medium tracking-tighter mb-12 max-w-6xl">
          Building Brands, One Success Story at a Time.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 max-w-xl leading-relaxed mb-12">
          Create a Brand That Resonates: We Can Help You Define and Communicate Your Unique Message.
        </p>
        <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-medium hover:scale-105 transition-transform active:scale-95 flex items-center gap-3">
          Our Services <ArrowUpRight size={20} />
        </button>
      </motion.div>
      <motion.div 
        style={{ y: y2 }}
        className="absolute -z-10 top-0 -right-20 w-[50vw] h-[50vw] bg-[#F3F6F6] rounded-full blur-[120px] opacity-60"
      />
    </section>
  );
};

const LogoGrid = () => {
  const logos = [
    { name: "N", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "LOGOIPSUM", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "LOGO", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "logoipsum", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "OLIV", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "C", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "DESIGN", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "STUDIO", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "CREATIVE", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "DIGITAL", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
    { name: "BRAND", src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-20 border-t border-gray-100 overflow-hidden relative grayscale opacity-30 hover:opacity-100 transition-opacity duration-700">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap items-center gap-24"
      >
        {duplicatedLogos.map((logo, i) => (
          <div 
            key={i}
            className="flex items-center gap-2 text-3xl font-black tracking-tighter"
          >
            {logo.name}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Brand Strategy",
      description: "We help businesses define their unique brand message and branding positioning.",
      link: "About Strategy"
    },
    {
      title: "Visual Identity",
      description: "We create visual elements such as logos, packaging, and marketing materials for your brand.",
      link: "About Identity"
    },
    {
      title: "Digital Marketing",
      description: "We help businesses to promote their brand online and create engaging digital experiences.",
      link: "About Marketing"
    },
    {
      title: "Brand Management",
      description: "We help businesses to implement their brand across all touchpoints and ensure consistency.",
      link: "About Management"
    }
  ];

  return (
    <section id="services" className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.08)" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="bg-[#F6F6F6] p-10 flex flex-col justify-between min-h-[400px] hover:bg-white transition-all cursor-pointer group rounded-sm border border-transparent hover:border-black/5"
          >
            <div>
              <h3 className="text-2xl font-serif mb-6">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium border-b border-black w-fit pb-1 group-hover:gap-2 transition-all">
              {service.link}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SelectedWork = () => {
  const works = [
    {
      title: "Invision Studio",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      color: "bg-[#FADBD8]", // Pinkish
      icon: <Monitor size={14} />
    },
    {
      title: "Square Media",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
      color: "bg-[#D5F5E3]", // Greenish
      icon: <Layout size={14} />
    },
    {
      title: "Vision Design",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
      color: "bg-[#FAE5D3]", // Orangeish
      icon: <Eye size={14} />
    },
    {
      title: "Design Bros",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1611117775350-ac3950990985?w=800&q=80",
      color: "bg-[#EBF5FB]", // Bluish
      icon: <Palette size={14} />
    }
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-end mb-12"
      >
        <div className="flex flex-col gap-4">
           <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Our Work</span>
           <h2 className="text-6xl font-serif">Selected Work</h2>
        </div>
        <button className="border border-black rounded-full px-6 py-2 text-sm hover:bg-black hover:text-white transition-all">
          All Work
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {works.map((work, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i % 2 * 0.1 }}
            className="group cursor-pointer"
          >
            <div className={`aspect-[4/3] mb-6 overflow-hidden relative ${work.color} rounded-sm`}>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={work.image} 
                alt={work.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-100"
              />
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {work.icon}
                </div>
                <h4 className="text-xl font-medium tracking-tight">{work.title}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                  {work.category}
                </span>
                <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const OurValues = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Our Values</span>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-[#EEF3F6] p-10 flex flex-col justify-between min-h-[500px] rounded-sm"
          >
             <div>
                <span className="text-[10px] uppercase tracking-widest font-bold mb-10 block">Services</span>
                <h3 className="text-4xl font-serif leading-tight">Our Approach to Branding.</h3>
             </div>
             <Link 
              to="/about"
              className="bg-black text-white px-6 py-3 rounded-full text-xs w-fit flex items-center gap-2 hover:gap-3 transition-all"
             >
                About Oliv <ArrowUpRight size={14} />
             </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#F3F6F6] p-10 flex flex-col justify-between min-h-[500px] rounded-sm"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold">Helping brands stand out</span>
             <h3 className="text-xl font-bold uppercase tracking-tight max-w-[150px]">Bold Moves, Big Impact.</h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-[#F8F8F8] p-10 flex flex-col justify-between min-h-[500px] rounded-sm transition-all"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold">How we work with our client</span>
             <h3 className="text-xl font-bold uppercase tracking-tight max-w-[150px]">Honesty is the best policy.</h3>
          </motion.div>

          <div className="grid grid-rows-2 gap-4">
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 0.98 }}
                className="bg-[#F7F7F7] p-8 flex flex-col justify-between rounded-sm"
             >
                <span className="text-[10px] uppercase tracking-widest font-bold">Collaboration is key</span>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="bg-[#FDF3EA] p-8 flex flex-col justify-between rounded-sm"
             >
                <span className="text-[10px] uppercase tracking-widest font-bold">Our Approach</span>
             </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 hidden md:block"></div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-[#F6F6F6] p-8 flex flex-col justify-between min-h-[250px] rounded-sm"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold">Collaboration is key</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#F9EFE4] p-8 flex flex-col justify-between min-h-[250px] rounded-sm"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold">Our Approach</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-[#FEF9E7] p-8 flex flex-col justify-between min-h-[250px] rounded-sm"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold">Our Philosophy</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experts = () => {
  const team = [
    { name: "Annette Black", role: "Branding", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" },
    { name: "Devon Lane", role: "Branding", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80" },
    { name: "Chris Watson", role: "Branding", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-12"
      >
        <h2 className="text-6xl font-serif tracking-tight">Our Team of Experts</h2>
        <Link to="/about" className="border border-black rounded-full px-6 py-2 text-sm hover:bg-black hover:text-white transition-all">About Us</Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#EEF3F6] p-10 flex flex-col justify-between min-h-[400px] rounded-sm"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold mb-6 block">Join the Team</span>
            <h3 className="text-2xl font-serif">Want to shape the future of branding?</h3>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">Join us and shape the future of branding today!</p>
          </div>
          <Link to="/jobs" className="bg-black text-white px-6 py-3 rounded-full text-xs w-fit hover:scale-105 transition-transform">View Openings</Link>
        </motion.div>

        {team.map((member, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-[3/4] bg-[#F3F3F3] mb-4 overflow-hidden rounded-sm">
               <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
               />
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{member.name}</h4>
              <span className="text-[10px] border border-black rounded-full px-3 py-1 uppercase">{member.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-[#EEF3F6] rounded-[2rem] p-12 md:p-24 relative overflow-hidden"
      >
         <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-bold mb-12 block">Contact</span>
            <h2 className="text-5xl md:text-7xl font-serif max-w-2xl leading-[1.1] mb-8">
              Let's start building your brand's unique story together.
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-md">
              Want to see what a difference a strong brand can make? Request a consultation today.
            </p>
            <Link to="/contact" className="bg-black text-white px-8 py-4 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 w-fit">
              Get In Touch <ArrowUpRight size={18} />
            </Link>
         </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Logo />
            </Link>
          </div>
          
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Follow us</span>
            <div className="flex gap-3">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <Instagram size={16} className="group-hover:scale-110 transition-transform" />
               </a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <Twitter size={16} className="group-hover:scale-110 transition-transform" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
               </a>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium mb-8">Pages</h5>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-black transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-black transition-colors">About</Link></li>
            <li><Link to="/jobs" className="hover:text-black transition-colors">Jobs</Link></li>
            <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
          </ul>
           <button className="mt-12 bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-tight hover:scale-105 transition-transform active:scale-95">
              More Templates
            </button>
        </div>

        <div>
           <h5 className="font-medium mb-8">CMS</h5>
           <ul className="space-y-4 text-gray-500 font-medium">
            <li><Link to="/work" className="hover:text-black transition-colors">Work</Link></li>
            <li><Link to="/work-single" className="hover:text-black transition-colors">Work Single</Link></li>
            <li><Link to="/blog" className="hover:text-black transition-colors">Blog</Link></li>
            <li><Link to="/blog-single" className="hover:text-black transition-colors">Blog Single</Link></li>
            <li><Link to="/shop" className="hover:text-black transition-colors">Shop</Link></li>
            <li><Link to="/shop-single" className="hover:text-black transition-colors">Shop Single</Link></li>
          </ul>
        </div>

        <div>
           <h5 className="font-medium mb-8">Utility Pages</h5>
           <ul className="space-y-4 text-gray-500 font-medium">
            <li><Link to="/404" className="hover:text-black transition-colors">404 Error Page</Link></li>
            <li><Link to="/protected" className="hover:text-black transition-colors">Password Protected</Link></li>
            <li><Link to="/styleguide" className="hover:text-black transition-colors">Styleguide</Link></li>
            <li><Link to="/licencing" className="hover:text-black transition-colors">Licencing</Link></li>
            <li><Link to="/changelog" className="hover:text-black transition-colors">Changelog</Link></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        <p>© 2024 ØLIV AGENCY - ALL RIGHTS RESERVED</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          <Link to="/imprint" className="hover:text-black transition-colors">Imprint</Link>
        </div>
      </div>
    </footer>
  );
};

const TextBlock = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
       <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
       >
          <div className="lg:col-span-8">
             <h2 className="text-5xl md:text-8xl font-serif leading-[1] tracking-tight">
                Crafting Exceptional Digital Experiences Across All Platforms: Our Goal at Øliv.
             </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-16 grid grid-cols-1 gap-8 text-gray-600 leading-relaxed md:grid-cols-2 lg:grid-cols-1">
             <p className="text-sm">
                At Øliv, our goal is to craft exceptional digital experiences across all platforms. In today's digitally driven world, having a strong online presence is paramount for businesses to connect with their target audience effectively. We understand the importance of delivering seamless and engaging experiences that leave a lasting impression.
             </p>
             <p className="text-sm">
                Our team of skilled designers, developers, and digital strategists collaborate to create customized digital solutions tailored to your unique business needs. Whether it's designing a user-friendly website, developing a mobile application, or enhancing your e-commerce platform, we strive to provide solutions that not only meet but exceed your expectations.
             </p>
          </div>
       </motion.div>
    </section>
  );
};

const BlogSection = () => {
  const posts = [
    {
      title: "The Importance of a Strong Brand Positioning",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&q=80",
    },
    {
      title: "Creating a Consistent Brand Identity Across All Touchpoints",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80",
    },
    {
      title: "The Role of Market Research in Branding Strategy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    },
    {
      title: "The Impact of Social Media on Branding",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&q=80",
    },
  ];

  return (
    <section id="blog" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-100">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
           <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Blog</span>
           <h2 className="text-6xl font-serif">Insights on Branding</h2>
        </div>
        <button className="border border-black rounded-full px-6 py-2 text-sm uppercase font-bold tracking-tighter hover:bg-black hover:text-white transition-all">See All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-[#F3F3F3] mb-4 overflow-hidden rounded-sm">
               <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
            </div>
            <h4 className="font-medium text-sm leading-snug mb-3 group-hover:text-gray-600 transition-colors">{post.title}</h4>
            <div className="flex items-center gap-2 group/btn cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors group-hover/btn:underline underline-offset-4">Read Article</span>
              <ArrowUpRight size={12} className="text-gray-400 group-hover:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ComingSoon = ({ title }: { title: string }) => (
  <PageTransition>
    <section className="pt-36 pb-42 px-6 max-w-7xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-serif mb-6">{title}</h1>
      <p className="text-xl text-gray-500 max-w-md mb-12">
        We are currently crafting this part of our digital experience. Stay tuned for something exceptional.
      </p>
      <Link to="/" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </section>
  </PageTransition>
);

const HomePage = () => (
  <PageTransition>
    <Hero />
    <LogoGrid />
    <ServicesGrid />
    <SelectedWork />
    <OurValues />
    <TextBlock />
    <Experts />
    <CTA />
    <BlogSection />
  </PageTransition>
);

const ServicesPage = () => (
  <PageTransition>
    <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 block">Our Expertise</span>
        <h1 className="text-7xl font-serif max-w-4xl leading-[1.1]">We provide full-service digital solutions for modern brands.</h1>
      </div>
      <ServicesGrid />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#EEF3F6] p-12 rounded-2xl">
          <h3 className="text-3xl font-serif mb-6">Discovery & Strategy</h3>
          <p className="text-gray-600 leading-relaxed mb-8">We start every project with a deep dive into your business, market, and audience to build a solid foundation.</p>
          <ul className="space-y-4">
            {["Market Research", "User Personas", "Competitive Analysis", "Brand Audit"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#F6F6F6] p-12 rounded-2xl">
          <h3 className="text-3xl font-serif mb-6">Design & Development</h3>
          <p className="text-gray-600 leading-relaxed mb-8">Creative execution meets technical excellence to bring your brand to life in the digital space.</p>
          <ul className="space-y-4">
            {["UI/UX Design", "Custom Web Development", "Mobile Applications", "E-commerce Solutions"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    <CTA />
  </PageTransition>
);

const BlogPage = () => (
  <PageTransition>
    <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 block">Our Journal</span>
        <h1 className="text-7xl font-serif max-w-4xl leading-[1.1]">Thoughts, insights, and stories from our creative team.</h1>
      </div>
      <BlogSection />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 mb-6 rounded-sm overflow-hidden">
               <img 
                src={`https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80&sig=${i}`} 
                alt="Workspace" 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
               />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-4 block">Archive</span>
            <h3 className="text-xl font-medium group-hover:underline underline-offset-4 decoration-1">Future Perspectives on Branding in a Digital-First World</h3>
          </div>
        ))}
      </div>
    </section>
  </PageTransition>
);

const ContactPage = () => (
  <PageTransition>
    <section className="pt-36 pb-42 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 block">Contact Us</span>
          <h1 className="text-7xl font-serif mb-12">Let's talk about your next project.</h1>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Email us</p>
                <p className="text-xl font-medium">hello@oliv.agency</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Call us</p>
                <p className="text-xl font-medium">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Visit us</p>
                <p className="text-xl font-medium">123 Design Blvd, Creative City</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F6F6F6] p-12 rounded-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold">Full Name</label>
                <input type="text" className="w-full bg-white border border-black/5 rounded-full px-6 py-4 outline-none focus:border-black transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold">Email Address</label>
                <input type="email" className="w-full bg-white border border-black/5 rounded-full px-6 py-4 outline-none focus:border-black transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold">Subject</label>
              <input type="text" className="w-full bg-white border border-black/5 rounded-full px-6 py-4 outline-none focus:border-black transition-colors" placeholder="Branding Project" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold">Message</label>
              <textarea rows={4} className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-black transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
            </div>
            <button className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  </PageTransition>
);

export default function App() {
  return (
    <Router>
      <ScrollToSection />
      <main className="relative overflow-x-hidden min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<ComingSoon title="Selected Work" />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<ComingSoon title="About Øliv" />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<ComingSoon title="404 - Not Found" />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <ScrollToTop />
      </main>
    </Router>
  );
}
