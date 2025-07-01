import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export const NavBar = component$(() => {
  const loc = useLocation();
  const isActive = (path: string) => loc.url.pathname === path;
  const isDark = useSignal(false);

  useVisibleTask$(() => {
    isDark.value = localStorage.getItem('theme') === 'dark';
    document.documentElement.classList.toggle('dark', isDark.value);
  });

  return (
    <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/60 transition-all duration-300">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">AI</span>
          </div>
          <span class="text-xl font-bold text-neutral-900 dark:text-white font-sans">AISOLUTIONS</span>
        </Link>
        {/* Navigation Links */}
        <div class="hidden md:flex space-x-8">
          <Link 
            href="/" 
            class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-pink-600 bg-pink-50 dark:bg-zinc-800' : 'text-neutral-700 dark:text-neutral-200 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-zinc-800'}`}
          >Home</Link>
          <Link 
            href="/demo/" 
            class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/demo/') ? 'text-yellow-600 bg-yellow-50 dark:bg-zinc-800' : 'text-neutral-700 dark:text-neutral-200 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-zinc-800'}`}
          >Demo</Link>
          <Link 
            href="/join/" 
            class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/join/') ? 'text-green-600 bg-green-50 dark:bg-zinc-800' : 'text-neutral-700 dark:text-neutral-200 hover:text-green-600 hover:bg-green-50 dark:hover:bg-zinc-800'}`}
          >Wait-list</Link>
        </div>
        {/* Theme toggle + avatar */}
        <div class="flex items-center space-x-4">
          <button
            class="rounded-full p-2 bg-white/50 dark:bg-black/40 hover:shadow-xl transition-all"
            onClick$={() => {
              isDark.value = !isDark.value;
              document.documentElement.classList.toggle('dark', isDark.value);
              localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
            }}
            aria-label="Toggle dark mode"
          >
            {isDark.value ? '🌙' : '☀️'}
          </button>
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center text-white font-bold">U</div>
        </div>
      </div>
    </nav>
  );
});