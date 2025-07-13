import { component$, useSignal } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export const NavBar = component$(() => {
  const loc = useLocation();
  const menuOpen = useSignal(false);

  const isActive = (path: string) => {
    return loc.url.pathname === path;
  };

  return (
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">AI</span>
            </div>
            <span class="text-xl font-bold text-gray-900">AISOLUTIONS</span>
          </Link>

          {/* Navigation Links */}
          <div class="hidden md:flex space-x-8">
            <Link
              href="/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/demo/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/demo/')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              Demo
            </Link>
            <Link
              href="/join/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/join/')
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              Wait-list
            </Link>
            <Link
              href="/donation/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/donation/')
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              Donate
            </Link>
            <Link
              href="/contact/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div class="md:hidden">
            <button
              aria-label="Toggle navigation"
              onClick$={() => (menuOpen.value = !menuOpen.value)}
              class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class={`md:hidden ${menuOpen.value ? 'block' : 'hidden'}`}>
          <div class="flex flex-col space-y-2 py-2">
            <Link
              href="/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/demo/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/demo/')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              Demo
            </Link>
            <Link
              href="/join/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/join/')
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              Wait-list
            </Link>
            <Link
              href="/donation/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/donation/')
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              Donate
            </Link>
            <Link
              href="/contact/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});
