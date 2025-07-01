import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { Footer } from '../components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 text-gray-900">
      <NavBar />
      <Hero />
      <ValueProps />
      
      {/* Logos */}
      <section class="py-12 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <h3 class="text-center text-gray-600 text-sm font-medium mb-8 uppercase tracking-wide">
            Trusted by leading companies
          </h3>
          <div class="flex justify-center items-center space-x-8 opacity-80">
            <img src="/logos/logo1.svg" alt="Alpha Corp logo" class="h-12 w-32 object-contain" />
            <img src="/logos/logo2.svg" alt="Beta Industries logo" class="h-12 w-32 object-contain" />
            <img src="/logos/logo3.svg" alt="Creative Solutions logo" class="h-12 w-32 object-contain" />
            <img src="/logos/logo4.svg" alt="Delta Systems logo" class="h-12 w-32 object-contain" />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'AISOLUTIONS - Turn AI FOMO into ROI',
  meta: [
    {
      name: 'description',
      content: 'Transform your business with AI solutions. Live demos, expert consultation, and MVP blueprints.',
    },
    {
      property: 'og:title',
      content: 'AISOLUTIONS - Turn AI FOMO into ROI',
    },
    {
      property: 'og:description',
      content: 'Transform your business with AI solutions. Live demos, expert consultation, and MVP blueprints.',
    },
  ],
};