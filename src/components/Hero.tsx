import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const Hero = component$(() => {
  return (
    <section class="text-center py-24 px-4 bg-gradient-to-tr from-pink-200 to-yellow-100 dark:from-zinc-900 dark:to-zinc-800 transition-all duration-300">
      <h1 class="text-6xl md:text-7xl font-bold leading-tight mb-4 font-sans text-neutral-900 dark:text-white">
        ✨ Discover What Moves You
      </h1>
      <p class="text-xl max-w-xl mx-auto text-neutral-600 dark:text-neutral-300 mb-6">
        Swipe, chat, vibe. A new experience starts here.
      </p>
      <button class="mt-6 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-transform font-bold text-lg">
        Get Started →
      </button>
    </section>
  );
});