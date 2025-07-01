import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../../components/NavBar';
import { WaitlistForm } from '../../components/WaitlistForm';
import { Testimonials } from '../../components/Testimonials';
import { FAQ } from '../../components/FAQ';
import { Footer } from '../../components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-green-600">
      <NavBar />
      
      {/* Header */}
      <section class="bg-green-600 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            🚀 Join the AI Revolution
          </h1>
          <p class="text-xl text-green-100 max-w-2xl mx-auto">
            Get exclusive early access to our AI solutions, schedule a free discovery call, 
            and receive a custom MVP blueprint tailored to your business.
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div class="bg-white">
        <WaitlistForm />
        <Testimonials />
        <FAQ />
      </div>
      
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Join Wait-list - AISOLUTIONS',
  meta: [
    {
      name: 'description',
      content: 'Join our exclusive wait-list for early access to AI solutions, free consultation, and custom MVP blueprint.',
    },
    {
      property: 'og:title',
      content: 'Join Wait-list - AISOLUTIONS',
    },
    {
      property: 'og:description',
      content: 'Get exclusive early access to our AI solutions and free consultation.',
    },
  ],
};