import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Phone, MessageCircle, CheckCircle2, Globe, ShieldCheck, Menu, X,
  User, MapPin, Send, ArrowRight, Star, Users, Award, Zap,
  ChevronRight, ChevronLeft, Heart, FileText, Truck, Verified,
  Search, ClipboardCheck, Languages
} from 'lucide-react';

// ==========================================
// 1. القواميس والترجمات
// ==========================================
const translations = {
  ar: {
    nav: { home: 'الرئيسية', features: 'المميزات', nations: 'الجنسيات', pricing: 'الباقات', order: 'اطلب الآن' },
    hero: [
      {
        title: "راحةُ بالكِ تبدأ هنا.. نعتني ببيتكِ كأنه بيتنا",
        subtitle: "ننتقي لكِ الصفوة لضمان جودة الحياة وراحة عائلتكِ الدائمة، لتستمتعي بلحظاتكِ الثمينة.",
        tag: "نُخبة الاختيار"
      },
      {
        title: "احترافية تتجاوز التوقعات.. كوادرنا واجهة للفخامة",
        subtitle: "كوادر مدربة تضمن لكِ الانضباط والأداء المثالي، نلتزم بأقل مدة وصول في المملكة عبر مساند.",
        tag: "السرعة الذهبية"
      },
      {
        title: "بيتكِ يستحق الأفضل.. جودة تليقُ بمكانتكِ",
        subtitle: "حقوقكِ محفوظة بعقود رسمية تضمن لكِ الأمان والاحترافية الكاملة لرعاية أدق تفاصيل منزلكِ.",
        tag: "ثقة مطلقة"
      }
    ],
    stats: [
      { label: "تدريب مكثف وأداء احترافي", value: "كوادر مؤهلة" },
      { label: "ضمان كامل عبر منصة مساند", value: "عقود رسمية" },
      { label: "دعم مستمر بعد استلام العاملة", value: "متابعة دورية" },
      { label: "التزام بالمواعيد المحددة", value: "سرعة وصول" }
    ],
    steps: {
      title: "رحلتكِ معنا", subtitle: "بثلاث خطوات استثنائية",
      items: [
        { title: "اختيار الكادر", desc: "نستعرض معكِ أفضل السير الذاتية المختارة بعناية لتناسب منزلكِ." },
        { title: "توثيق العقد", desc: "إجراءات قانونية فورية عبر منصة مساند لضمان حقوقكِ وحقوقنا." },
        { title: "الوصول السريع", desc: "متابعة دقيقة حتى وصول العاملة لباب منزلكِ في وقت قياسي." }
      ]
    },
    nations: { tag: "نطاق عملنا العالمي", title: "جنسيات ننتقيها لكِ بعناية", explore: "استكشاف السير الذاتية" },
    pricing: { title: "باقات النُخبة", subtitle: "باقات صُممت لتمنحكِ الراحة والرفاهية المطلقة.", currency: "ريال", popular: "الأكثر طلباً", book: "حجز الطلب الآن" },
    modal: { title: "بدء طلب الاستقدام", package: "نُخبة", name: "الاسم بالكامل", namePlaceholder: "أدخل اسمك", city: "المدينة", cityPlaceholder: "مثلاً: الرياض", confirm: "تأكيد الطلب واتساب" },
    footer: { desc: "نصنعُ الفرق في كل منزل سعودي برؤية ملكية تتجاوز التوقعات عبر نُخبة الكوادر.", rights: "جميع الحقوق محفوظة - نُخبة الكوادر", about: "عن المؤسسة", contact: "اتصلي بنا" }
  },
  en: {
    nav: { home: 'Home', features: 'Features', nations: 'Nationalities', pricing: 'Packages', order: 'Order Now' },
    hero: [
      {
        title: "Your Peace of Mind is Our Priority",
        subtitle: "We select the best to ensure quality of life and permanent comfort for your family.",
        tag: "Elite Selection"
      },
      {
        title: "Professionalism Redefined.. Staff with Pride",
        subtitle: "Uniformed, highly trained staff ensuring record-breaking arrival times via Musaned.",
        tag: "Golden Speed"
      },
      {
        title: "Your Home Deserves the Best Quality",
        subtitle: "Official contracts ensuring safety and full professionalism for your home's details.",
        tag: "Absolute Trust"
      }
    ],
    stats: [
      { label: "Intensive Training & Professionalism", value: "Qualified Staff" },
      { label: "Full Warranty via Musaned", value: "Official Contracts" },
      { label: "Support After Staff Delivery", value: "Regular Follow-up" },
      { label: "Commitment to Scheduled Times", value: "Fast Arrival" }
    ],
    steps: {
      title: "Your Journey", subtitle: "Three Simple Steps",
      items: [
        { title: "Staff Selection", desc: "We review the best selected CVs to suit your home." },
        { title: "Documentation", desc: "Immediate legal procedures via Musaned platform." },
        { title: "Fast Arrival", desc: "Precise follow-up until arrival at your doorstep." }
      ]
    },
    nations: { tag: "Global Reach", title: "Selected Nationalities", explore: "Explore CVs" },
    pricing: { title: "Elite Packages", subtitle: "Packages designed for your absolute comfort and luxury.", currency: "SAR", popular: "Popular", book: "Book Now" },
    modal: { title: "Start Order", package: "Elite", name: "Full Name", namePlaceholder: "Enter name", city: "City", cityPlaceholder: "e.g. Riyadh", confirm: "Confirm WhatsApp" },
    footer: { desc: "Making a difference in Saudi homes with a royal vision.", rights: "All Rights Reserved - Nukhba", about: "About", contact: "Contact" }
  }
};

