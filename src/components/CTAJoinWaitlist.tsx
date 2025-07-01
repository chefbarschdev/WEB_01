import { component$ } from '@builder.io/qwik';

export const CTAJoinWaitlist = component$(() => {
  return (
    <section class="bg-gradient-to-tr from-yellow-200 to-pink-100 dark:from-zinc-800 dark:to-zinc-900 py-16 px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white font-sans">Join the Waitlist</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-6">Be the first to try our new features and get exclusive updates.</p>
        </div>
        <form class="flex flex-col gap-4 bg-white/80 dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
          <input type="email" placeholder="Your email" class="rounded-lg border px-4 py-2 focus:outline-none focus:ring transition-all" />
          <button type="submit" class="w-full px-6 py-3 bg-gradient-to-tr from-yellow-400 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-transform">Join Waitlist</button>
        </form>
      </div>
    </section>
  );
});