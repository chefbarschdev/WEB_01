import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../../components/NavBar';
import { DemoShowcase } from '../../components/DemoShowcase';
import { CTAJoinWaitlist } from '../../components/CTAJoinWaitlist';
import { Footer } from '../../components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-red-600">
      <NavBar />
      
      {/* Demo Header */}
      <section class="bg-red-600 text-white py-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            🚀 Live AI Demos
          </h1>
          <p class="text-xl text-red-100 max-w-3xl mx-auto">
            Experience our AI solutions in action. These are real, working demos 
            that showcase the power and potential of AI for your business.
          </p>
        </div>
      </section>
      
      <DemoShowcase />
      <CTAJoinWaitlist />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Live AI Demos - AISOLUTIONS',
  meta: [
    {
      name: 'description',
      content: 'Experience our AI solutions in action with live, interactive demos. See how AI can transform your business.',
    },
    {
      property: 'og:title',
      content: 'Live AI Demos - AISOLUTIONS',
    },
    {
      property: 'og:description',
      content: 'Experience our AI solutions in action with live, interactive demos.',
    },
  ],
};
