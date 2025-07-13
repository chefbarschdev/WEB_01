import { component$ } from '@builder.io/qwik';
// Donation functionality coming soon
import { NavBar } from '~/components/NavBar';
import { Footer } from '~/components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-blue-600">
      <NavBar />
      
      <section class="py-20 text-white">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Support Our <span class="text-yellow-300">Mission</span>
            </h1>
            <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your generous donation helps us continue our work and make a difference in the AI solutions space.
            </p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto p-6 sm:p-8">
            <div
              class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-lg mb-6"
              role="alert"
            >
              <span class="font-semibold">⚠️ Not functional yet:</span>
              Please reach out via
              <a href="https://wa.me/4915164438355" class="underline font-medium">
                WhatsApp
              </a>
              or
              <a href="mailto:tim.woell@gmail.com" class="underline font-medium">
                email
              </a>
              to join the wait-list.
            </div>
          </div>
          
          <div class="mt-12 text-center text-blue-100">
            <p class="text-lg">Have questions about donations?</p>
            <a href="/contact/" class="text-yellow-300 hover:text-yellow-200 font-medium">Contact our team</a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
});