// ==========================================
// 2. المكونات المساعدة
// ==========================================

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); });
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return [domRef, isVisible];
};

const Navbar = ({ lang, setLang, scrolled, isMenuOpen, setIsMenuOpen, t, onOrderClick }) => (
  <nav className={`fixed w-full z-[200] transition-all duration-700 ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3' : 'bg-transparent py-4 md:py-8'}`}>
    <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center">
      <div className={`flex items-center gap-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all hover:rotate-12 shrink-0">
          <Award className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className={`flex flex-col leading-none ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
          <span className={`text-base md:text-xl font-black tracking-tighter transition-colors duration-500 ${scrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}>
            {lang === 'ar' ? 'نُخبة الكوادر' : 'Nukhba Staffing'}
          </span>
          <span className={`text-[7px] md:text-[9px] text-amber-500 font-black uppercase tracking-[0.1em] mt-1 opacity-95`}>
            Elite Staffing
          </span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-8">
        {['home', 'features', 'nations', 'pricing'].map((key) => (
          <a key={key} href={`#${key === 'home' ? '' : key}`} className={`font-bold text-sm transition-all relative group ${scrolled ? 'text-slate-700 hover:text-amber-600' : 'text-white/90 hover:text-white'}`}>
            {t.nav[key]}
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
          </a>
        ))}
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`flex items-center gap-2 font-bold text-xs px-3 py-1.5 rounded-full border transition-all ${scrolled ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-white/20 text-white hover:bg-white/10'}`}>
          <Globe size={14} />
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>
        <button onClick={onOrderClick} className="bg-amber-600 text-white px-7 py-2.5 rounded-full font-bold text-xs hover:bg-amber-700 shadow-md active:scale-95 transition-all">
          {t.nav.order}
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden flex items-center gap-4">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`p-2 rounded-lg ${scrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}>
          <Languages size={20} />
        </button>
        <button className={`p-2 rounded-lg transition-all ${scrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </div>

    {/* Mobile Drawer */}
    <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-white shadow-xl ${isMenuOpen ? 'max-h-screen opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-6 py-8 flex flex-col gap-6 text-center">
        {['home', 'features', 'nations', 'pricing'].map((key) => (
          <a key={key} href={`#${key === 'home' ? '' : key}`} onClick={() => setIsMenuOpen(false)} className="text-slate-800 font-black text-lg hover:text-amber-600 transition-colors">
            {t.nav[key]}
          </a>
        ))}
        <button onClick={() => { onOrderClick(); setIsMenuOpen(false); }} className="bg-amber-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg">
          {t.nav.order}
        </button>
      </div>
    </div>
  </nav>
);

