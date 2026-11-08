import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Moon,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Award,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Star,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Coffee,
  CakeSlice,
  IceCream,
  UtensilsCrossed,
  PartyPopper,
  Flame,
  Wine,
  Mic,
  Maximize2,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

// Import delle 2 locandine ufficiali fornite dall'utente
import anniversario40Img from './assets/promozioni/anniversario-40.jpg';
import promoSpritzImg from './assets/promozioni/promo-spritz.jpg';

gsap.registerPlugin(ScrollTrigger);

// 39 Foto reali di Old Moon
const allGalleryPhotos = Array.from({ length: 39 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: i + 1,
    src: `/gallery/oldmoon-${num}.jpeg`,
    title: `Old Moon • Foto ${i + 1}`,
    category: i % 4 === 0 ? 'Pasticceria' : i % 4 === 1 ? 'Il Locale' : i % 4 === 2 ? 'Gelateria' : 'Bistrot'
  };
});

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('pasticceria');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const mainRef = useRef(null);

  // Monitor scroll per la navbar fluttuante
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scorciatoie da tastiera per il Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImg) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        navigateLightbox(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, lightboxIndex]);

  // Animazioni GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero element fade-up
      gsap.from('.hero-anim', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Value Section reveal
      gsap.from('.value-card', {
        scrollTrigger: {
          trigger: '.value-section',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Philosophy word-by-word reveal
      gsap.from('.philosophy-word', {
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top 75%',
        },
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (src, title, index = null) => {
    setLightboxImg({ src, title });
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    if (lightboxIndex === null) return;
    let nextIndex = lightboxIndex + direction;
    if (nextIndex < 0) nextIndex = allGalleryPhotos.length - 1;
    if (nextIndex >= allGalleryPhotos.length) nextIndex = 0;
    const nextPhoto = allGalleryPhotos[nextIndex];
    setLightboxIndex(nextIndex);
    setLightboxImg({ src: nextPhoto.src, title: nextPhoto.title });
  };

  const menuCategories = {
    pasticceria: {
      title: 'Pasticceria & Dolci Freschi',
      description: 'Lievitazione naturale lenta, sfogliatura dorata e farciture generose preparate ogni notte nel nostro laboratorio.',
      items: [
        { name: 'Cornetti & Sfogliati Caldi', desc: 'Crema pasticcera profumata all’arancia, cioccolato fondente belga, pistacchio o confetture artigianali.', tag: 'Ogni Notte & Giorno' },
        { name: 'Mignon & Pasticceria Secca', desc: 'Bignè chantilly, tartellette alla frutta fresca di stagione e biscotteria da tè tradizionale.', tag: 'I Grandi Classici' },
        { name: 'Torte Artigianali per Ricorrenze', desc: 'Millefoglie croccante, torte ai frutti di bosco, profiterole e bavaresi preparate su misura.', tag: 'Laboratorio Proprio' },
      ],
      img: '/gallery/oldmoon-02.jpeg'
    },
    gelato: {
      title: 'Gelato Artigianale Mantecato',
      description: 'Mantecato giornalmente con latte fresco intero, panna fresca e puree di frutta 100% naturali.',
      items: [
        { name: 'I Gusti Creme Nobili', desc: 'Crema Old Moon all’uovo, Cioccolato belga puro, Pistacchio puro di Sicilia e Nocciola tonda gentile.', tag: 'Mantecato Fresco' },
        { name: 'I Frutti Freschi di Stagione', desc: 'Fragola di bosco, Limone sfusato amalfitano, Frutti rossi e Mango dolce (sorbetti vegani all’acqua).', tag: 'Senza Lattosio' },
        { name: 'Coppe, Frappè & Affogati', desc: 'Il classico affogato all’espresso caldo o liquore, con panna fresca montata al momento.', tag: 'Salotto' },
      ],
      img: '/gallery/oldmoon-07.jpeg'
    },
    caffetteria: {
      title: 'Caffetteria & Estratti Puri',
      description: 'Dalla tostatura selezionata per il nostro espresso agli estratti purificanti preparati all’istante.',
      items: [
        { name: 'Espresso & Cappuccino d’Autore', desc: 'Miscela speciale con crema compatta color nocciola e latte montato a velluto.', tag: 'La Tradizione' },
        { name: 'Estratti di Frutta & Verdura Espressi', desc: 'Le nostre storiche lavagne: ricette energizzanti, drenanti e vitaminiche con frutta viva al 100%.', tag: '100% Naturale' },
        { name: 'Tè in Foglia & Tisane Pregiate', desc: 'Selezione ricercata di infusi rilassanti, tisane digestive e tè d’origine per i pomeriggi di relax.', tag: 'Momento Relax' },
      ],
      img: '/gallery/oldmoon-09.jpeg'
    },
    bistrot: {
      title: 'Bistrot, Tramezzini & Cocktail Bar',
      description: 'Soluzioni gustose e genuine per una pausa pranzo rilassante o un aperitivo serale a regola d’arte.',
      items: [
        { name: 'Tramezzini Romani Artigianali', desc: 'I celebri tramezzini soffici farciti generosamente con maionese fresca e ingredienti selezionati.', tag: 'Specialità' },
        { name: 'Piatti del Giorno & Tavola Calda', desc: 'Primi della tradizione romana, secondi leggeri, torte salate rustiche e insalatone fresche.', tag: 'Tavola Calda' },
        { name: 'Aperitivo & Cocktail Bar 24/7', desc: 'Spritz d’autore, cocktail miscelati a regola d’arte e una curata selezione di etichette vinicole.', tag: 'Sempre Attivo' },
      ],
      img: '/gallery/oldmoon-15.jpeg'
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedPhotos = showAllPhotos ? allGalleryPhotos : allGalleryPhotos.slice(0, 12);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#FBF9F5] text-neutral-900 overflow-x-hidden selection:bg-terracotta selection:text-white">
      {/* Texture Visiva: Global Noise Overlay con <feTurbulence> Opacità 0.04 */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* TOP ANNOUNCEMENT TICKER: PROMOZIONI ATTIVE IMMEDIATAMENTE VISIBILI IN ALTO */}
      <div className="bg-gradient-to-r from-night via-terracotta to-night text-white py-2 px-4 text-xs font-medium text-center relative z-40 border-b border-gold/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5 font-bold text-gold">
            <PartyPopper className="w-4 h-4 text-gold shrink-0 animate-bounce" />
            <span>40° ANNIVERSARIO:</span>
          </span>
          <span>Giovedì 20 Novembre • Serata Spritz a €4 & Karaoke!</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="flex items-center gap-1 text-sand-light">
            <Flame className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Promo Spritz a €6,00 Tutto Dicembre & Gennaio</span>
          </span>
          <button
            onClick={() => scrollToSection('promozioni')}
            className="underline font-bold text-white hover:text-gold transition-colors ml-1 cursor-pointer"
          >
            Vedi le Locandine &raquo;
          </button>
        </div>
      </div>

      {/* A. NAVBAR — "Floating Presence" */}
      <header
        className={`fixed top-12 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-40 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF9F5]/90 backdrop-blur-lg shadow-soft border border-neutral-200/50 py-3 px-6'
            : 'bg-black/30 backdrop-blur-md border border-white/15 py-3.5 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Old Moon Home"
          >
            <div className="w-9 h-9 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5 fill-terracotta/30 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl tracking-tight font-bold transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
                Old Moon
              </span>
              <span className={`text-[10px] tracking-widest uppercase -mt-1 font-semibold ${scrolled ? 'text-terracotta' : 'text-gold'}`}>
                Dal 1986 • Open 24/7
              </span>
            </div>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('promozioni')}
              className="text-sm font-bold link-micro flex items-center gap-1.5 text-gold hover:text-gold-soft bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/30"
            >
              <PartyPopper className="w-3.5 h-3.5 text-gold" />
              <span>Promozioni & Locandine</span>
            </button>
            <button
              onClick={() => scrollToSection('creazioni')}
              className={`text-sm font-medium link-micro ${scrolled ? 'text-neutral-700 hover:text-terracotta' : 'text-white/90 hover:text-white'}`}
            >
              Menù
            </button>
            <button
              onClick={() => scrollToSection('galleria')}
              className={`text-sm font-medium link-micro ${scrolled ? 'text-neutral-700 hover:text-terracotta' : 'text-white/90 hover:text-white'}`}
            >
              Galleria Foto
            </button>
            <button
              onClick={() => scrollToSection('valore')}
              className={`text-sm font-medium link-micro ${scrolled ? 'text-neutral-700 hover:text-terracotta' : 'text-white/90 hover:text-white'}`}
            >
              I Nostri Valori
            </button>
          </nav>

          {/* CTA Navigazione Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('posizione')}
              className="btn-micro inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-terracotta text-white hover:bg-terracotta-hover shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Vieni a Trovarci</span>
            </button>
          </div>

          {/* Hamburger Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full ${scrolled ? 'text-neutral-800' : 'text-white'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-neutral-200/40 flex flex-col gap-3 pb-2 px-1">
            <button
              onClick={() => scrollToSection('promozioni')}
              className="text-left py-2 text-sm font-bold text-terracotta flex items-center gap-2 bg-terracotta/10 px-3 rounded-lg"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Promozioni & Locandine Ufficiali</span>
            </button>
            <button
              onClick={() => scrollToSection('creazioni')}
              className="text-left py-2 text-sm font-medium text-neutral-800"
            >
              Menù & Specialità
            </button>
            <button
              onClick={() => scrollToSection('galleria')}
              className="text-left py-2 text-sm font-medium text-neutral-800"
            >
              Galleria Foto Locale (39 Foto)
            </button>
            <button
              onClick={() => scrollToSection('valore')}
              className="text-left py-2 text-sm font-medium text-neutral-800"
            >
              I Nostri Valori
            </button>
            <button
              onClick={() => scrollToSection('posizione')}
              className="btn-micro w-full py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-terracotta text-white flex items-center justify-center gap-2 mt-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Vieni a Trovarci • Monteverde</span>
            </button>
          </div>
        )}
      </header>

      {/* B. HERO — "Prima Impressione" */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background Immagine reale Old Moon */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/oldmoon-06.jpeg"
            alt="Old Moon Pasticceria Gelateria Monteverde"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/60 to-night/40" />
        </div>

        {/* Contenuto Hero */}
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white mt-12">
          {/* Badge Heritage & Orari */}
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-wider uppercase text-sand-light font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The New Old Moon dal 1986 • Aperto 24/7 Giorno e Notte</span>
          </div>

          {/* Hero Pattern: Titolo Bold Serif + Sottotitolo Italic grande */}
          <h1 className="hero-anim font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-3">
            Old Moon
          </h1>
          <p className="hero-anim font-serif italic text-2xl md:text-4xl lg:text-5xl text-sand-light/95 font-normal mb-5">
            La tradizione artigianale diventa esperienza.
          </p>

          <p className="hero-anim text-base md:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Caffetteria, pasticceria fresca, gelato naturale mantecato, bistrot e cocktail bar. Il punto di ritrovo storico nel cuore di Monteverde a Roma.
          </p>

          {/* CTA Primaria & Link Rapido Locandine */}
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => scrollToSection('promozioni')}
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase bg-gold text-neutral-950 hover:bg-gold-soft shadow-lg shadow-gold/20"
            >
              <PartyPopper className="w-4 h-4 text-neutral-950" />
              <span>Vedi le 2 Locandine Promozionali</span>
            </button>
            <button
              onClick={() => scrollToSection('posizione')}
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/25"
            >
              <MapPin className="w-4 h-4" />
              <span>Vieni a Trovarci</span>
            </button>
          </div>

          {/* ANTEPRIMA VISIVA DELLE 2 LOCANDINE NELL'HERO (SUBITO VISIBILI AD INIZIO SITO!) */}
          <div className="hero-anim mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {/* Box Anteprima 1: 40° Anniversario */}
            <div
              onClick={() => scrollToSection('promozioni')}
              className="bg-night-surface/90 backdrop-blur-md p-3.5 rounded-2xl border border-gold/40 flex items-center gap-3.5 hover:border-gold cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0 border border-gold/50 shadow-sm bg-neutral-900">
                <img
                  src={anniversario40Img}
                  alt="Anteprima 40 Anni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider block">GIOVEDÌ 20 NOVEMBRE</span>
                <h4 className="font-serif font-bold text-white text-base truncate">40 Anni Insieme a Voi!</h4>
                <p className="text-xs text-neutral-300 font-light truncate">Spritz a €4, Karaoke & Menù a €15</p>
                <span className="text-[11px] text-gold font-medium mt-1 inline-flex items-center gap-1">
                  <span>Guarda locandina</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Box Anteprima 2: Promo Spritz */}
            <div
              onClick={() => scrollToSection('promozioni')}
              className="bg-night-surface/90 backdrop-blur-md p-3.5 rounded-2xl border border-terracotta/40 flex items-center gap-3.5 hover:border-terracotta cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0 border border-terracotta/50 shadow-sm bg-neutral-900">
                <img
                  src={promoSpritzImg}
                  alt="Anteprima Promo Spritz"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block">DICEMBRE & GENNAIO</span>
                <h4 className="font-serif font-bold text-white text-base truncate">Promo Spritz a € 6,00</h4>
                <p className="text-xs text-neutral-300 font-light truncate">Aperitivo invernale tutti i giorni</p>
                <span className="text-[11px] text-terracotta font-medium mt-1 inline-flex items-center gap-1">
                  <span>Guarda locandina</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE IN ALTO: LE 2 LOCANDINE PROMOZIONALI UFFICIALI IN PRIMO PIANO */}
      <section id="promozioni" className="py-20 px-6 bg-[#F3ECE4] relative overflow-hidden border-b border-neutral-300/60">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta font-bold text-xs tracking-wider uppercase mb-3">
              <PartyPopper className="w-4 h-4 text-terracotta" />
              <span>Eventi & Offerte Speciali in Corso</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
              Le Locandine Ufficiali di Old Moon
            </h2>
            <p className="text-neutral-600 text-sm md:text-base mt-3 font-light">
              Clicca sulle locandine per ingrandirle in alta risoluzione o chiama per riservare il tuo tavolo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LOCANDINA 1: 40° ANNIVERSARIO */}
            <div className="bg-white rounded-3xl border-2 border-gold/40 shadow-soft overflow-hidden flex flex-col hover:border-gold transition-colors">
              {/* IMMAGINE DELLA LOCANDINA INTERA (W-FULL H-AUTO, SEMPRE VISIBILE!) */}
              <div
                className="relative cursor-pointer bg-neutral-950 p-2 sm:p-4 group/poster flex items-center justify-center"
                onClick={() => openLightbox(anniversario40Img, 'Locandina Ufficiale: 40 Anni Insieme - Festeggiamo il nostro Anniversario')}
              >
                <img
                  src={anniversario40Img}
                  alt="Locandina Ufficiale 40 Anni Insieme Old Moon"
                  className="w-full h-auto max-w-md mx-auto rounded-xl shadow-lg group-hover/poster:scale-[1.01] transition-transform duration-300 block"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                  <div className="bg-night/90 px-4 py-2 rounded-full border border-gold/50 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-gold" />
                    <span>Clicca per Ingrandire a Schermo Intero</span>
                  </div>
                </div>
              </div>

              {/* DETTAGLI DELL'OFFERTA DELLA LOCANDINA */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-terracotta uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Giovedì 20 Novembre
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/20 text-neutral-900">
                      Festa di Anniversario
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    40 Anni Insieme a Voi!
                  </h3>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed mb-5">
                    Un grande traguardo per il nostro locale a Monteverde. Festeggiamo insieme una storia iniziata nel 1986 con una serata ricca di cibo, musica e divertimento.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wine className="w-5 h-5 text-terracotta shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">Serata Spritz</h4>
                          <p className="text-xs text-neutral-500 font-light">Aperitivo speciale per tutti</p>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-lg text-terracotta">€ 4,00</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UtensilsCrossed className="w-5 h-5 text-olive shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">Menù del 40° Completo</h4>
                          <p className="text-xs text-neutral-500 font-light">1 Primo + 1 Secondo + 1 Contorno + Bevanda</p>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-lg text-olive">€ 15,00</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center gap-3">
                      <Mic className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">Serata Karaoke dal Vivo</h4>
                        <p className="text-xs text-neutral-500 font-light">Musica, canti e allegria per tutta la serata</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="tel:0658233702"
                    className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-terracotta text-white hover:bg-terracotta-hover shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Prenota: 06 58233702</span>
                  </a>
                  <button
                    onClick={() => openLightbox(anniversario40Img, 'Locandina 40 Anni Insieme')}
                    className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-900 bg-neutral-100"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Apri a Schermo Intero</span>
                  </button>
                </div>
              </div>
            </div>

            {/* LOCANDINA 2: PROMO SPRITZ A € 6,00 */}
            <div className="bg-white rounded-3xl border-2 border-terracotta/40 shadow-soft overflow-hidden flex flex-col hover:border-terracotta transition-colors">
              {/* IMMAGINE DELLA LOCANDINA INTERA (W-FULL H-AUTO, SEMPRE VISIBILE!) */}
              <div
                className="relative cursor-pointer bg-neutral-950 p-2 sm:p-4 group/poster flex items-center justify-center"
                onClick={() => openLightbox(promoSpritzImg, 'Locandina Ufficiale: Promo Spritz a € 6,00 - Tutto Dicembre e Gennaio')}
              >
                <img
                  src={promoSpritzImg}
                  alt="Locandina Ufficiale Promo Spritz Old Moon"
                  className="w-full h-auto max-w-md mx-auto rounded-xl shadow-lg group-hover/poster:scale-[1.01] transition-transform duration-300 block"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                  <div className="bg-night/90 px-4 py-2 rounded-full border border-gold/50 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-gold" />
                    <span>Clicca per Ingrandire a Schermo Intero</span>
                  </div>
                </div>
              </div>

              {/* DETTAGLI DELL'OFFERTA DELLA LOCANDINA */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-terracotta" />
                      Tutto Dicembre e Gennaio
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta/15 text-terracotta">
                      Offerta Invernale
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    Promo Spritz a € 6,00
                  </h3>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed mb-5">
                    L'aperitivo iconico dell'inverno a Monteverde. Aperol, Campari o Select preparati con ghiaccio compatto e fetta d'arancia fresca ad un prezzo imbattibile.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wine className="w-5 h-5 text-terracotta shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">Spritz a Regola d'Arte</h4>
                          <p className="text-xs text-neutral-500 font-light">Disponibile con Aperol, Campari o Select</p>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-lg text-terracotta">€ 6,00</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-olive shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">Aperto 24 Ore su 24 (OPEN 24/7)</h4>
                        <p className="text-xs text-neutral-500 font-light">Valido a qualsiasi ora, giorno e notte, 7 giorni su 7</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">Accompagnamento Gastronomico</h4>
                        <p className="text-xs text-neutral-500 font-light">Tramezzini artigianali romani, sfizi caldi e patatine</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => scrollToSection('posizione')}
                    className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>Raggiungici al Locale</span>
                  </button>
                  <button
                    onClick={() => openLightbox(promoSpritzImg, 'Locandina Promo Spritz')}
                    className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-900 bg-neutral-100"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Apri a Schermo Intero</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. SEZIONE VALORE */}
      <section id="valore" className="value-section py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">I Nostri Punti di Forza</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900 mt-2">
            La Cura nei Dettagli, Quotidiana.
          </h2>
          <p className="text-neutral-600 text-sm md:text-base mt-4 font-light">
            Tre pilastri autentici che definiscono l'identità di Old Moon dal 1986 nel cuore di Monteverde.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blocco 1: Qualità */}
          <div className="value-card bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-soft hover:shadow-elevated transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 stroke-[1.8]" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-terracotta">01. Materie Prime</span>
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1 mb-3">
              Qualità senza Scorciatoie
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              Farine selezionate, lievitazione naturale e frutta fresca di stagione. Ogni giorno prepariamo i nostri cornetti, la pasticceria artigianale e il gelato naturale garantendo sapori genuini e puliti.
            </p>
          </div>

          {/* Blocco 2: Metodo / Orari Continui */}
          <div className="value-card bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-soft hover:shadow-elevated transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-olive/10 text-olive flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 stroke-[1.8]" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-olive">02. Sempre Aperti</span>
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1 mb-4">
              Per Ogni Momento (24/7)
            </h3>
            
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-olive/20">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-olive" />
                <h4 className="text-xs font-bold uppercase text-neutral-900 tracking-wider">Mattina Presto • Colazione</h4>
                <p className="text-xs text-neutral-500 font-light mt-0.5">Lievitati caldi di notte e caffè espresso a regola d'arte.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-olive" />
                <h4 className="text-xs font-bold uppercase text-neutral-900 tracking-wider">Pranzo & Pomeriggio</h4>
                <p className="text-xs text-neutral-500 font-light mt-0.5">Tramezzini farciti espressi, tavola calda ed estratti freschi.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-olive" />
                <h4 className="text-xs font-bold uppercase text-neutral-900 tracking-wider">Aperitivo & Tarda Notte</h4>
                <p className="text-xs text-neutral-500 font-light mt-0.5">Cocktail bar, spritz a prezzo promozionale e sfizi continui.</p>
              </div>
            </div>
          </div>

          {/* Blocco 3: Fiducia */}
          <div className="value-card bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-soft hover:shadow-elevated hover:border-gold/60 transition-all duration-300 group relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7 stroke-[1.8]" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-gold">03. Fiducia di Quartiere</span>
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1 mb-3">
              750+ Recensioni Google (4.1★)
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed font-light mb-4">
              Dal 1986 siamo il punto di riferimento per chi a Monteverde cerca un sorriso cordiale e una qualità costante. Non un bar di passaggio, ma un luogo in cui sentirsi a casa.
            </p>
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
              <span className="text-xs font-bold text-neutral-800 ml-2">4.1 / 5</span>
            </div>
          </div>
        </div>
      </section>

      {/* D. FILOSOFIA — "Identità" */}
      <section id="filosofia" className="philosophy-section py-28 bg-night text-white px-6 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-terracotta/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-xs tracking-widest uppercase text-sand-light font-medium mb-8">
            <HeartHandshake className="w-3.5 h-3.5 text-terracotta" />
            <span>Il Nostro Manifesto</span>
          </div>

          <p className="text-neutral-400 text-lg md:text-2xl font-light tracking-wide mb-6">
            La maggior parte dei bar punta sulla rapidità e sulla quantità.
          </p>

          <h2 className="font-serif italic text-3xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-10">
            <span className="philosophy-word inline-block mr-2">Noi</span>
            <span className="philosophy-word inline-block mr-2">puntiamo</span>
            <span className="philosophy-word inline-block mr-2">su</span>
            <span className="philosophy-word inline-block mr-2 text-terracotta font-semibold">qualità,</span>
            <span className="philosophy-word inline-block mr-2 text-gold font-semibold">relazione</span>
            <span className="philosophy-word inline-block mr-2">e</span>
            <span className="philosophy-word inline-block text-sand-light font-semibold">continuità.</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Dal 1986 abbiamo scelto di non cedere ai preparati industriali. Manteniamo vive le ricette della pasticceria da laboratorio, il rispetto per la clientela e quell'atmosfera calda che rende unico il nostro angolo di Monteverde.
          </p>
        </div>
      </section>

      {/* MENÙ & CREAZIONI ARTIGIANALI */}
      <section id="creazioni" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">Il Nostro Menù</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900 mt-2">
            Le Creazioni di Old Moon
          </h2>
          <p className="text-neutral-600 text-sm md:text-base mt-3 font-light">
            Esplora le nostre specialità: dolci sfornati al mattino, gelati mantecati freschi, caffetteria d'eccellenza, bistrot e drink serali.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-4 mb-12">
          {[
            { id: 'pasticceria', label: 'Pasticceria', icon: CakeSlice },
            { id: 'gelato', label: 'Gelato Artigianale', icon: IceCream },
            { id: 'caffetteria', label: 'Caffetteria & Estratti', icon: Coffee },
            { id: 'bistrot', label: 'Pranzo & Bistrot', icon: UtensilsCrossed },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMenuTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMenuTab(tab.id)}
                className={`btn-micro inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-6 md:p-12 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                {menuCategories[activeMenuTab].title}
              </h3>
              <p className="text-neutral-500 text-sm mt-1 font-light">
                {menuCategories[activeMenuTab].description}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {menuCategories[activeMenuTab].items.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FBF9F5] border border-neutral-200/50 flex flex-col justify-between hover:border-terracotta/40 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm md:text-base">{item.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-semibold">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-600 font-light mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('posizione')}
                className="btn-micro inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta hover:text-terracotta-hover"
              >
                <span>Vieni a provarli al banco</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-5 relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-md cursor-pointer group"
            onClick={() => openLightbox(menuCategories[activeMenuTab].img, menuCategories[activeMenuTab].title)}
          >
            <img
              src={menuCategories[activeMenuTab].img}
              alt={menuCategories[activeMenuTab].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-sand-light font-medium">Laboratorio Old Moon</span>
                <p className="text-sm font-light text-white/90">Scatto reale dal locale</p>
              </div>
              <Maximize2 className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERIA FOTOGRAFICA UFFICIALE: 39 FOTO DI OLD MOON */}
      <section id="galleria" className="py-24 px-6 bg-[#F4ECE4]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-olive/10 text-olive font-semibold text-xs tracking-wider uppercase mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Scorci Autentici</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
              Dentro al Locale Old Moon
            </h2>
            <p className="text-neutral-600 text-sm md:text-base mt-3 font-light">
              Dai vassoi di pasticceria fresca alle nostre storiche lavagne, dai gelati ai banconi accoglienti. Esplora la vita vera del locale.
            </p>
          </div>

          {/* Griglia Fotografica Reale */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo.src, photo.title, index)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-200 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer h-56 md:h-64"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gold">
                    {photo.category}
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs font-medium truncate">{photo.title}</span>
                    <Maximize2 className="w-4 h-4 shrink-0 text-white/90" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pulsante Mostra Tutte le 39 Foto / Riduci */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllPhotos(!showAllPhotos)}
              className="btn-micro inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-neutral-800 hover:bg-neutral-50 border border-neutral-300 shadow-sm"
            >
              <ImageIcon className="w-4 h-4 text-terracotta" />
              <span>
                {showAllPhotos ? 'Mostra Meno Foto' : 'Mostra Tutte le Foto del Locale (39 Foto)'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (Recensioni Reali Verificate) */}
      <section className="py-24 bg-night text-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">Parola ai Clienti</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">
              L'Affetto di Monteverde
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
              <span className="text-sm font-semibold text-white ml-2">4.1 stelle su Google (750+ Recensioni)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-night-surface p-8 rounded-3xl border border-white/10 relative">
              <div className="text-terracotta font-serif text-5xl leading-none absolute top-6 right-6 opacity-40">“</div>
              <div className="flex items-center gap-1 text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-neutral-200 text-sm md:text-base font-light italic leading-relaxed mb-6">
                «Sembra un bar come tanti, ma se lo frequenti diventa un bar come pochi! Attenzione, gentilezza e qualità dei prodotti: pasticceria, aperitivi e gastronomia. Lo consiglio veramente.»
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center font-bold text-sm">
                  FC
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Fabio Ciucci</h4>
                  <p className="text-xs text-neutral-400">Cliente Verificato Google</p>
                </div>
              </div>
            </div>

            <div className="bg-night-surface p-8 rounded-3xl border border-white/10 relative">
              <div className="text-terracotta font-serif text-5xl leading-none absolute top-6 right-6 opacity-40">“</div>
              <div className="flex items-center gap-1 text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-neutral-200 text-sm md:text-base font-light italic leading-relaxed mb-6">
                «Il barista ti fa sentire a casa. Ottima scelta di cornetti e dolci oltre a cioccolata. Puoi fermarti a qualsiasi ora e troverai uno sfizio da gustare. I proprietari gentili e affabili. Si respira l'aria di Monteverde.»
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm">
                  LF
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Laura Forte</h4>
                  <p className="text-xs text-neutral-400">Cliente Verificata Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINALE ("Vivi l'esperienza.") */}
      <section id="cta" className="py-28 px-6 bg-[#FBF9F5] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-6">
            <Moon className="w-8 h-8 fill-terracotta/20 stroke-[1.8]" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight mb-4">
            Vivi l'esperienza.
          </h2>
          
          <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Il profumo dei cornetti caldi, la cremosità del gelato artigianale e l'energia di un aperitivo in compagnia ti aspettano a Roma Monteverde. Aperto 24 ore su 24!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?q=Old+Moon+Circonvallazione+Gianicolense+232+Roma"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase bg-terracotta text-white hover:bg-terracotta-hover shadow-lg shadow-terracotta/20"
            >
              <MapPin className="w-4 h-4" />
              <span>Apri Navigatore su Google Maps</span>
            </a>
            <a
              href="tel:0658233702"
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase bg-white text-neutral-800 hover:bg-neutral-50 border border-neutral-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-terracotta" />
              <span>Chiama Ora: 06 58233702</span>
            </a>
          </div>
        </div>
      </section>

      {/* POSIZIONE & DOVE SIAMO */}
      <section id="posizione" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Informazioni pratiche */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">Vieni a Trovarci</span>
              <h3 className="font-serif text-3xl font-bold text-neutral-900 mt-1 mb-6">
                Nel Cuore di Monteverde
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Indirizzo</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">
                      Circonvallazione Gianicolense, 232<br />00152 Roma (RM) — Zona Monteverde
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Orario Continuato</h4>
                    <p className="text-sm text-neutral-600 font-light mt-0.5">
                      <strong>OPEN 24/7</strong> — Aperto 24 ore su 24<br />
                      <span className="text-xs text-olive font-medium">Tutti i giorni, giorno e notte</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Telefono & Social</h4>
                    <a href="tel:0658233702" className="text-sm text-neutral-800 font-semibold hover:text-terracotta transition-colors block">
                      06 58233702
                    </a>
                    <div className="text-xs text-neutral-500 font-light mt-1 space-x-3">
                      <span>IG: <strong>@OLDMOON1986</strong></span>
                      <span>FB: <strong>OLD MOON BAR</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-100 mt-8">
              <a
                href="https://maps.google.com/?q=Circonvallazione+Gianicolense+232+Roma"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-micro inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-terracotta"
              >
                <span>Ottieni indicazioni stradali</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mappa Interattiva */}
          <div className="lg:col-span-7 bg-neutral-100 min-h-[360px] relative">
            <iframe
              title="Posizione Old Moon Roma"
              src="https://maps.google.com/maps?q=Old%20Moon%20Circonvallazione%20Gianicolense%20232%20Roma&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[360px] border-0 filter saturate-[0.9] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* G. FOOTER */}
      <footer className="bg-night text-neutral-300 pt-16 pb-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Colonna Brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta">
                  <Moon className="w-4 h-4 fill-terracotta/30" />
                </div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">The new Old Moon</span>
              </div>
              <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
                Old Moon di Mannicci Alberto Snc. Caffetteria, pasticceria, gelateria, bistrot e cocktail bar nel quartiere Monteverde dal 1986.
              </p>

              {/* Indicatore Presenza Digitale Attiva */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Locale aperto h24 (OPEN 24/7)</span>
              </div>
            </div>

            {/* Colonna Orari & Servizi */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Servizi & Orari</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Sempre aperti per te:
              </p>
              <p className="text-xs font-semibold text-emerald-300">
                Lunedì – Domenica: OPEN 24/7
              </p>
              <p className="text-[11px] text-neutral-400 font-light pt-1">
                Colazioni calde notturne • Pasticceria fresca • Pranzo veloce • Aperitivi Spritz • Cocktail bar
              </p>
            </div>

            {/* Colonna Contatti */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Sede & Contatti</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Circonvallazione Gianicolense, 232<br />
                00152 Roma (RM) — Monteverde
              </p>
              <p className="text-xs text-white font-medium pt-1">
                Tel: 06 58233702
              </p>
              <p className="text-[11px] text-neutral-400">
                FB: OLD MOON BAR • IG: @OLDMOON1986
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
            <p>© {new Date().getFullYear()} The new Old Moon dal 1986 • P.IVA 03524941006 • Tutti i diritti riservati.</p>
            <p className="text-neutral-400 font-light">40 Anni Insieme a Voi nel Cuore di Monteverde.</p>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL PER FOTO E LOCANDINE */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Tasto Chiudi */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Chiudi visualizzazione"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Frecce di Navigazione */}
          {lightboxIndex !== null && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-50"
                aria-label="Foto precedente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-50"
                aria-label="Foto successiva"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Immagine ingrandita */}
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-3 text-center text-white/90 text-sm font-medium flex items-center gap-3">
              <span>{lightboxImg.title}</span>
              {lightboxIndex !== null && (
                <span className="text-xs text-gold bg-white/10 px-2.5 py-0.5 rounded-full font-semibold">
                  Foto {lightboxIndex + 1} di {allGalleryPhotos.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
