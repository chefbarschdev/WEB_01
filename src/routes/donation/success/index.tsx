import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  const sessionId = location.url.searchParams.get('session_id');
  const donationAmount = useSignal<number | null>(null);
  const isLoading = useSignal(true);
  const error = useSignal('');

  useTask$(async () => {
    if (!sessionId) {
      error.value = 'No session ID found';
      isLoading.value = false;
      return;
    }

    try {
      // In a real app, you would verify the session with your server
      // const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
      // const data = await response.json();
      
      // For demo purposes, we'll just simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      donationAmount.value = 1000; // Default to $10.00 for demo
    } catch (err) {
      console.error('Error verifying session:', err);
      error.value = 'Failed to verify your donation. Please contact support.';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="min-h-screen bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
          <div class="p-8 sm:p-10">
            {isLoading.value ? (
              <div class="text-center py-12">
                <div class="inline-flex items-center justify-center space-x-2">
                  <div class="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                  <span class="text-lg font-medium text-gray-900">Verifying your donation...</span>
                </div>
              </div>
            ) : error.value ? (
              <div class="text-center py-12">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 class="mt-3 text-lg font-medium text-gray-900">Something went wrong</h3>
                <p class="mt-2 text-sm text-gray-600">{error.value}</p>
                <div class="mt-6">
                  <a
                    href="/donate"
                    class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Back to Donation Page
                  </a>
                </div>
              </div>
            ) : (
              <div class="text-center">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg 
                    class="h-12 w-12 text-green-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Thank you for your support!
                </h1>
                <p class="mt-4 text-lg text-gray-600">
                  Your donation of <span class="font-semibold">${(donationAmount.value! / 100).toFixed(2)}</span> has been received.
                </p>
                <p class="mt-2 text-gray-600">
                  A receipt has been sent to your email address.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/"
                    class="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Return to Home
                  </a>
                  <a
                    href="/donate"
                    class="text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Make Another Donation <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
