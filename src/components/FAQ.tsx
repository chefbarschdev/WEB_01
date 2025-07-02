import { $, component$, useSignal } from '@builder.io/qwik';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ = component$(() => {
  const openItem = useSignal<number | null>(null);
  
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What exactly do I get by joining the wait-list?",
      answer: "By joining our wait-list, you get: (1) A free 15-minute discovery call with our AI experts, (2) A custom MVP blueprint tailored to your business needs, (3) Priority access to our AI solutions when they launch, (4) Exclusive updates and early-bird pricing on our services."
    },
    {
      id: 2,
      question: "How much do your AI solutions typically cost?",
      answer: "Our pricing varies based on complexity and scale. Simple chatbots start at $5,000, custom AI models range from $25,000-$100,000, and enterprise solutions can be $100,000-$500,000+. During your discovery call, we'll provide a detailed quote based on your specific needs and budget."
    },
    {
      id: 3,
      question: "How long does it take to implement an AI solution?",
      answer: "Implementation timelines depend on the solution: Simple chatbots take 2-4 weeks, custom AI models need 6-12 weeks, and comprehensive enterprise solutions require 3-6 months. We always start with a working prototype within the first month to demonstrate value quickly."
    },
    {
      id: 4,
      question: "Do you provide ongoing support and maintenance?",
      answer: "Absolutely! We offer 24/7 technical support, regular model updates, performance monitoring, and continuous optimization. Our support packages include everything from basic maintenance to full managed AI services, ensuring your solutions stay current and effective."
    },
    {
      id: 5,
      question: "What industries do you work with?",
      answer: "We work across all industries including healthcare, finance, e-commerce, manufacturing, logistics, SaaS, and more. Our AI solutions are adaptable to any business model. We've successfully implemented solutions for startups to Fortune 500 companies."
    },
    {
      id: 6,
      question: "What's included in the MVP Blueprint?",
      answer: "Your custom MVP Blueprint includes: (1) Technical architecture diagram, (2) Implementation roadmap with timelines, (3) Cost breakdown and ROI projections, (4) Risk assessment and mitigation strategies, (5) Integration requirements, (6) Success metrics and KPIs. This normally costs $2,500 but is free for wait-list members."
    },
    {
      id: 7,
      question: "Can you integrate with our existing systems?",
      answer: "Yes! We specialize in seamless integrations with existing tech stacks. Whether you use Salesforce, HubSpot, custom databases, APIs, or legacy systems, we ensure our AI solutions work harmoniously with your current infrastructure without disrupting operations."
    },
    {
      id: 8,
      question: "What makes AISOLUTIONS different from other AI companies?",
      answer: "Three key differentiators: (1) Speed - We deliver working prototypes in weeks, not months, (2) Practical focus - We build AI that solves real business problems and generates measurable ROI, (3) Full-service approach - From strategy to deployment to ongoing optimization, we handle everything so you can focus on your business."
    }
  ];
  
  const toggleItem = $(
    (id: number) => {
      openItem.value = openItem.value === id ? null : id;
    }
  );
  
  return (
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions 
            about our AI solutions and services.
          </p>
        </div>
        
        <div class="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} class="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick$={() => toggleItem(item.id)}
                class="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
              >
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div class={`transform transition-transform duration-200 ${
                    openItem.value === item.id ? 'rotate-180' : ''
                  }`}>
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              {openItem.value === item.id && (
                <div class="px-6 pb-4 animate-fade-in">
                  <div class="text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div class="mt-12 text-center bg-gray-50 rounded-2xl p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p class="text-gray-600 mb-6">
            Our AI experts are here to help. Schedule a free consultation to discuss 
            your specific needs and get personalized answers.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@aisolutions.com"
              class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📧 Email Us
            </a>
            <a 
              href="tel:+15551234567"
              class="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              📞 Call Us
            </a>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div class="mt-12 grid md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-green-50 rounded-xl">
            <div class="text-2xl mb-2">⚡</div>
            <div class="font-semibold text-green-800 mb-1">24hr Response</div>
            <div class="text-green-600 text-sm">We reply to all inquiries within 24 hours</div>
          </div>
          <div class="text-center p-6 bg-green-50 rounded-xl">
            <div class="text-2xl mb-2">🎯</div>
            <div class="font-semibold text-green-800 mb-1">Expert Guidance</div>
            <div class="text-green-600 text-sm">Direct access to AI specialists</div>
          </div>
          <div class="text-center p-6 bg-green-50 rounded-xl">
            <div class="text-2xl mb-2">💡</div>
            <div class="font-semibold text-green-800 mb-1">Custom Solutions</div>
            <div class="text-green-600 text-sm">Tailored to your business needs</div>
          </div>
        </div>
      </div>
    </section>
  );
});
