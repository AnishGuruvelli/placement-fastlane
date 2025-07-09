import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  DoughnutController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import profileImg from '../../public/anishguruvelli.jpg';
import content from '../content.json';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  DoughnutController,
  BarController
);

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeJourney, setActiveJourney] = useState('health');
  const [countersAnimated, setCountersAnimated] = useState(false);
  const routeRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleNavClick1 = (e) => {
    e.preventDefault();
    routeRefs.current['overview']?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    // Animate counters on scroll
    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0');
      el.innerText = '0';
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        el.innerText = current + '%';
        if (current == target) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          const counters = document.querySelectorAll('.stat-counter');
          counters.forEach(counter => animateCounter(counter as HTMLElement));
          setCountersAnimated(true);
        }
      });
    }, { threshold: 0.5 });

    const opportunitySection = document.getElementById('opportunity');
    if (opportunitySection) {
      observer.observe(opportunitySection);
    }

    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const linkElement = link as HTMLElement;
            const href = linkElement.getAttribute('href');
            if (href === `#${id}`) {
              linkElement.classList.add('active');
            } else {
              linkElement.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [countersAnimated]);

  const handleJourneyTab = (journeyId: string) => {
    setActiveJourney(journeyId);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.slice(1);
      routeRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const clientPreferences = content.clientPreferences;
  const demandChartData = {
    labels: clientPreferences.labels,
    datasets: [{
      label: 'Client Preferences',
      data: clientPreferences.values,
      backgroundColor: clientPreferences.colors,
      borderColor: ['#FFFFFF'],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };
  const demandChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    animation: {
      animateRotate: true,
      duration: 1200
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#4B5563',
          font: { size: 15 },
          usePointStyle: true,
          padding: 24
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const value = context.raw;
            const percent = ((value / total) * 100).toFixed(0);
            return `${context.label}: ${percent}%`;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#111827',
        font: { weight: 'bold', size: 18 },
        formatter: (value: number, ctx: any) => {
          const total = ctx.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          return `${Math.round((value / total) * 100)}%`;
        }
      }
    }
  };

  const riceChartData = {
    labels: ['🪙 Grind to Shine', '🔥 Daily Spark', '🧭 Readiness Score + AutoApply', '👥 Squad Goals', '🧠 AI-Powered Mock Interview'],
    datasets: [
      {
        label: 'RICE Score',
        data: [90, 70, 80, 60, 45],
        backgroundColor: ['#4C1D95', '#A78BFA', '#7C3AED', '#C4B5FD', '#EDE9FE'],
        borderRadius: 4,
      }
    ]
  };

  const riceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `RICE Score: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#4B5563'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: { color: '#4B5563', font: { size: 12 } },
        grid: {
          display: false
        }
      }
    }
  };

  // Color map for Tailwind classes
  const colorMap = {
    green: {
      border: "border-green-400",
      text: "text-green-700",
      bg: "bg-green-50",
      textBg: "text-green-800",
      italic: "text-green-600"
    },
    blue: {
      border: "border-blue-400",
      text: "text-blue-700",
      bg: "bg-blue-50",
      textBg: "text-blue-800",
      italic: "text-blue-600"
    },
    pink: {
      border: "border-pink-400",
      text: "text-pink-700",
      bg: "bg-pink-50",
      textBg: "text-pink-800",
      italic: "text-pink-600"
    },
    yellow: {
      border: "border-yellow-400",
      text: "text-yellow-700",
      bg: "bg-yellow-50",
      textBg: "text-yellow-800",
      italic: "text-yellow-600"
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-inter">
      <style dangerouslySetInnerHTML={{
        __html: `
          .chart-container { 
            position: relative; 
            width: 100%; 
            max-width: 400px; 
            margin-left: auto; 
            margin-right: auto; 
            height: 300px; 
            max-height: 400px; 
          }
          @media (min-width: 640px) { 
            .chart-container { height: 350px; } 
          }
          .rice-chart-container { 
            position: relative; 
            width: 100%; 
            height: 400px; 
            max-height: 500px; 
          }
          .nav-link {
            position: relative;
            transition: color 0.3s;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: #a78bfa;
            border-radius: 2px;
            transform: scaleX(0);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            z-index: 1;
          }
          .nav-link:hover::after, .nav-link.active::after {
            transform: scaleX(1);
          }
          .phase-card::before { 
            content: ''; 
            position: absolute; 
            top: 50%; 
            left: -2.05rem; 
            transform: translateY(-50%); 
            width: 1.25rem; 
            height: 1.25rem; 
            background-color: #F3F4F6; 
            border: 4px solid #4B5563; 
            border-radius: 9999px; 
            z-index: 10; 
          }
          .timeline::before { 
            content: ''; 
            position: absolute; 
            top: 0; 
            bottom: 0; 
            left: 1rem; 
            transform: translateX(-50%); 
            width: 4px; 
            background-color: #E5E7EB; 
            border-radius: 2px; 
          }
        `
      }} />

      <header id="top" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-slate-900">{content.siteTitle}</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick1}>Overview</div>
                <a href="#problem" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
                <a href="#solution" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Solution</a>
                <a href="#prioritization" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Prioritization</a>
                <a href="#roadmap" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Roadmap</a>
                <a href="#success-metrics" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Success Metrics</a>
                <a href="#next-steps" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Next Steps</a>
                <a href="#about-me" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>About Me</a>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <div className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#overview" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Overview</a>
            <a href="#problem" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
            <a href="#solution" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Solution</a>
            <a href="#prioritization" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Prioritization</a>
            <a href="#roadmap" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Roadmap</a>
            <a href="#success-metrics" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Success Metrics</a>
            <a href="#next-steps" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Next Steps</a>
            <a href="#about-me" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>About Me</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            {(() => {
              const headline = content.hero.headline;
              return <span>{headline}</span>;
            })()}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
            {content.hero.subheadline}
          </p>
        </section>

        {/* PM Section */}
        <section className="py-12 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl shadow-lg mb-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">{content.pmSection.title}</h2>
            <p className="text-lg md:text-xl text-slate-700 mb-6">
              {content.pmSection.body}
            </p>
            <a href="#problem" className="inline-block mt-2 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition" onClick={handleNavClick}>{content.pmSection.cta}</a>
          </div>
        </section>

        {/* What is Jar */}
        <section id="overview" ref={el => (routeRefs.current['overview'] = el)} className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">{content.about.sectionTitle}</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">{content.about.title}</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{content.about.aboutTitle}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {content.about.aboutBody}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>{content.about.goal.split('?')[0]}?</strong> {content.about.goal.replace('The goal? ', '')}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{content.about.industryTitle}</h3>
                <ul className="space-y-3 text-slate-600">
                  {content.about.industryBullets.map((bullet, index) => (
                    <li key={index}>• {bullet}</li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">
                    {content.about.mission}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Needs */}
        <section className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">2️⃣ & 3️⃣ Customer Identification & Goals</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Understanding Our Users</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 md:mb-0 w-full md:w-3/5">
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2 sm:mb-4">User Segments</h3>
              <ul className="ml-4 list-disc text-slate-700 mb-6">
                {content.userSegments.map((segment, index) => (
                  <li key={index}>{segment}</li>
                ))}
              </ul>
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2">User Goals</h3>
              <ul className="ml-4 list-disc text-slate-700 mb-6">
                {content.userGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2">Our Business Focus</h3>
              <ul className="ml-4 list-disc text-slate-700">
                {content.businessFocus.map((focus, index) => (
                  <li key={index}>{focus}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 sm:p-6 rounded-lg flex flex-col items-center justify-center w-full md:w-2/5">
              <h3 className="text-center text-lg sm:text-xl font-semibold text-slate-800 mb-2">Client Preferences</h3>
              <p className="text-center text-slate-500 mb-4 text-base">{content.clientPreferences.description}</p>
              <div className="w-full max-w-xs sm:max-w-md md:max-w-full chart-container">
                <Chart type="doughnut" data={demandChartData} options={demandChartOptions} />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Framing */}
        <section id="problem" ref={el => (routeRefs.current['problem'] = el)} className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase mb-2">4️⃣ Cut (Prioritize) – Problem Framing</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">Top Pain Points</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.topPainPoints.map((point, index) => {
                const colorOrder = ['green', 'blue', 'pink', 'yellow'];
                const color = colorOrder[index % colorOrder.length];
                const c = colorMap[color];
                return (
                  <div
                    key={index}
                    className={`bg-white shadow-lg rounded-2xl p-6 border-l-4 ${c.border}`}
                  >
                    <h3 className={`text-lg font-bold ${c.text} mb-2 flex items-center`}><span className="text-2xl mr-2">{point.emoji}</span>{point.title}</h3>
                    <p className="text-slate-700 mb-2"><span className="font-semibold">Problem:</span> {point.problem}</p>
                    <p className={`italic ${c.italic}`}>Friction: {point.friction}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" ref={el => (routeRefs.current['solution'] = el)} className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">5️⃣ Proposed Solutions</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">How {content.hero.headline} Solves These Pain Points</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.proposedSolutions.map((solution, index) => {
              const colorOrder = ['green', 'blue', 'pink', 'yellow'];
              const color = colorOrder[index % colorOrder.length];
              const c = colorMap[color];
              return (
                <div
                  key={index}
                  className={`bg-white shadow-lg rounded-2xl p-6 border-l-4 ${c.border}`}
                >
                  <h3 className={`text-lg font-bold ${c.text} mb-2 flex items-center`}><span className="text-2xl mr-2">{solution.emoji}</span>{solution.title}</h3>
                  <div className={`mb-2`}><span className={`font-semibold ${c.text}`}>Solution:</span> {solution.solution}</div>
                  <div className="mb-2"><span className="font-semibold">What It Does:</span> {solution.whatItDoes}</div>
                  <div className="mb-2"><span className="font-semibold">Why It Helps:</span> {solution.whyItHelps}</div>
                  <div className={`${c.bg} rounded p-3 mt-2 ${c.textBg} text-sm italic`}>{solution.example}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RICE Prioritization */}
        <section id="prioritization" ref={el => (routeRefs.current['prioritization'] = el)} className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">6️⃣ Evaluate Trade-offs (RICE Framework)</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Feature Prioritization</p>
            </div>
            <div className="mt-12">
              <div className="rice-chart-container mb-8">
                <Chart type="bar" data={riceChartData} options={riceChartOptions} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {content.featurePrioritization.map((feature, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">{feature.title}</h4>
                    <p className="text-purple-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" ref={el => (routeRefs.current['roadmap'] = el)} className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">{content.finalRecommendation.title}</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">{content.finalRecommendation.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-12 timeline">
              <div className="mb-10 relative">
                <div className="phase-card bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400">
                  <p className="text-sm font-semibold text-green-600">🔹 Phase 1: Quick Wins (3–6 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-800">Core Foundation & Engagement Loops</h4>
                  <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                    {content.finalRecommendation.quickWins.map((win, index) => (
                      <li key={index}>• {win}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="phase-card bg-yellow-50 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
                  <p className="text-sm font-semibold text-yellow-600">🔹 Phase 2: Long-term (6–18 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-800">AI-Driven Personalization & Placement Acceleration</h4>
                  <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                    {content.finalRecommendation.longTermBets.map((bet, index) => (
                      <li key={index}>• {bet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section id="success-metrics" ref={el => (routeRefs.current['success-metrics'] = el)} className="py-16 bg-white rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">8️⃣ SUCCESS METRICS</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Measuring Our Success</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {content.successMetrics.map((metric, index) => (
                <div key={index} className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{metric.title}</h3>
                  <ul className="text-purple-700 space-y-2 text-sm">
                    {metric.metrics.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next-steps" ref={el => (routeRefs.current['next-steps'] = el)} className="py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase mb-2">9️⃣ NEXT STEPS</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-10">If I Were the PM</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left w-full">
              {content.nextSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-start border-2 border-purple-100 text-left w-full">
                  <span className="text-4xl mb-4">{step.icon}</span>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">{step.title}</h3>
                  <p className="text-slate-700 text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="about-me" ref={el => (routeRefs.current['about-me'] = el)} className="py-24 bg-white rounded-2xl shadow-lg">
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-10 md:mb-0">
              <img src={profileImg} alt="Anish Guruvelli Professional" className="w-56 h-56 rounded-full object-cover shadow-lg border-8 border-purple-100" />
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">About Me</h2>
              <p className="text-lg text-slate-700 mb-3">Currently APM @ Moveinsync</p>
              <p className="text-slate-700 mb-8 text-base md:text-lg">
                {content.aboutMeDescription}
              </p>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Key Skills Highlight</h3>
              <ul className="space-y-6 mb-8 text-slate-800 text-base md:text-lg">
                {content.keySkills.map((skill, index) => (
                  <li key={index}><span className="font-bold">{skill.title}</span><br />{skill.description}</li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition text-lg">🔗 Connect on LinkedIn</a>
                <a href={content.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow hover:bg-slate-900 transition text-lg">📄 View My Resume</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
