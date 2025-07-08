import { component$, useSignal, useStore, $ } from '@builder.io/qwik';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = component$(() => {
  const formData = useStore<ContactData>({
    name: '',
    email: '',
    message: '',
  });

  const sent = useSignal(false);
  const error = useSignal('');

  const submit = $(async () => {
    if (!formData.name || !formData.email || !formData.message) {
      error.value = 'Please fill in all fields.';
      return;
    }
    if (!formData.email.includes('@')) {
      error.value = 'Please enter a valid email address.';
      return;
    }
    sent.value = true;
  });

  if (sent.value) {
    return (
      <div class="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-scale-in">
        <div class="text-4xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-green-800 mb-2">Message sent!</h2>
        <p class="text-green-700">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <>
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
      <form preventdefault:submit onSubmit$={submit} class="space-y-6">
        {error.value && (
          <div
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            {error.value}
          </div>
        )}
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onInput$={(e) =>
              (formData.name = (e.target as HTMLInputElement).value)
            }
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Smith"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onInput$={(e) =>
              (formData.email = (e.target as HTMLInputElement).value)
            }
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label
            for="message"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onInput$={(e) =>
              (formData.message = (e.target as HTMLTextAreaElement).value)
            }
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          Send Message
        </button>
      </form>
    </>
  );
});
