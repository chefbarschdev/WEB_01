import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { ValueProps } from "../components/ValueProps";
import { Footer } from "../components/Footer";

export default component$(() => {
  return (
    <div class="min-h-screen bg-blue-600">
      <NavBar />
      <Hero />
      <ValueProps />

      {/* Logos row placeholder */}
      <section class="py-12 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <h3 class="text-center text-gray-600 text-sm font-medium mb-8 uppercase tracking-wide">
            Trusted by leading companies
          </h3>
          <div class="flex justify-center items-center space-x-8 opacity-60">
            <div class="bg-gray-200 h-12 w-32 rounded flex items-center justify-center">
              <span class="text-gray-500 text-xs">Logo 1</span>
            </div>
            <div class="bg-gray-200 h-12 w-32 rounded flex items-center justify-center">
              <span class="text-gray-500 text-xs">Logo 2</span>
            </div>
            <div class="bg-gray-200 h-12 w-32 rounded flex items-center justify-center">
              <span class="text-gray-500 text-xs">Logo 3</span>
            </div>
            <div class="bg-gray-200 h-12 w-32 rounded flex items-center justify-center">
              <span class="text-gray-500 text-xs">Logo 4</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "AISOLUTIONS - Transform AI Potential into Business Value",
  meta: [
    {
      name: "description",
      content:
        "Transform AI potential into business value with live demos, expert guidance, and MVP blueprints.",
    },
    {
      property: "og:title",
      content: "AISOLUTIONS - Transform AI Potential into Business Value",
    },
    {
      property: "og:description",
      content:
        "Transform AI potential into business value with live demos, expert guidance, and MVP blueprints.",
    },
  ],
};
