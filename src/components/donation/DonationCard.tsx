import { component$, useStore, $ } from '@builder.io/qwik';

interface DonationState {
  amount: string;
  custom: string;
  loading: boolean;
  error: string;
}

export const DonationCard = component$(() => {
  const state = useStore<DonationState>({
    amount: '5',
    custom: '',
    loading: false,
    error: '',
  });

  const donate = $(async () => {
    if (state.loading) return;

    const value = state.custom
      ? parseFloat(state.custom)
      : parseFloat(state.amount);
    if (isNaN(value) || value <= 0) {
      state.error = 'Please enter a valid amount.';
      return;
    }

    state.loading = true;
    state.error = '';

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(value * 100) }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout session failed');
      }

      if (typeof window !== 'undefined') {
        window.location.href = data.url as string;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      state.error = message;
    } finally {
      state.loading = false;
    }
  });

  return (
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Make a Donation
      </h2>
      {state.error && (
        <div
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
          role="alert"
        >
          {state.error}
        </div>
      )}
      <div class="flex justify-center space-x-2 mb-4">
        {['5', '10', '25'].map((amt) => (
          <button
            key={amt}
            onClick$={() => {
              state.amount = amt;
              state.custom = '';
            }}
            class={`px-4 py-2 rounded-lg border ${state.amount === amt && !state.custom ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
          >
            ${amt}
          </button>
        ))}
      </div>
      <div class="mb-4">
        <label
          class="block text-sm font-medium text-gray-700 mb-1"
          for="custom"
        >
          Custom amount
        </label>
        <input
          id="custom"
          type="number"
          min="1"
          value={state.custom}
          onInput$={(e) => {
            state.custom = (e.target as HTMLInputElement).value;
            state.amount = '';
          }}
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="USD"
        />
      </div>
      <button
        disabled={state.loading}
        onClick$={donate}
        class="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        {state.loading ? 'Processing...' : 'Donate'}
      </button>
    </div>
  );
});
