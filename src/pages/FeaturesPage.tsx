// // FeaturesPage.tsx
// import { CheckCircle, Zap, Target, Users, Lightbulb, Shield } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const features = [
//   {
//     icon: <Zap className="text-blue-500" size={28} />,
//     title: 'Instant Pitch Feedback',
//     description: 'Get real-time scoring and insights on clarity, structure, and storytelling.',
//   },
//   {
//     icon: <Target className="text-green-500" size={28} />,
//     title: 'Investor-Ready Scoring',
//     description: 'AI-powered scoring aligned with what top VCs look for in early-stage startups.',
//   },
//   {
//     icon: <Users className="text-purple-500" size={28} />,
//     title: 'Collaborative Editing',
//     description: 'Invite co-founders or advisors to co-edit and refine your pitch together.',
//   },
//   {
//     icon: <Lightbulb className="text-yellow-500" size={28} />,
//     title: 'Smart Suggestions',
//     description: 'AI recommends improvements on narrative flow, jargon, and key startup metrics.',
//   },
//   {
//     icon: <Shield className="text-indigo-500" size={28} />,
//     title: 'Secure & Private',
//     description: 'Your pitch decks and data are end-to-end encrypted — never shared or sold.',
//   },
//   {
//     icon: <CheckCircle className="text-emerald-500" size={28} />,
//     title: 'Pitch Certification',
//     description: 'Earn a verified “Pitch-Ready” badge to stand out when applying to accelerators.',
//   },
// ];

// const Features = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Everything you need to <span className="text-blue-600">perfect your pitch</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
//             From first draft to investor-ready, our AI-powered platform guides you every step of the way — with actionable feedback, real-world benchmarks, and pitch certification.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               to="/pricing"
//               className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/solution"
//               className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
//             >
//               Explore Solutions
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Feature Grid */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Powerful Features, Built for Founders
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Designed by startup veterans and trained on 10,000+ successful pitch decks.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-gray-50 hover:bg-white border border-gray-200 hover:shadow-lg rounded-xl p-6 transition-all duration-300"
//               >
//                 <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 md:py-24 bg-gray-900 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to build a winning pitch?
//           </h2>
//           <p className="text-lg text-gray-300 mb-8">
//             Join 5,000+ founders who’ve improved their pitch success rate by 3x.
//           </p>
//           <Link
//             to="/pricing"
//             className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
//           >
//             Start Free Trial
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Features;



// src/pages/FeaturesPage.tsx
import {
  Bot,
  BarChart3,
  Video,
  Brain,
  Target,
  Shield,
  Users,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Core features — your 3 pillars
const coreFeatures = [
  {
    id: 'ai-avatar',
    icon: <Bot className="text-indigo-500" size={32} />,
    title: 'AI Avatar Simulation',
    description: 'Practice pitches with lifelike investor avatars — get real-time verbal & non-verbal feedback.',
    details: [
      'Customize avatar (VC, angel, corporate)',
      'Simulate Q&A pressure with dynamic follow-ups',
      'Track confidence, filler words, and eye contact',
    ],
  },
  {
    id: 'pitch-analysis',
    icon: <Brain className="text-cyan-500" size={32} />,
    title: 'AI Pitch Analysis',
    description: 'Deep-dive scoring across 12 dimensions: clarity, traction, storytelling, and more.',
    details: [
      'Instant 0–100 investor-readiness score',
      'Line-by-line feedback on weak spots',
      'Benchmark against top-funded startups',
    ],
  },
  {
    id: 'analytics-dashboard',
    icon: <BarChart3 className="text-purple-500" size={32} />,
    title: 'Analytics Dashboard',
    description: 'Track progress, compare versions, and prove growth to mentors or investors.',
    details: [
      'Pitch evolution timeline (v1 → v5)',
      'Strength/weakness heatmaps',
      'Export PDF reports for accelerators',
    ],
  },
];

// Supporting features (expand credibility)
const supportingFeatures = [
  { icon: <Video size={20} />, title: 'Video Upload & Review', description: 'Upload live pitch recordings for AI analysis.' },
  { icon: <Target size={20} />, title: 'Investor Persona Matching', description: 'Tailor messaging for specific VC types (e.g., seed vs growth).' },
  { icon: <Shield size={20} />, title: 'GDPR-Compliant & Private', description: 'Your IP stays yours. End-to-end encryption.' },
  { icon: <Users size={20} />, title: 'Team Collaboration', description: 'Co-edit, comment, and approve pitches with founders & advisors.' },
  { icon: <TrendingUp size={20} />, title: 'Pitch Certification', description: 'Earn a verifiable “Pitch-Ready” badge for YC, Techstars, etc.' },
  { icon: <Zap size={20} />, title: 'One-Click Export', description: 'Generate pitch decks (PPTX/PDF) or investor summary docs.' },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — spotlight your 3 core tools */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The <span className="text-indigo-600">3 tools</span> that transform how you pitch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From nervous first draft to confident delivery — train, analyze, and prove your pitch readiness.
          </p>
          
          {/* Core Tools Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {coreFeatures.map((feature) => (
              <div
                key={feature.id}
                className="group bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/demo"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Watch a Demo
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              See Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Deep-Dive Sections for Each Core Tool */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {coreFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 mb-20 items-center`}
            >
              <div className="md:w-1/2">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                <p className="text-lg text-gray-700 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                {/* Placeholder for mockup image/video */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed rounded-2xl w-full max-w-md h-64 flex items-center justify-center text-gray-500">
                  {feature.id === 'ai-avatar' && 'AI Avatar Mockup'}
                  {feature.id === 'pitch-analysis' && 'Analysis Report Preview'}
                  {feature.id === 'analytics-dashboard' && 'Dashboard UI'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supporting Features Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to pitch with confidence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built by founders, for founders — no fluff, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingFeatures.map((feature, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-gray-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to practice like a pro?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join 7,500+ founders who’ve cut pitch prep time in half — and doubled their investor meeting rate.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Start Free Trial →
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default FeaturesPage;