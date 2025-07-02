import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Hero = component$(() => {
  return (
    <section class="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-gray-900 py-24">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Transform AI Potential into{" "}
            <span class="text-yellow-600">Business Value</span>
          </h1>

          <p class="text-xl md:text-2xl mb-10 text-blue-800 max-w-3xl mx-auto leading-relaxed">
            Stop watching competitors leverage AI while you fall behind. Get
            live demos, expert guidance, and a custom MVP blueprint to transform
            your business with AI solutions.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/demo/"
              class="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 Explore Live Demos
            </Link>

            <Link
              href="/join/"
              class="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              📋 Join Wait-list
            </Link>
          </div>
          <img
            src="/images/hero.svg"
            alt="Illustration representing AI solutions"
            class="mx-auto mt-10 w-full max-w-md"
          />

          <div class="mt-12 text-blue-700">
            <p class="text-sm mb-2">⚡ Loads in &lt;1s on mobile</p>
            <p class="text-sm">
              🎯 Live AI demos • 📞 Discovery calls • 💡 MVP blueprints
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
