import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-purple-600">
      <NavBar />
      <section class="bg-purple-600 text-white py-32">
        <div class="max-w-xl mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold mb-4">Donation Canceled</h1>
          <p class="text-purple-100 text-lg">Your donation was canceled.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Donation Canceled - AISOLUTIONS',
};
