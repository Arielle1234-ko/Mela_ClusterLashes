import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from './servicesData.js';
import emailjs from '@emailjs/browser';
import { ServiceCard } from './components/ServiceCard.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { GalleryItem } from './components/GalleryItem.jsx';
import { TestimonialCard } from './components/TestimonialCard.jsx';

const products = [
  {
    badge: 'Meilleur Produit',
    badgeColor: 'bg-burgundy',
    title: 'Outil Complet',
    description: "Outil complet pour une extension de cils parfaite.",
    price: '15000F CFA',
    rating: 5,
    delay: '0s',
    image: '/assets/photo3.jpg',
  },
  {
    badge: null,
    badgeColor: '',
    title: 'Huile de Soin',
    description: 'Huile nourrissante pour les cils.',
    price: '20000F CFA',
    rating: 4,
    delay: '0.1s',
    image: '/assets/photo4.jpg',
  },
  {
    badge: 'NOUVEAU',
    badgeColor: 'bg-rose-gold',
    title: 'Kit Soins de visage',
    description: 'Tout le nécessaire pour un soin de visage parfaite.',
    price: '10000F CFA',
    rating: 5,
    delay: '0.2s',
    image: '/assets/photo5.jpg',
  },
];

const galleryItems = [
  {
    title: 'Effet Classic',
    subtitle: 'Classique & Raffinée',
    delay: '0s',
    image: '/assets/photo6.jpg',
  },
  {
    title: 'Effet Volume',
    subtitle: 'Minimaliste Chic',
    delay: '0.1s',
    image: '/assets/photo7.jpg',
  },
  {
    title: 'Effet Hybrid',
    subtitle: 'Dégradé Parfait',
    delay: '0.2s',
    image: '/assets/photo8.jpg',
  },
  {
    title: 'Effet Animé',
    subtitle: 'Moderne & Audacieux',
    delay: '0.3s',
    image: '/assets/photo9.jpg',
  },
  {
    title: 'Effet Wetset',
    subtitle: 'Délicat & Fleuri',
    delay: '0.4s',
    image: '/assets/photo10.jpg',
  },
  {
    title: 'Effet Wispy',
    subtitle: 'Intense & Glamour',
    delay: '0.5s',
    image: '/assets/photo11.jpg',
  },
];

const testimonials = [
  {
    text:
      "Un salon d'exception ! L'ambiance est cosy, l'équipe est adorable et le résultat est toujours parfait. Mes cils n'ont jamais été aussi beaux.",
    name: 'Client 1',
    role: 'Cliente fidèle',
    delay: '0s',
    image: '/assets/photo12.jpg',
  },
  {
    text:
      "Le meilleur nail art d'Abidjan J'ai cherché longtemps une experte capable de réaliser des designs complexes. Mela Clusterlashes est tout simplement incroyable.",
    name: 'Client 2',
    role: 'Influenceuse Beauté',
    delay: '0.1s',
    image: '/assets/photo12.jpg',
  },
  {
    text:
      "Produits d'exception, hygiène irréprochable et une attention aux détails remarquable. Je recommande à 200% pour toutes les occasions !",
    name: 'Client 3',
    role: 'cliente fidèle',
    delay: '0.2s',
    image: '/assets/photo12.jpg',
  },
];

