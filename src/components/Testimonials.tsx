import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const Testimonials = component$(() => {
  const current = useSignal(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'TechFlow Inc',
      content:
        'AISOLUTIONS transformed our customer service with their AI chatbot. We saw a 70% reduction in response time and 90% customer satisfaction. The ROI was immediate.',
      avatar: '👩‍💼',
      rating: 5,
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'VP of Operations',
      company: 'Global Logistics Co',
      content:
        'The AI automation solution saved us 40 hours per week on manual processes. What used to take days now happens in minutes. Incredible efficiency gains.',
      avatar: '👨‍💼',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Head of Marketing',
      company: 'Growth Dynamics',
      content:
        'Their AI analytics platform gave us insights we never had before. We increased conversion rates by 45% and reduced customer acquisition costs by 30%.',
      avatar: '👩‍🎨',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'CEO',
      company: 'StartupX',
      content:
        "From concept to deployment in just 3 weeks. The team's expertise and speed were phenomenal. Our AI-powered product is now our main revenue driver.",
      avatar: '👨‍💻',
      rating: 5,
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Director of IT',
      company: 'Enterprise Solutions',
      content:
        'The custom AI model they built for our inventory management reduced waste by 25% and improved forecasting accuracy by 60%. Outstanding results.',
      avatar: '👩‍🔬',
      rating: 5,
    },
  ];

  // Auto-rotate testimonials
  useTask$(({ track, cleanup }) => {
    track(() => current.value);
    
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    const timer = setInterval(() => {
      current.value = (current.value + 1) % testimonials.length;
    }, 5000);

    cleanup(() => clearInterval(timer));
  });

  const nextTestimonial = $(() => {
    current.value = (current.value + 1) % testimonials.length;
  });

  const prevTestimonial = $(() => {
    current.value =
      current.value === 0 ? testimonials.length - 1 : current.value - 1;
  });

  const goToTestimonial = $((index: number) => {
    current.value = index;
  });

  return (
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business leaders say
            about working with AISOLUTIONS.
          </p>
        </div>

        {/* Main Testimonial */}
        <div class="relative">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div class="text-center">
              {/* Stars */}
              <div class="flex justify-center mb-6">
                {Array.from({ length: testimonials[current.value].rating }).map(
                  (_, i) => (
                    <span key={i} class="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  )
                )}
              </div>

              {/* Quote */}
              <blockquote class="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
                "{testimonials[current.value].content}"
              </blockquote>

              {/* Author */}
              <div class="flex items-center justify-center space-x-4">
                <div class="text-4xl">{testimonials[current.value].avatar}</div>
                <div class="text-left">
                  <div class="font-semibold text-gray-900 text-lg">
                    {testimonials[current.value].name}
                  </div>
                  <div class="text-gray-600">
                    {testimonials[current.value].title} at{' '}
                    {testimonials[current.value].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick$={prevTestimonial}
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg
              class="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick$={nextTestimonial}
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg
              class="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div class="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick$={() => goToTestimonial(index)}
              class={`w-3 h-3 rounded-full transition-all duration-300 ${
                current.value === index
                  ? 'bg-green-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div class="mt-16 grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">150+</div>
            <div class="text-gray-600">Happy Clients</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div class="text-gray-600">Satisfaction Rate</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div class="text-gray-600">AI Models Deployed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div class="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Company Logos */}
        <div class="mt-12">
          <h3 class="text-center text-gray-600 text-sm font-medium mb-8 uppercase tracking-wide">
            Trusted by industry leaders
          </h3>
          <div class="flex justify-center items-center space-x-8 opacity-60">
            {[
              'TechFlow Inc',
              'Global Logistics',
              'Growth Dynamics',
              'StartupX',
              'Enterprise Solutions',
            ].map((company) => (
              <div
                key={company}
                class="bg-gray-200 h-12 px-6 rounded flex items-center justify-center"
              >
                <span class="text-gray-500 text-xs font-medium">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
