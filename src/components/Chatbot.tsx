import { component$, useSignal } from '@builder.io/qwik';

const initialCards = [
  { id: 1, text: 'AI-powered Chatbot' },
  { id: 2, text: 'Live Demo: Qwik SSR' },
  { id: 3, text: 'Join the Waitlist!' },
];

export const Chatbot = component$(() => {
  const cards = useSignal(initialCards);
  // Placeholder for swipe logic

  return (
    <div class="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center">
      {cards.value.map((card, i) => (
        <div key={card.id} class="absolute inset-0 bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-6 transition-all duration-300 flex items-center justify-center text-2xl font-bold" style={{ zIndex: cards.value.length - i }}>
          {card.text}
        </div>
      ))}
      <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
        <button class="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:shadow-xl active:scale-95 transition-transform">❌</button>
        <button class="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:shadow-xl active:scale-95 transition-transform">❤️</button>
      </div>
    </div>
  );
});