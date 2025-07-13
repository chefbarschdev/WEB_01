import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../../components/NavBar';
import { DonationCard } from '../../components/donation/DonationCard';
import { Footer } from '../../components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-purple-600">
      <NavBar />
      <section class="bg-purple-600 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Support Our Work</h1>
          <p class="text-xl text-purple-100 max-w-2xl mx-auto">
            Your donations help us continue building open-source AI solutions.
          </p>
        </div>
      </section>
      <div class="bg-white py-16">
        <div class="max-w-md mx-auto px-4">
          <DonationCard />
        </div>
      </div>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Donate - AISOLUTIONS',
  meta: [
    {
      name: 'description',
      content: 'Contribute to support the development of our AI solutions.',
    },
    {
      property: 'og:title',
      content: 'Donate - AISOLUTIONS',
    },
    {
      property: 'og:description',
      content: 'Contribute to support the development of our AI solutions.',
    },
  ],
};
