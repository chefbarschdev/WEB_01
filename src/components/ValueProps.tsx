import { component$ } from '@builder.io/qwik';

export const ValueProps = component$(() => {
  const valueProps = [
    {
      icon: '⚡',
      title: 'Lightning Speed',
      description: 'Deploy AI solutions 10x faster than traditional development. From concept to MVP in weeks, not months.',
      highlight: 'Speed'
    },
    {
      icon: '💰',
      title: 'Cost Savings',
      description: 'Reduce development costs by 70% with our proven AI frameworks and pre-built components.',
      highlight: 'Cost-Save'
    },
    {
      icon: '🎯',
      title: 'Expert Guidance',
      description: 'Get direct access to AI specialists who have built solutions for Fortune 500 companies.',
      highlight: 'Expertise'
    }
  ];

  return (
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AISOLUTIONS?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            We don't just build AI solutions – we accelerate your entire digital transformation journey.
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div class="text-4xl mb-4">{prop.icon}</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                <span class="text-blue-600">▲</span> {prop.highlight}
              </h3>
              <h4 class="text-xl font-semibold text-gray-800 mb-3">
                {prop.title}
              </h4>
              <p class="text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Stats section */}
        <div class="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div class="text-gray-600">AI Models Deployed</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div class="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div class="text-gray-600">Support Available</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">&lt;1s</div>
              <div class="text-gray-600">Load Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
