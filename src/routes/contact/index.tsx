import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { ContactForm } from '../../components/ContactForm';

export default component$(() => {
  return (
    <div class="min-h-screen bg-blue-600">
      <NavBar />
      <section class="bg-blue-600 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>
      <div class="bg-white py-16">
        <div class="max-w-2xl mx-auto px-4">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Contact Us - AISOLUTIONS',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with the AISOLUTIONS team for questions or support.',
    },
    {
      property: 'og:title',
      content: 'Contact Us - AISOLUTIONS',
    },
    {
      property: 'og:description',
      content: 'Reach out to the AISOLUTIONS team.',
    },
  ],
};

