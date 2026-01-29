import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Phone, MessageCircle, CheckCircle2, Globe, ShieldCheck, Menu, X,
  User, MapPin, Send, ArrowRight, Star, Users, Award, Zap,
  ChevronRight, ChevronLeft, Heart, FileText, Truck, Verified,
  Search, ClipboardCheck, Languages
} from 'lucide-react';

// ==========================================
// 1. القواميس والترجمات (تم تحديث نصوص الهيرو لتكون أكثر جاذبية وقوة)
// ==========================================
const translations = {
  ar: {
    nav: { home: 'الرئيسية', features: 'المميزات', nations: 'الجنسيات', pricing: 'الباقات', order: 'اطلب الآن' },
    hero: [
      {
        title: "راحةُ بالكِ تبدأ هنا.. نعتني ببيتكِ كأنه بيتنا",
        subtitle: "ننتقي لكِ الصفوة لضمان جودة الحياة وراحة عائلتكِ الدائمة، لتستمتعي بلحظاتكِ الثمينة بينما تتولى نُخبة كوادرنا مهام منزلكِ باحترافية ملكية.",
        tag: "نُخبة الاختيار"
      },
      {
        title: "احترافية تتجاوز التوقعات.. كوادرنا واجهة للفخامة",
        subtitle: "كوادر مدربة بزي رسمي تضمن لكِ الانضباط والأداء المثالي، نلتزم بأقل مدة وصول في المملكة عبر إجراءات رسمية موثقة من مساند.",
        tag: "السرعة الذهبية"
      },
      {
        title: "بيتكِ يستحق الأفضل.. جودة تليقُ بمكانتكِ",
        subtitle: "حقوقكِ محفوظة بعقود رسمية تضمن لكِ الأمان والاحترافية الكاملة، ننتقي لكِ نُخبة من العاملات ذوات الكفاءة العالية لرعاية أدق تفاصيل منزلكِ.",
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
        subtitle: "We select the best to ensure quality of life and permanent comfort for your family, letting you enjoy precious moments with royal care.",
        tag: "Elite Selection"
      },
      {
        title: "Professionalism Redefined.. Staff with Pride",
        subtitle: "Uniformed, highly trained staff ensuring discipline and record-breaking arrival times in the Kingdom via Musaned.",
        tag: "Golden Speed"
      },
      {
        title: "Your Home Deserves the Best Quality",
        subtitle: "Official contracts ensuring safety and full professionalism, selecting only high-efficiency staff to care for your home's details.",
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
// 2. المكونات المساعدة (Hooks & Components)
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
  <nav className={`fixed w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3' : 'bg-transparent py-4 md:py-8'}`}>
    <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center">
      <div className={`flex items-center gap-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all hover:rotate-12 shrink-0">
          <Award className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className={`flex flex-col leading-none ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
          <span className={`text-base md:text-xl font-black tracking-tighter transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            {lang === 'ar' ? 'نُخبة الكوادر' : 'Nukhba Staffing'}
          </span>
          <span className={`text-[7px] md:text-[9px] text-amber-500 font-black uppercase tracking-[0.1em] mt-1 opacity-95`}>
            Elite Staffing
          </span>
        </div>
      </div>

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

      <div className="lg:hidden flex items-center gap-4">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          <Languages size={20} />
        </button>
        <button className={`p-2 rounded-lg transition-all ${scrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
  const nationalities = useMemo(() => [
    { country: lang === 'ar' ? "إثيوبيا" : "Ethiopia", sub: "Ethiopia", img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "أوغندا" : "Uganda", sub: "Uganda", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "كينيا" : "Kenya", sub: "Kenya", img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=600&auto=format&fit=crop" },
    { country: lang === 'ar' ? "بنجلاديش" : "Bangladesh", sub: "Bangladesh", img: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=600&auto=format&fit=crop" },
  ], [lang]);

  const slides = useMemo(() => [
    { ...t.hero[0], image: "https://plus.unsplash.com/premium_photo-1664910556213-4395ebca30c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { ...t.hero[1], image: "https://plus.unsplash.com/premium_photo-1679920025550-75324e59680f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { ...t.hero[2], image: "https://plus.unsplash.com/premium_photo-1661663379320-213541539ec8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ], [t]);
  const packages = useMemo(() => [
    { title: lang === 'ar' ? "باقة 3 أشهر" : "3 Months", price: "5,100", features: lang === 'ar' ? ["إمكانية الاستبدال", "دعم فني 24/7", "أفضل الكوادر المختارة"] : ["Replacement Option", "24/7 Support", "Elite Staff"] },
    { title: lang === 'ar' ? "باقة 6 أشهر" : "6 Months", price: "9,900", features: lang === 'ar' ? ["سعر موفر جداً", "أولوية في الاختيار", "تغطية شاملة للمناطق"] : ["Great Savings", "Priority Selection", "Full Coverage"], popular: true },
    { title: lang === 'ar' ? "باقة 12 شهر" : "12 Months", price: "19,200", features: lang === 'ar' ? ["القيمة الأفضل سنوياً", "عقد رسمي معتمد", "متابعة دورية مستمرة"] : ["Best Annual Value", "Certified Contract", "Regular Follow-up"] },
  ], [lang]);

  useEffect(() => {
    document.title = lang === 'ar' ? "نُخبة الكوادر | الفخامة في الاستقدام" : "Nukhba Staffing | Luxury Recruitment";
    const svgIcon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='7'></circle><polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'></polyline></svg>`;
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = svgIcon;
  }, [lang]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

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
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>

      <Navbar lang={lang} setLang={setLang} scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} t={t} onOrderClick={() => handleOrderClick()} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[650px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="absolute inset-0">
              <img src={slide.image} alt="" className="w-full h-full object-cover" style={{ transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)', transition: 'transform 10s linear' }} />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/95"></div>
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center pt-24 pb-12 z-20 text-center">
              <div className="max-w-4xl space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-600/90 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-2xl mx-auto backdrop-blur-md" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease' : '' }}>
                  <Award className="w-4 h-4" /> {slide.tag}
                </div>
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl px-4 ${lang === 'en' ? 'lg:text-[3.8rem]' : ''}`} style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.2s backwards' : '' }}>
                  {slide.title}
                </h1>
                <p className="text-base md:text-xl lg:text-2xl text-white/95 font-medium max-w-3xl mx-auto leading-relaxed px-4 opacity-90" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.4s backwards' : '' }}>
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-5 md:gap-8 justify-center pt-8" style={{ animation: index === currentSlide ? 'fadeInUp 0.8s ease 0.6s backwards' : '' }}>
                  <button onClick={() => handleOrderClick()} className="bg-amber-600 text-white px-10 py-4.5 md:py-5 rounded-full font-black text-lg md:text-xl hover:bg-amber-700 shadow-xl transition-all transform hover:scale-105 active:scale-95">
                    {lang === 'ar' ? 'احجزي نُخبتكِ الآن' : 'Book Now'}
                  </button>
                  <a href={`tel:${phoneNumber}`} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-4.5 md:py-5 rounded-full font-black text-lg md:text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" /> {lang === 'ar' ? 'إتصال سريع' : 'Quick Call'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className={`absolute ${lang === 'ar' ? 'right-6 md:right-10' : 'left-6 md:left-10'} top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-white/10 bg-black/10 hover:bg-amber-600 text-white transition-all backdrop-blur-md hover:scale-110 active:scale-90 pointer-events-auto`}>
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <button onClick={nextSlide} className={`absolute ${lang === 'ar' ? 'left-6 md:left-10' : 'right-6 md:right-10'} top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-white/10 bg-black/10 hover:bg-amber-600 text-white transition-all backdrop-blur-md hover:scale-110 active:scale-90 pointer-events-auto`}>
          {lang === 'ar' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} id="features" className={`py-16 md:py-24 bg-white z-30 px-6 reveal ${statsVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {t.stats.map((stat, i) => {
              const icons = [<Users />, <Verified />, <Globe />, <Zap />];
              const colors = ["bg-amber-50 text-amber-600", "bg-blue-50 text-blue-600", "bg-sky-50 text-sky-600", "bg-rose-50 text-rose-500"];
              return (
                <div key={i} className={`space-y-4 group flex flex-col items-center`}>
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${colors[i]} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-sm animate-float transition-all duration-700 group-hover:scale-110 group-hover:rotate-12`}>
                    {React.cloneElement(icons[i], { className: "w-6 h-6 md:w-8 md:h-8" })}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter tabular-nums group-hover:text-amber-600 transition-colors duration-500">
                      {stat.value}
                    </h4>

                    <p className="text-slate-400 font-bold text-[7px] md:text-[8px] uppercase tracking-widest leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps Section - وضوح الأرقام */}
      <section ref={stepsRef} className="py-24 md:py-32 bg-[#FDFBF7] relative z-30 overflow-hidden px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-16 space-y-2 reveal ${stepsVisible ? 'visible' : ''}`}>
            <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.4em]">{t.steps.title}</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">{t.steps.subtitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[Search, ClipboardCheck, Truck].map((Icon, i) => (
              <div key={i} className={`relative flex flex-col items-center p-10 md:p-14 rounded-[3.5rem] bg-white transition-all duration-700 reveal delay-${i + 1} ${stepsVisible ? 'visible' : ''} border border-transparent hover:border-amber-100 group shadow-sm hover:shadow-2xl animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                <div className={`absolute top-6 ${lang === 'ar' ? 'right-8' : 'left-8'} text-slate-200/90 font-black text-7xl md:text-8xl transition-colors group-hover:text-amber-200/50 -z-0 opacity-100`}>0{i + 1}</div>
                <div className="w-14 h-14 md:w-18 md:h-18 bg-slate-900 text-amber-500 rounded-[1.5rem] flex items-center justify-center shadow-2xl mb-8 transform transition-all group-hover:rotate-12 group-hover:bg-amber-600 group-hover:text-white z-10">
                  <Icon size={28} />
                </div>
                <div className="space-y-2 z-10 text-center">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{t.steps.items[i].title}</h3>
                  <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-xs mx-auto">{t.steps.items[i].desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nationalities Section */}
      <section ref={nationsRef} id="nations" className="py-24 md:py-32 bg-white relative z-30 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`space-y-4 mb-20 text-center reveal ${nationsVisible ? 'visible' : ''}`}>
            <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.5em] block mb-2">{t.nations.tag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">{t.nations.title}</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full mt-6 shadow-sm"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nationalities.map((item, i) => (
              <div key={i} className={`nation-card group relative h-[380px] md:h-[420px] rounded-[2rem] overflow-hidden reveal delay-${i + 1} ${nationsVisible ? 'visible' : ''} transition-all duration-1000 shadow-lg cursor-pointer bg-slate-100`}>
                <img src={item.img} alt={item.country} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-700 z-10"></div>
                <div className="absolute bottom-8 right-6 left-6 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl transform transition-all duration-700 translate-y-4 group-hover:translate-y-0 group-hover:bg-amber-600/20 group-hover:border-amber-400/30">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="text-amber-400 font-black text-[9px] uppercase tracking-[0.3em] mb-1 opacity-90">{item.sub}</span>
                      <span className="text-white text-2xl md:text-3xl font-black tracking-tighter drop-shadow-2xl">{item.country}</span>
                      <div className="flex items-center gap-2 mt-3 text-white/60 text-[10px] font-bold transform opacity-0 group-hover:opacity-100 transition-all justify-center">
                        <span>{t.nations.explore}</span>
                        <ArrowRight size={12} className={lang === 'ar' ? 'rotate-180' : ''} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-24 md:py-32 bg-[#FDFBF7] relative z-40 px-6">
        <div className={`max-w-7xl mx-auto px-6 text-center space-y-3 mb-16 reveal ${pricingVisible ? 'visible' : ''}`}>
          {/* تصغير عنوان القسم */}
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{t.pricing.title}</h2>
          <p className="text-slate-500 text-xs md:text-base font-medium max-w-3xl mx-auto leading-relaxed text-center">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <div key={i} className={`group relative flex flex-col p-10 md:p-12 rounded-[3rem] transition-all duration-700 reveal delay-${i + 1} ${pricingVisible ? 'visible' : ''} ${pkg.popular ? 'bg-slate-900 text-white scale-100 lg:scale-105 shadow-2xl' : 'bg-white text-slate-900 border border-slate-100 shadow-sm hover:shadow-xl'}`}>

              {/* كلمة "الأكثر طلباً" */}
              {pkg.popular && <div className={`absolute top-0 ${lang === 'ar' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 bg-amber-600 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl animate-pulse`}>{t.pricing.popular}</div>}

              {/* اسم الباقة */}
              <h3 className={`text-xl md:text-2xl font-black mb-6 ${pkg.popular ? 'text-amber-400' : 'text-amber-600'}`}>{pkg.title}</h3>

              {/* السعر */}
              <div className="flex items-baseline gap-2 mb-8 text-right">
                <span className="text-3xl md:text-5xl font-black tracking-tighter tabular-nums">{pkg.price}</span>
                <span className={`text-sm md:text-lg font-bold ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>{t.pricing.currency}</span>
              </div>

              <div className={`h-px w-full mb-8 ${pkg.popular ? 'bg-white/10' : 'bg-amber-100'}`}></div>

              {/* قائمة المميزات */}
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-bold text-sm md:text-base transition-transform group-hover:translate-x-[-5px]">
                    <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ${pkg.popular ? 'text-amber-500' : 'text-amber-600'}`} /> {f}
                  </li>
                ))}
              </ul>

              {/* زر الحجز */}
              <button onClick={() => handleOrderClick(pkg)} className={`w-full py-4 md:py-5 px-8 rounded-full font-black text-lg md:text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-xl ${pkg.popular ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-slate-900 text-white hover:bg-amber-600'}`}>
                {t.pricing.book}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-slate-100 relative z-40 text-center px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-amber-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl">
              <Award className="text-white w-8 h-8 fill-white" />
            </div>
            <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic">{lang === 'ar' ? 'نُخبة الكوادر' : 'Nukhba Staffing'}</span>
          </div>
          <p className="text-slate-400 font-bold text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed text-center">{t.footer.desc}</p>
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            <p className="text-slate-300 text-[9px] md:text-xs font-black uppercase tracking-[0.5em]">© {new Date().getFullYear()} {t.footer.rights}</p>
            <div className="flex gap-10 text-slate-400 text-[10px] md:text-sm font-black uppercase tracking-widest">
              <a href="#" className="hover:text-amber-600 transition-colors">{t.footer.about}</a>
              <a href="#" className="hover:text-amber-600 transition-colors">{t.footer.contact}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-slate-900/98 backdrop-blur-xl animate-in fade-in duration-500 text-right">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-y-auto max-h-[90vh] animate-in zoom-in duration-500">
            <button onClick={() => setShowModal(false)} className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} text-slate-400 hover:text-slate-900 p-2 hover:rotate-90 transition-all`}><X size={28} /></button>
            <div className="space-y-10">
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{t.modal.title}</h3>
                <p className="text-slate-500 text-lg font-bold italic">{t.modal.package}: <span className="text-amber-600">{selectedPackage?.title}</span></p>
              </div>
              <form onSubmit={sendToWhatsApp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{t.modal.name}</label>
                  <div className="relative">
                    <User className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6`} />
                    <input required type="text" placeholder={t.modal.namePlaceholder} className={`w-full bg-[#FDFBF7] border-2 border-transparent rounded-2xl py-5 md:py-6 ${lang === 'ar' ? 'pr-14' : 'pl-14'} focus:border-amber-600 focus:bg-white outline-none font-bold text-lg md:text-xl transition-all`} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{t.modal.city}</label>
                  <div className="relative">
                    <MapPin className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6`} />
                    <input required type="text" placeholder={t.modal.cityPlaceholder} className={`w-full bg-[#FDFBF7] border-2 border-transparent rounded-2xl py-5 md:py-6 ${lang === 'ar' ? 'pr-14' : 'pl-14'} focus:border-amber-600 focus:bg-white outline-none font-bold text-lg md:text-xl transition-all`} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-6 md:py-8 rounded-full font-black text-xl md:text-2xl hover:bg-amber-600 shadow-2xl transition-all flex items-center justify-center gap-4 md:gap-6 mt-8 transform hover:-translate-y-2 active:scale-95">{t.modal.confirm} <Send className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} /></button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;