const App = () => {
  const [lang, setLang] = useState('ar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({ name: '', city: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  const t = translations[lang];
  const phoneNumber = "966532441576";

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nationalities = useMemo(() => [
    { country: lang === 'ar' ? "إثيوبيا" : "Ethiopia", sub: "Ethiopia", img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "أوغندا" : "Uganda", sub: "Uganda", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "كينيا" : "Kenya", sub: "Kenya", img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "بنجلاديش" : "Bangladesh", sub: "Bangladesh", img: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=600&auto=format&fit=crop" },
  ], [lang]);

  const slides = useMemo(() => [
    { ...t.hero[0], image: "https://plus.unsplash.com/premium_photo-1664910556213-4395ebca30c2?q=80&w=1170&auto=format&fit=crop" },
    { ...t.hero[1], image: "https://plus.unsplash.com/premium_photo-1679920025550-75324e59680f?q=80&w=1169&auto=format&fit=crop" },
    { ...t.hero[2], image: "https://plus.unsplash.com/premium_photo-1661663379320-213541539ec8?q=80&w=1170&auto=format&fit=crop" }
  ], [t]);

  const packages = useMemo(() => [
    { title: lang === 'ar' ? "باقة 3 أشهر" : "3 Months", price: "5,100", features: lang === 'ar' ? ["إمكانية الاستبدال", "دعم فني 24/7", "أفضل الكوادر المختارة"] : ["Replacement Option", "24/7 Support", "Elite Staff"] },
    { title: lang === 'ar' ? "باقة 6 أشهر" : "6 Months", price: "9,900", features: lang === 'ar' ? ["سعر موفر جداً", "أولوية في الاختيار", "تغطية شاملة للمناطق"] : ["Great Savings", "Priority Selection", "Full Coverage"], popular: true },
    { title: lang === 'ar' ? "باقة 12 شهر" : "12 Months", price: "19,200", features: lang === 'ar' ? ["القيمة الأفضل سنوياً", "عقد رسمي معتمد", "متابعة دورية مستمرة"] : ["Best Annual Value", "Certified Contract", "Regular Follow-up"] },
  ], [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const slideInterval = setInterval(nextSlide, 8000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideInterval);
    };
  }, [slides.length]);

  const handleOrderClick = (pkg) => {
    setSelectedPackage(pkg || packages[1]);
    setShowModal(true);
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const msg = `*Order from ${lang === 'ar' ? 'نُخبة الكوادر' : 'Nukhba Staffing'}*%0A%0A*Name:* ${formData.name}%0A*City:* ${formData.city}%0A*Package:* ${selectedPackage?.title}`;
    window.location.href = `https://wa.me/${phoneNumber}?text=${msg}`;
    setShowModal(false);
  };

  const [statsRef, statsVisible] = useReveal();
  const [stepsRef, stepsVisible] = useReveal();
  const [nationsRef, nationsVisible] = useReveal();
  const [pricingRef, pricingVisible] = useReveal();

  return (
    <div className={`min-h-screen bg-[#FDFBF7] font-sans selection:bg-amber-200 overflow-x-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <Navbar lang={lang} setLang={setLang} scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} t={t} onOrderClick={() => handleOrderClick()} />

      {/* Hero Section - تم تعديل الارتفاع للهواتف */}
      <section className="relative h-[85vh] md:h-screen min-h-[500px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
            </div>
            {/* تم زيادة البادينج الجانبي لعدم تداخل النص مع الأسهم */}
            <div className="relative h-full max-w-7xl mx-auto px-12 md:px-24 flex flex-col items-center justify-center pt-20 z-20 text-center">
              <div className="max-w-4xl space-y-4 md:space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600 text-white font-bold text-[9px] md:text-xs uppercase tracking-widest shadow-2xl mx-auto" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease' : '' }}>
                  <Award className="w-3 h-3 md:w-4 md:h-4" /> {slide.tag}
                </div>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.2s backwards' : '' }}>
                  {slide.title}
                </h1>
                <p className="text-sm md:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl mx-auto" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.4s backwards' : '' }}>
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.6s backwards' : '' }}>
                  <button onClick={() => handleOrderClick()} className="bg-amber-600 text-white px-8 py-3.5 md:py-5 rounded-full font-black text-base md:text-xl hover:bg-amber-700 shadow-xl transition-all">
                    {lang === 'ar' ? 'احجزي الآن' : 'Book Now'}
                  </button>
                  <a href={`tel:${phoneNumber}`} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 md:py-5 rounded-full font-black text-base md:text-xl flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 md:w-6 md:h-6" /> {lang === 'ar' ? 'إتصال سريع' : 'Quick Call'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* أسهم السلايدر - تم تعديل مكانها لتكون بعيدة عن النص في الشاشات الصغيرة */}
        <button onClick={prevSlide} className={`absolute ${lang === 'ar' ? 'right-2 md:right-10' : 'left-2 md:left-10'} top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-amber-600 text-white transition-all backdrop-blur-sm`}>
          {lang === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <button onClick={nextSlide} className={`absolute ${lang === 'ar' ? 'left-2 md:left-10' : 'right-2 md:right-10'} top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-amber-600 text-white transition-all backdrop-blur-sm`}>
          {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </section>

      {/* بقية السكاشن كما هي بدون تعديل في التصميم */}
      <section ref={statsRef} id="features" className={`py-16 md:py-24 bg-white px-6 reveal ${statsVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {t.stats.map((stat, i) => (
              <div key={i} className="space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                  {[<Users />, <Verified />, <Globe />, <Zap />][i]}
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg md:text-2xl font-black text-slate-900">{stat.value}</h4>
                  <p className="text-slate-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section ref={stepsRef} className="py-20 md:py-32 bg-[#FDFBF7] px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-12 md:mb-16 reveal ${stepsVisible ? 'visible' : ''}`}>
            <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.4em]">{t.steps.title}</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">{t.steps.subtitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[Search, ClipboardCheck, Truck].map((Icon, i) => (
              <div key={i} className={`relative p-8 md:p-14 rounded-[3rem] bg-white reveal ${stepsVisible ? 'visible' : ''} border border-slate-100 shadow-sm transition-all hover:shadow-xl`}>
                <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-all">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2">{t.steps.items[i].title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.steps.items[i].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nations */}
      <section ref={nationsRef} id="nations" className="py-20 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 reveal ${nationsVisible ? 'visible' : ''}`}>
            <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.5em] block mb-2">{t.nations.tag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t.nations.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalities.map((item, i) => (
              <div key={i} className={`group relative h-[350px] md:h-[420px] rounded-[2rem] overflow-hidden reveal ${nationsVisible ? 'visible' : ''} shadow-lg`}>
                <img src={item.img} alt={item.country} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-80 group-hover:opacity-90 transition-all"></div>
                <div className="absolute bottom-6 left-6 right-6 z-20">
                   <span className="text-amber-400 font-black text-[9px] uppercase tracking-[0.3em] block mb-1">{item.sub}</span>
                   <span className="text-white text-2xl font-black">{item.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingRef} id="pricing" className="py-20 md:py-32 bg-[#FDFBF7] px-6">
        <div className={`max-w-7xl mx-auto text-center mb-16 reveal ${pricingVisible ? 'visible' : ''}`}>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">{t.pricing.title}</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">{t.pricing.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <div key={i} className={`p-8 md:p-12 rounded-[2.5rem] reveal ${pricingVisible ? 'visible' : ''} ${pkg.popular ? 'bg-slate-900 text-white scale-100 lg:scale-105 shadow-2xl' : 'bg-white border border-slate-100'}`}>
              <h3 className={`text-xl font-black mb-4 ${pkg.popular ? 'text-amber-400' : 'text-amber-600'}`}>{pkg.title}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl md:text-5xl font-black">{pkg.price}</span>
                <span className="text-sm font-bold opacity-60">{t.pricing.currency}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${pkg.popular ? 'text-amber-500' : 'text-amber-600'}`} /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleOrderClick(pkg)} className={`w-full py-4 rounded-full font-black text-lg transition-all ${pkg.popular ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-slate-900 text-white hover:bg-amber-600'}`}>
                {t.pricing.book}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-100 text-center px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">{lang === 'ar' ? 'نُخبة الكوادر' : 'Nukhba Staffing'}</span>
          </div>
          <p className="text-slate-400 font-bold text-sm md:text-lg max-w-2xl mx-auto">{t.footer.desc}</p>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} {t.footer.rights}</p>
            <div className="flex gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="hover:text-amber-600 transition-colors">{t.footer.about}</a>
              <a href="#" className="hover:text-amber-600 transition-colors">{t.footer.contact}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 relative max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className={`absolute top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} text-slate-400 hover:text-slate-900 transition-all`}><X size={24} /></button>
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-black text-slate-900">{t.modal.title}</h3>
              <form onSubmit={sendToWhatsApp} className="space-y-4">
                <input required type="text" placeholder={t.modal.namePlaceholder} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-amber-600 outline-none font-bold" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input required type="text" placeholder={t.modal.cityPlaceholder} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-amber-600 outline-none font-bold" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-full font-black text-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-4">{t.modal.confirm} <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} /></button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;