export default function App({ section }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    service: 'Extensions de Cils',
    message: '',
  });

  const navbarClassName = useMemo(() => {
    const base = 'fixed w-full z-50 transition-all duration-300 px-6 lg:px-12';
    if (scrolled) {
      return `${base} bg-white/95 backdrop-blur-md shadow-lg py-2`;
    }
    return `${base} py-4`;
  }, [scrolled]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!section) return;
    const sectionToId = {
      home: 'accueil',
      services: 'services',
      produits: 'produits',
      galerie: 'galerie',
      contact: 'contact',
    };
    const targetId = sectionToId[section];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  useEffect(() => {
    const lucide = window?.lucide;
    if (lucide?.createIcons) lucide.createIcons();
  }, [mobileOpen, scrolled]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev?.[field] ? { ...prev, [field]: undefined } : prev));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const validateForm = (values) => {
    const nextErrors = {};
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const email = values.email.trim();
    const tel = values.tel.trim();

    if (!firstName) nextErrors.firstName = 'Veuillez renseigner votre prénom.';
    if (!lastName) nextErrors.lastName = 'Veuillez renseigner votre nom.';

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email) nextErrors.email = 'Veuillez renseigner votre email.';
    else if (!emailOk) nextErrors.email = 'Veuillez saisir un email valide.';

    if (tel) {
      const digits = (tel.match(/\d/g) || []).length;
      const telOk = digits >= 6 && /^[+\d\s().-]+$/.test(tel);
      if (!telOk) nextErrors.tel = 'Veuillez saisir un numéro valide (ex: +225 01 23 45 67 89).';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitStatus('submitting');
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EMAILJS_CONFIG_MISSING');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          tel: form.tel.trim(),
          service: form.service,
          message: form.message.trim(),
        },
        { publicKey },
      );

      setSubmitStatus('success');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        service: 'Extensions de Cils',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <nav id="navbar" className={navbarClassName}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-gold to-burgundy flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
              MC
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-2xl font-bold text-burgundy leading-none">Mela Clusterlashes</h1>
              <p className="text-xs text-rose-gold tracking-widest uppercase">Art & Beauté</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-burgundy transition-colors">
              Accueil
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-burgundy transition-colors">
              Services
            </Link>
            <Link to="/produits" className="text-sm font-medium hover:text-burgundy transition-colors">
              Produits
            </Link>
            <Link to="/galerie" className="text-sm font-medium hover:text-burgundy transition-colors">
              Galerie
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2 bg-burgundy text-white rounded-full text-sm font-medium hover:bg-rose-gold transition-all hover:shadow-lg transform hover:scale-105"
            >
              Réserver
            </Link>
          </div>

          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 text-burgundy"
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i data-lucide="menu" className="w-6 h-6"></i>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={[
            'md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-rose-pale',
            mobileOpen ? '' : 'hidden',
          ].join(' ')}
        >
          <div className="flex flex-col p-6 gap-4">
            <Link to="/" className="text-lg font-medium text-charbon hover:text-burgundy" onClick={() => setMobileOpen(false)}>
              Accueil
            </Link>
            <Link
              to="/services"
              className="text-lg font-medium text-charbon hover:text-burgundy"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/produits"
              className="text-lg font-medium text-charbon hover:text-burgundy"
              onClick={() => setMobileOpen(false)}
            >
              Produits
            </Link>
            <Link
              to="/galerie"
              className="text-lg font-medium text-charbon hover:text-burgundy"
              onClick={() => setMobileOpen(false)}
            >
              Galerie
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-burgundy text-white rounded-full text-center font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Réserver Maintenant
            </Link>
          </div>
        </div>
      </nav>

      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-pale via-white to-nude opacity-90"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/assets/photo_background.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-rose-gold/20 blur-3xl"></div>
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-burgundy/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <div className="text-center lg:text-left fade-in">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/80 border border-rose-gold/30 text-burgundy text-sm font-medium tracking-wider">
              Salon de Cils Haut de Gamme
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-burgundy">Mela Clusterlashes</span>
              <span className="block text-3xl lg:text-5xl mt-2 font-light italic text-rose-gold">
                L&apos;Élégance de votre visage
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Un salon dédié à votre beauté et votre bien-être.
            Des prestations professionnelles pour un résultat impeccable et durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="px-8 py-4 bg-burgundy text-white rounded-full font-medium hover:bg-rose-gold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Prendre Rendez-vous</span>
                <i data-lucide="arrow-right" className="w-4 h-4"></i>
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white text-burgundy border-2 border-burgundy rounded-full font-medium hover:bg-burgundy hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Nos Services</span>
                <i data-lucide="sparkles" className="w-4 h-4"></i>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <i data-lucide="phone" className="w-5 h-5 text-burgundy"></i>
                <span>+225 0505466378 / +225 0595718904</span>
              </div>
              <div className="flex items-center gap-2">
                <i data-lucide="map-pin" className="w-5 h-5 text-burgundy"></i>
                <span>Niangon Nord Sainte Rita</span>
              </div>
            </div>
          </div>

          <div className="relative fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl nail-shine">
              <img
                src="/assets/photo_hero.jpg"
                alt="Cils Art Élégant"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 glass-effect rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center text-white">
                    <i data-lucide="crown" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <p className="font-serif font-bold text-burgundy">ClusterLashes Premium</p>
                    <p className="text-xs text-gray-600">+2 ans d&apos;expérience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-rose-gold rounded-3xl"></div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
          <i data-lucide="chevron-down" className="w-8 h-8 text-burgundy"></i>
        </div>
      </section>

      <section id="services" className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <span className="text-rose-gold font-medium tracking-widest uppercase text-sm">Nos Expertises</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-burgundy mt-3 mb-4">Services & Soins</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des prestations sur-mesure pour chaque style et chaque occasion, réalisées avec les meilleurs produits du marché.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section id="produits" className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-rose-pale/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6 fade-in">
            <div className="lg:max-w-2xl">
              <span className="text-rose-gold font-medium tracking-widest uppercase text-sm">Boutique</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-burgundy mt-3 mb-4">Nos Produits Star</h2>
              <p className="text-gray-600">
                Découvrez notre sélection rigoureuse de produits professionnels pour entretenir votre beauté entre deux rendez-vous.
              </p>
            </div>
            <a
              href="#"
              className="px-6 py-3 border-2 border-burgundy text-burgundy rounded-full font-medium hover:bg-burgundy hover:text-white transition-all flex items-center gap-2"
            >
              <span>Voir Tout</span>
              <i data-lucide="shopping-bag" className="w-4 h-4"></i>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="galerie" className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <span className="text-rose-gold font-medium tracking-widest uppercase text-sm">Inspiration</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-burgundy mt-3 mb-4">Nos Créations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque nail art est une œuvre d&apos;art unique. Voici quelques unes de nos réalisations.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, index) => (
              <GalleryItem key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.tiktok.com/@triphene.pamela0"
              className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy text-white rounded-full font-medium hover:bg-rose-gold transition-all shadow-lg hover:shadow-xl"
            >
              <i data-lucide="tiktok" className="w-5 h-5"></i>
              <span>Suivez-nous sur Tiktok</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-rose-pale/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent"></div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <span className="text-rose-gold font-medium tracking-widest uppercase text-sm">Témoignages</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-burgundy mt-3">Elles Nous Font Confiance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <span className="text-rose-gold font-medium tracking-widest uppercase text-sm">Réservation</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-burgundy mt-3 mb-6">Réservez Votre Moment</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Prenez rendez-vous en ligne en quelques clics ou contactez-nous directement. Nous vous accueillons du mardi au samedi
                dans notre salon cosy du 8ème arrondissement.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-pale flex items-center justify-center text-burgundy flex-shrink-0">
                    <i data-lucide="map-pin" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy mb-1">Adresse</h4>
                    <p className="text-gray-600">Yopougon Niangon, Abidjan Côte d&apos;Ivoire</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-pale flex items-center justify-center text-burgundy flex-shrink-0">
                    <i data-lucide="phone" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy mb-1">Téléphone</h4>
                    <p className="text-gray-600">+225 0505466378 / +225 0595718904</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-pale flex items-center justify-center text-burgundy flex-shrink-0">
                    <i data-lucide="clock" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy mb-1">Horaires</h4>
                    <p className="text-gray-600">Lundi - Samedi : 10h00 - 19h30</p>
                    <p className="text-gray-600">Dimanche : Fermé</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center hover:bg-rose-gold transition-colors"
                >
                  <i data-lucide="instagram" className="w-5 h-5"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center hover:bg-rose-gold transition-colors"
                >
                  <i data-lucide="facebook" className="w-5 h-5"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center hover:bg-rose-gold transition-colors"
                >
                  <i data-lucide="mail" className="w-5 h-5"></i>
                </a>
              </div>
            </div>

            <div className="bg-rose-pale/20 p-8 lg:p-12 rounded-3xl fade-in" style={{ animationDelay: '0.2s' }}>
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="firstName">
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                      placeholder="Votre prénom"
                      value={form.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      autoComplete="given-name"
                      aria-invalid={Boolean(errors.firstName)}
                    />
                    {errors.firstName && <p className="text-xs text-burgundy mt-2">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="lastName">
                      Nom
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                      placeholder="Votre nom"
                      value={form.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      autoComplete="family-name"
                      aria-invalid={Boolean(errors.lastName)}
                    />
                    {errors.lastName && <p className="text-xs text-burgundy mt-2">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="text-xs text-burgundy mt-2">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="tel">
                    Téléphone
                  </label>
                  <input
                    id="tel"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                    placeholder="06 12 34 56 78"
                    value={form.tel}
                    onChange={(e) => setField('tel', e.target.value)}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.tel)}
                  />
                  {errors.tel && <p className="text-xs text-burgundy mt-2">{errors.tel}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="service">
                    Service Souhaité
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                    value={form.service}
                    onChange={(e) => setField('service', e.target.value)}
                  >
                    <option>Extensions de Cils</option>
                    <option>Soins de visage</option>
                    <option>Poses ongles Permanentes</option>
                    <option>T Shirt Personnalisés</option>
                    <option>Autre (précisez ci-dessous)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-burgundy mb-2" htmlFor="message">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-rose-gold/30 focus:border-burgundy focus:outline-none bg-white"
                    placeholder="Décrivez votre demande ou les préférences pour votre nail art..."
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className={[
                    'w-full py-4 bg-burgundy text-white rounded-xl font-medium hover:bg-rose-gold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1',
                    submitStatus === 'submitting' ? 'opacity-80 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {submitStatus === 'submitting' ? 'Envoi en cours…' : 'Confirmer la Demande'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-sm text-center text-burgundy">
                    Merci ! Votre demande a bien été envoyée. Nous vous recontactons sous 24h.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-center text-burgundy">
                    Une erreur est survenue. Veuillez réessayer dans quelques instants.
                  </p>
                )}

                <p className="text-xs text-center text-gray-500">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-charbon text-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-burgundy flex items-center justify-center text-white font-serif font-bold">
                  MC
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold">Mela Clusterlashes</h3>
                  <p className="text-rose-gold text-sm">L&apos;Élégance de vos cils</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Salon de Cils haut de gamme situé au cœur de Yopougon Niangon, Abidjan Côte d&apos;Ivoire. Nous sublimons vos cils avec passion, créativité et des produits d&apos;exception.
              </p>
              <div className="flex gap-4">
                <a href="https://www.tiktok.com/@triphene.pamela0" className="text-gray-400 hover:text-rose-gold transition-colors">
                  <i data-lucide="instagram" className="w-5 h-5"></i>
                </a>
                <a href="https://www.tiktok.com/@triphene.pamela0" className="text-gray-400 hover:text-rose-gold transition-colors">
                  <i data-lucide="facebook" className="w-5 h-5"></i>
                </a>
                <a href="https://www.tiktok.com/@triphene.pamela0" className="text-gray-400 hover:text-rose-gold transition-colors">
                  <i data-lucide="twitter" className="w-5 h-5"></i>
                </a>
                <a href="https://www.tiktok.com/@triphene.pamela0" className="text-gray-400 hover:text-rose-gold transition-colors">
                  <i data-lucide="youtube" className="w-5 h-5"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-rose-gold">Liens Rapides</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Nos Services
                  </Link>
                </li>
                <li>
                  <Link to="/produits" className="hover:text-white transition-colors">
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link to="/galerie" className="hover:text-white transition-colors">
                    Galerie
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-rose-gold">Légal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions Légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    CGV
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">© 2025 Mela Clusterlashes (MC). Tous droits réservés.</p>
              <p className="text-gray-500 text-sm">Fait par <a href="https://www.linkedin.com/in/arielle-kouassi-6a517934a/" className="text-rose-gold hover:text-white transition-colors">Arielle Kouassi</a> pour le site web de Mela Clusterlashes</p>
          </div>
        </div>
      </footer>
    </>
  );
}

