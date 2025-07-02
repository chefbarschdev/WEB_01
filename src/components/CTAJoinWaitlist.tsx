import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const CTAJoinWaitlist = component$(() => {
  return (
    <section class="bg-gradient-to-r from-red-600 to-red-700 py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <div class="animate-fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Pilot AI in Your Business?
          </h2>

          <p class="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join our exclusive wait-list to get early access to our AI
            solutions, schedule a discovery call, and receive a custom MVP
            blueprint.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/join/"
              class="bg-white text-red-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 Join the Wait-list
            </Link>

            <div class="text-red-100 text-sm">
              <span class="block">✅ Free consultation</span>
              <span class="block">✅ Custom MVP blueprint</span>
              <span class="block">✅ Priority access</span>
            </div>
          </div>

          {/* Social Proof */}
          <div class="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <div class="text-2xl font-bold mb-1">500+</div>
                <div class="text-red-200 text-sm">Companies on wait-list</div>
              </div>
              <div>
                <div class="text-2xl font-bold mb-1">24hrs</div>
                <div class="text-red-200 text-sm">Average response time</div>
              </div>
              <div>
                <div class="text-2xl font-bold mb-1">98%</div>
                <div class="text-red-200 text-sm">Satisfaction rate</div>
              </div>
            </div>
          </div>

          <p class="text-red-200 text-sm mt-6">
            💡 Limited spots available for Q1 2024 implementations
          </p>
        </div>
      </div>
    </section>
  );
});
