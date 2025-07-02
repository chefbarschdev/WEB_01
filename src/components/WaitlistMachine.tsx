import { component$, useSignal } from '@builder.io/qwik';

export type WaitlistState = 'idle' | 'submitting' | 'success' | 'error';

export const WaitlistMachine = component$(() => {
  const email = useSignal('');
  const state = useSignal<WaitlistState>('idle');
  const timerVisible = useSignal(false);
  const errorMsg = useSignal('');

  const submit = async () => {
    if (state.value === 'submitting') return;
    state.value = 'submitting';
    timerVisible.value = true;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: email.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Unknown error');
      }

      state.value = 'success';
    } catch (err: any) {
      console.error('Insert failed:', err);
      errorMsg.value = err.message;
      state.value = 'error';
    } finally {
      timerVisible.value = false;
    }
  };

  return (
    <div>
      {state.value === 'success' ? (
        <p class="text-green-600">✅ You're on the waitlist!</p>
      ) : (
        <>
          <input
            type="email"
            bind:value={email}
            placeholder="Your email"
            class="border rounded p-2 mr-2"
          />
          <button
            onClick$={submit}
            disabled={state.value === 'submitting'}
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Join Waitlist
          </button>

          {timerVisible.value && (
            <p class="text-sm text-gray-500 mt-2">⏳ Saving your request...</p>
          )}

          {state.value === 'error' && (
            <p class="text-red-600 mt-2">❌ {errorMsg.value}</p>
          )}
        </>
      )}
    </div>
  );
});
