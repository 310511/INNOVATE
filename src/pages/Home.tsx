import { MessageCircle, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/logo.jpeg";
import video from "../assets/video.mp4";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import  Ananya from "../assets/AnanyaGupta.png";
import  Priya from "../assets/PriyaMehta.png";
import  Rajeev from "../assets/RajeevKhanna.png";
import  Vikram from "../assets/VikramDesai.png";
import  vineet from "../assets/VineetSharma.png";


type FAQItem = {
  question: string;
  answer: string;
};


const faqData: FAQItem[] = [
  {
    question: "How accurate is the AI score?",
    answer: "Our scoring model is trained on 10,000+ pitch decks reviewed by top VCs and accelerators (YC, Techstars, etc.). It achieves 92% alignment with human expert ratings on structure, clarity, and investor-readiness."
  },
  {
    question: "Can I use voice or video?",
    answer: "Currently, we support text-based pitches (written decks). Voice/video pitch analysis is in beta — sign up for early access on our roadmap page!"
  },
  {
    question: "Is my data private?",
    answer: "Yes. All your pitch content is end-to-end encrypted and never used to train public models. We comply with GDPR and SOC 2. You own your data — and can delete it anytime."
  },
  {
    question: "Why is data privacy important?",
    answer: "Early-stage ideas are sensitive. We believe founders should share only what they choose — with whom they choose. Your pitch remains confidential unless you explicitly export or share it."
  },
  {
    question: "Who is this for?",
    answer: "Founders (pre-seed to Series A), startup accelerators, university entrepreneurship programs, and pitch coaches who want objective, scalable feedback."
  },
];


const Home = () => {
const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      <div className="flex flex-col">
        {/* Left Dark Section */}
        <div className="w-full min-h-screen bg-[#0b1020] px-0 py-12 mt-10 pb-0">
          {/* Hero Section */}
          <div className="w-full bg-[#0b1020] py-16 px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16">
              {/* LEFT SECTION */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={logo}
                    alt="InnovatePitch Brand"
                    className="h-24 md:h-28"
                  />
                  <div>
                    <h2 className="text-white text-4xl md:text-5xl font-semibold">
                      InnovatePitch
                    </h2>
                    <p className="text-base md:text-lg text-gray-400">
                      Simulate. Score. Succeed.
                    </p>
                  </div>
                </div>

                <h1 className="text-white text-2xl md:text-3xl leading-tight mb-8">
                  Practice your investor pitch with AI <br />
                  avatars that think like VC
                </h1>

                <div className="flex gap-5 mt-8">
                  {/* Primary */}
                  <NavLink
                    to="/login"
                    className="
        px-8 py-4 rounded-xl text-white text-lg font-medium
        bg-gradient-to-r from-cyan-400 to-purple-500
        shadow-lg
        transition-all duration-500 ease-in-out
        hover:from-purple-500 hover:to-cyan-400
        hover:scale-[1.05]
        hover:shadow-purple-500/40
      "
                  >
                    Try InnovatePitch
                  </NavLink>

                  {/* Secondary */}
                  <button
                    className="
        px-8 py-4 rounded-xl text-white text-lg font-medium
        bg-gradient-to-r from-purple-500 to-cyan-400
        shadow-lg
        transition-all duration-500 ease-in-out
        hover:from-cyan-400 hover:to-purple-500
        hover:scale-[1.05]
        hover:shadow-cyan-400/40
      "
                  >
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* RIGHT SECTION - AI CHAT UI */}
              <div className="relative flex items-center justify-center w-[380px] h-[400px]">
                {/* ✅ Background video behind hero */}
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="
    absolute
    top-[169px] left-[105px]
    -translate-x-1/2 -translate-y-1/2
    w-[900px] h-auto
    scale-150
    object-contain
    opacity-80
    pointer-events-none
    z-0
  "
                />
              </div>
            </div>
          </div>
          <div className="bg-[#2c303c] px-0 py-12">
            {/* Features Section */}
            <div className="mb-20 px-12">
              <h2 className="text-white text-3xl mb-8">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Card 1 */}
                <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-cyan-500/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-cyan-500/20">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">
                      AI Investor Simulation
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed mt-4">
                    Practice with conversational AI investors that behave across
                    verticals & locations.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-cyan-500/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-cyan-500/20">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-cyan-400 rounded"></div>
                    </div>
                    <h3 className="text-white text-xl font-semibold">
                      AI Investor Maraubot
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed mt-4">
                    Get instant & powerful data-modeled review of your recent
                    recorded interview.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-purple-400/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-purple-400/20">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-purple-400 rounded"></div>
                    </div>
                    <h3 className="text-white text-xl font-semibold">
                      Pitch Deck Analyzer
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed mt-4">
                    Get detailed AI-powered analysis of improvement points
                    across each slide.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Investor Panel */}
            <div className="mb-20 px-12">
              <h2 className="text-white text-3xl mb-8">
                Meet your AI Judge
              </h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {[
                  {
                    name: "ANANYA GUPTA",
                    subtitle: "Analyst",
                    desc: "Financial metrics",
                    number: "1",
                    color: "bg-gradient-to-b from-cyan-400 to-blue-500",


                    image: Ananya,
                  },
                  {
                    name: "RAJEEV KHANNA",
                    subtitle: "Visionary",
                    desc: "Tech & innovation",
                    number: "2",
                    color: "bg-gradient-to-b from-green-400 to-green-600",
                    image : Rajeev,
                  },
                  {
                    name: "PRIYA MEHTA",
                    subtitle: "Empath",
                    desc: "Founder clarity & storytelling",
                    number: "3",
                    color: "bg-gradient-to-b from-orange-400 to-orange-600",
                    image : Priya,
                  },
                  {
                    name: "VIKRAM DESAI",
                    subtitle: "Globalist",
                    desc: "scalability &  expansion",
                    number: "4",
                    color: "bg-gradient-to-b from-purple-400 to-purple-600",
                    image : Vikram,
                  },
                  {
                    name: "VINEET SHARMA",
                    subtitle: " Strategist",
                    desc: "Market & defensibility",
                    number: "5",
                    color: "bg-gradient-to-b from-blue-400 to-purple-600",
                    image: vineet,
                  },
                ].map((investor, i) => (
                  <div
                    key={i}
                    
                    className="bg-[#0B1020] rounded-xl p-6 text-center border border-gray-800 relative w-64"
                  >
                    <div className="absolute top-4 right-4 text-white text-xl opacity-50">
                      {investor.number}
                    </div>
                    <div className="mb-4">
                      <div
                        className={`w-20 h-20 mx-auto rounded-full ${investor.color} flex items-center justify-center`}
                      >
                        <img
  src={investor.image}
  alt={investor.name}
  className="w-16 h-16 rounded-full object-cover"
/>
                      </div>
                    </div>
                    <h3 className="text-white mb-1">{investor.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">
                      {investor.subtitle}
                    </p>
                    <p className="text-gray-500 text-xs">{investor.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring System */}
            <div className="mb-20 px-12">
              <h2 className="text-white text-3xl mb-8">Pricing</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#0B1020] rounded-xl p-8 border border-gray-800">
                  <h3 className="text-white text-xl mb-2">Starter</h3>
                  <div className="text-white text-3xl mb-1">
                    $29
 <span className="text-sm text-gray-400">/month</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-2 mb-8 mt-6">
                    <li>• 1 Pitch Deck Review</li>
                    <li>• Basic Storyboard</li>
                    <li>• Email Support</li>
                    <li>• Community Access</li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-lg hover:opacity-90 text-sm">
                    Get Started
                  </button>
                </div>

                <div className="bg-[#0B1020] rounded-xl p-8 border border-gray-800">
                  <h3 className="text-white text-xl mb-2">Pro</h3>
                  <div className="text-white text-3xl mb-1">
                   $99
<span className="text-sm text-gray-400">/mo</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-2 mb-8 mt-6">
                    <li>• 3 Pitch Deck Reviews</li>
                    <li>• Advanced Storyboard + Script</li>
                    <li>• 1:1 Strategy Call (30 min)</li>
                    <li>• Investor Q&A Prep</li>
                    <li>• Priority Support</li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:opacity-90 text-sm">
                    Go Pro
                  </button>
                </div>

                <div className="bg-[#0B1020] rounded-xl p-8 border border-gray-800">
                  <h3 className="text-white text-xl mb-2">Enterprise</h3>
                  <div className="text-white text-3xl mb-1">Custom</div>
                  <ul className="text-gray-400 text-sm space-y-2 mb-8 mt-6">
                    <li>• Unlimited Reviews</li>
                    <li>• Full Pitch Suite (Deck, Video, Script)</li>
                    <li>• Dedicated Account Manager</li>
                    <li>• Custom Workshops & Training</li>
                    <li>• SLA & API Access</li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-lg hover:opacity-90 text-sm">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
          </div>
        </div>
        {/* Right Light Section */}
        <div className="w-full bg-gray-50 px-8 py-12 mt-20">
          {/* Trust Section */}
          <div className="mb-20 text-center md:text-left">
            {/* Heading */}
            <p className="text-gray-900 mb-10 leading-snug font-bold text-3xl md:text-4xl">
              Trusted by accelerators, universities, and{" "}
              <br className="hidden md:block" />
              venture networks.
            </p>

            {/* Logo Row */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mb-10">
              {/* T-Hub */}
              <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
                <span className="w-6 h-6 bg-orange-500 rounded-full inline-block"></span>
                T-Hub
              </div>

              {/* NASSCOM */}
              <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
                <span className="w-5 h-5 bg-blue-600 rounded-full inline-block"></span>
                NASSCOM
              </div>

              {/* AngelNet */}
              <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
                <span className="w-5 h-5 bg-red-500 rounded-full inline-block"></span>
                AngelNet
              </div>

              {/* E-Cell */}
              <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
                <span className="w-5 h-5 bg-gray-700 rounded-full inline-block"></span>
                E-Cell
              </div>

              {/* Empty box */}
              <div className="w-12 h-12 border-2 border-gray-300 rounded-xl shadow-sm hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]"></div>
            </div>

            {/* Bottom text */}
            <div className="flex flex-wrap justify-center md:justify-start gap-12 text-base md:text-lg">
              <div>
                <div className="text-gray-700 font-semibold">
                  White-label available
                </div>
                <div className="text-gray-500 text-sm">for institutions</div>
              </div>
              <div>
                <div className="text-gray-800 font-semibold">
                  92% founder satisfaction
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20 max-w-2xl">
            {/* Heading */}
            <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
              Why InnovatePitch
            </h2>

            {/* Accent line */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full"></div>

            {/* Description */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
              At{" "}
              <span className="font-semibold text-gray-900">InnovatePitch</span>
              , we believe every great startup deserves an intelligent investor
              — one that listens, learns, and guides before capital even
              arrives.
              <br />
              <br />
              We’re not replacing investors; we’re upgrading how innovation is
              discovered, structured, and scaled.
            </p>
          </div>

          {/* How it Works */}
          <div className="mb-16">
            <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold mb-4">
              How it Works
            </h2>
            <div className="w-10 h-1 bg-gray-900 mb-4 rounded"></div>

            <div className="flex justify-center mb-6">
              <ArrowDown className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-16">
              {/* Left Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-sm md:text-base w-full md:w-1/2 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-gray-900 font-semibold mb-4 text-lg">
                  1. Tell us AI-based report
                </div>

                <div className="space-y-2 text-gray-600 font-medium">
                  <div className="flex justify-between">
                    <span>Subject</span>
                    <span>Explanation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Presentation</span>
                    <span>Section</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Introduction</span>
                    <span>1 Time</span>
                  </div>
                  <div className="text-gray-500">Discussion point</div>
                </div>
              </div>

              {/* Right Card */}
              <div className="bg-[#0B1020] rounded-2xl p-6 text-white w-full md:w-1/2 shadow-md hover:shadow-cyan-500/20 transition-all duration-300">
                <div className="text-sm font-medium text-gray-400 mb-2">
                  Sample Score
                </div>
                <div className="text-4xl font-bold mb-2 text-cyan-400">
                  77/100
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Your pitch received valuable AI insights on clarity
                  <br />
                  and delivery to keep investors engaged.
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <ArrowDown className="w-6 h-6 text-gray-400" />
            </div>

            <p className="text-gray-800 mb-6 text-lg text-center font-semibold">
              A clear standardized way to judge readiness
            </p>

            <div className="flex justify-center gap-4 mb-8">
              {[
                {
                  ring: "border-cyan-400",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="8" width="18" height="8" rx="2" />
                      <circle cx="8" cy="12" r="1.5" fill="#fff" />
                      <circle cx="16" cy="12" r="1.5" fill="#fff" />
                    </svg>
                  ),
                  color: "text-cyan-400",
                },
                {
                  ring: "border-green-400",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 7h13l3 4v6H3V7zm13.5 0V4h2.5v3h-2.5z" />
                    </svg>
                  ),
                  color: "text-green-400",
                },
                {
                  ring: "border-orange-400",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="12" cy="12" r="3" fill="#fff" />
                    </svg>
                  ),
                  color: "text-orange-400",
                },
                {
                  ring: "border-purple-400",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 2h4v4h4v4h-4v4h-4v-4H6V6h4V2z" />
                    </svg>
                  ),
                  color: "text-purple-400",
                },
                {
                  ring: "border-cyan-300",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 2h2v20h-2V2zm-9 9h20v2H2v-2z" />
                    </svg>
                  ),
                  color: "text-cyan-300",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`w-14 h-14 rounded-full border-4 flex items-center justify-center ${item.ring}`}
                >
                  <div
                    className={`flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          {/* <div className="mb-24 max-w-2xl">
          
            <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
              FAQ
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8 rounded-full"></div>


            <div className="space-y-4">
              {[
                "How accurate is the AI score?",
                "Can I use voice or video?",
                "Is my data private?",
                "Why is data privacy important?",
                "Who is this for?",
              ].map((q, i) => (
                <div
                  key={i}
                  className={`
          rounded-xl p-5 text-gray-800 text-base md:text-lg font-medium
          bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md
          transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02]
          ${i % 2 === 1 ? "md:ml-6" : ""}
        `}
                >
                  {q}
                </div>
              ))}
            </div>
          </div> */}
           <div className="mb-24 max-w-2xl">
      {/* Heading */}
      <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
        FAQ
      </h2>
      <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8 rounded-full"></div>

      {/* Questions */}
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div
            key={i}
            className={`
              rounded-xl overflow-hidden
              border border-gray-200 bg-gray-100
              shadow-sm hover:shadow-md
              transition-all duration-300
              hover:border-cyan-400
              ${i % 2 === 1 ? "md:ml-6" : ""}
            `}
          >
            {/* Question Header (Clickable) */}
            <button
              className="w-full flex items-center justify-between p-5 text-left text-gray-800 text-base md:text-lg font-medium"
              onClick={() => toggleQuestion(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{item.question}</span>
              <span className="flex-shrink-0 ml-3">
                {openIndex === i ? (
                  <ChevronUp className="text-cyan-600" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </span>
            </button>

            {/* Answer (Animated Collapse) */}
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === i
                  ? 'opacity-100 max-h-96 py-4 px-5'
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              <div className="text-gray-600 font-normal leading-relaxed border-t border-gray-200 pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

          {/* Newsletter */}
          <div className="mb-20 max-w-xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-2">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-6">
              Get the latest updates, product news, and AI pitch insights
              straight to your inbox.
            </p>

            {/* Input + Button */}
            <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-5 py-4 text-base focus:outline-none text-gray-800 placeholder-gray-500"
              />

              <button
                className="px-8 py-4 text-base text-white font-semibold
      bg-gradient-to-r from-cyan-500 to-purple-500
      transition-all duration-300 hover:from-purple-500 hover:to-cyan-500
      hover:scale-[1.03] whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
