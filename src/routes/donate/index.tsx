import { component$ } from '@builder.io/qwik';
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
            <p class="mt-4 text-blue-200">
              Donations also work on the web version; mobile payments work fine.
            </p>
          </div>

          <div class="mt-10 flex justify-center">
            <a
              href="https://donate.stripe.com/9B600c4rwd4V4YHbfZ5EY00"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-colors"
            >
              Donate Now
            </a>
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
