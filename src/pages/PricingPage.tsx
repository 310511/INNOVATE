
import { CheckCircle,  Star, HelpCircle } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for solo founders testing the waters.',
      features: [
        '1 Pitch Deck Review',
        'Basic Storyboard',
        'Email Support',
        'Community Access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Growth',
      price: '$99',
      period: '/month',
      description: 'Ideal for early-stage startups preparing for funding.',
      features: [
        '3 Pitch Deck Reviews',
        'Advanced Storyboard + Script',
        '1:1 Strategy Call (30 min)',
        'Investor Q&A Prep',
        'Priority Support',
      ],
      cta: 'Most Popular',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored for scaling teams and institutional use.',
      features: [
        'Unlimited Reviews',
        'Full Pitch Suite (Deck, Video, Script)',
        'Dedicated Account Manager',
        'Custom Workshops & Training',
        'SLA & API Access',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your startup journey. No hidden fees — ever.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular ? 'ring-2 ring-blue-500 scale-[1.02]' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute pt-9 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500 ml-2">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : plan.name === 'Enterprise'
                    ? 'bg-gray-800 hover:bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Can I switch plans later?',
              a: 'Yes! You can upgrade or downgrade anytime from your account dashboard.',
            },
            {
              q: 'Do you offer annual billing?',
              a: 'Yes — save 20% with annual billing. Contact us for details.',
            },
            {
              q: 'Is there a free trial?',
              a: 'We offer a 7-day free trial on the Starter and Growth plans — no credit card required.',
            },
            {
              q: 'What if I need more reviews or features?',
              a: 'Add-ons like extra pitch reviews or team seats are available on all plans.',
            },
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600 mt-1">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      {/* <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to impress investors?</h3>
        <p className="opacity-90 mb-6 max-w-2xl mx-auto">
          Join 2,500+ founders who’ve raised over $500M using our pitch tools.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
          Start Free Trial
        </button>
      </div> */}
    </div>
  );
};

export default Pricing;