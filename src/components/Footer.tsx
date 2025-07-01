import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

const Icon = ({ name }: { name: string }) => {
  if (name === 'home') return <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" /></svg>;
  if (name === 'search') return <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" /></svg>;
  if (name === 'user') return <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /></svg>;
  return null;
};

export const Footer = component$(() => {
  return (
    <footer class="fixed bottom-0 w-full bg-white dark:bg-black shadow-md py-2 px-6 flex justify-around z-50">
      <button class="hover:text-pink-500 transition-all">
        <Link href="/" class="flex flex-col items-center">
          <Icon name="home" />
          <span class="text-xs">Home</span>
        </Link>
      </button>
      <button class="hover:text-yellow-500 transition-all">
        <Link href="/demo/" class="flex flex-col items-center">
          <Icon name="search" />
          <span class="text-xs">Live Demos</span>
        </Link>
      </button>
      <button class="hover:text-green-500 transition-all">
        <Link href="/join/" class="flex flex-col items-center">
          <Icon name="user" />
          <span class="text-xs">Join Wait-list</span>
        </Link>
      </button>
    </footer>
  );
});