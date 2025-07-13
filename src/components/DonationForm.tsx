import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { loadStripe } from '@stripe/stripe-js';

interface DonationData {
  amount: number;
  name: string;
  email: string;
  message?: string;
}

export const DonationForm = component$(() => {
  const donation = useStore<DonationData>({
    amount: 1000, // $10.00 in cents
    name: '',
    email: '',
    message: ''
  });

  const isLoading = useSignal(false);
  const error = useSignal('');
  const success = useSignal(false);
  const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

  const handleDonate = $(async () => {
    if (isLoading.value) return;
    
    // Basic validation
    if (donation.amount < 100) {
      error.value = 'Minimum donation is $1.00';
      return;
    }
    
    if (!donation.email || !donation.name) {
      error.value = 'Please fill in all required fields';
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      // Call your API endpoint to create a Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: donation.amount,
          name: donation.name,
          email: donation.email,
          message: donation.message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const session = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id
      });
      
      if (stripeError) {
        throw stripeError;
      }
    } catch (err) {
      error.value = 'An error occurred. Please try again.';
      console.error('Donation error:', err);
    } finally {
      isLoading.value = false;
    }
  });

  if (success.value) {
    return (
      <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">
              Thank you for your generous donation of ${(donation.amount / 100).toFixed(2)}! Your support means the world to us.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Make a Donation</h3>
        
        {error.value && (
          <div class="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{error.value}</p>
              </div>
            </div>
          </div>
        )}
        
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label for="amount" class="block text-sm font-medium text-gray-700">
              Amount (USD)
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="amount"
                min="1"
                step="1"
                value={donation.amount / 100}
                onInput$={(e) => {
                  const value = parseFloat((e.target as HTMLInputElement).value);
                  if (!isNaN(value)) {
                    donation.amount = Math.round(value * 100);
                  }
                }}
                class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <span class="h-full py-0 pl-2 pr-4 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md">
                  USD
                </span>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum donation is $1.00</p>
          </div>

          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  id="name"
                  required
                  value={donation.name}
                  onInput$={(e) => (donation.name = (e.target as HTMLInputElement).value)}
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  type="email"
                  id="email"
                  required
                  value={donation.email}
                  onInput$={(e) => (donation.email = (e.target as HTMLInputElement).value)}
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <div class="mt-1">
                <textarea
                  id="message"
                  rows={3}
                  value={donation.message}
                  onInput$={(e) => (donation.message = (e.target as HTMLTextAreaElement).value)}
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border"
                  placeholder="Add a personal message (optional)"
                />
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="button"
              onClick$={handleDonate}
              disabled={isLoading.value || donation.amount < 100 || !donation.name || !donation.email}
              class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading.value ? (
                <>
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Donate ${(donation.amount / 100).toFixed(2)}
                </>
              )}
            </button>
            <div class="mt-4 flex items-center justify-center space-x-4">
              <img src="https://js.stripe.com/v3/fingerprinted/img/visa-3659cf505ba7d0c8c864801b40434bbc.svg" alt="Visa" class="h-6" />
              <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d884409413071ff2024c209ce9a98c4.svg" alt="Mastercard" class="h-6" />
              <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a8c6c9f7b.svg" alt="American Express" class="h-6" />
            </div>
            <p class="mt-3 text-xs text-gray-500 text-center">
              Your payment is secure and encrypted. We never store any card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
