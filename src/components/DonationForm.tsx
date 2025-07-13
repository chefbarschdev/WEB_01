import { component$, useSignal, useStore, $ } from '@builder.io/qwik';

interface DonationData {
  amount: number;
  name: string;
  email: string;
  message?: string;
}

export const DonationForm = component$(() => {
  const donation = useStore<DonationData>({
    amount: 100, // $1.00 in cents
    name: '',
    email: '',
    message: ''
  });

  const isLoading = useSignal(false);
  const error = useSignal('');
  const success = useSignal(false);

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
      // In a real implementation, this would call your API endpoint
      // const response = await fetch('/api/donate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(donation)
      // });
      // const data = await response.json();
      
      // For now, we'll just simulate a successful donation
      await new Promise(resolve => setTimeout(resolve, 1000));
      success.value = true;
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
        <h3 class="text-lg leading-6 font-medium text-gray-900">Make a Donation</h3>
        
        {error.value && (
          <div class="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
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

          <div class="sm:col-span-6">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name <span class="text-red-500">*</span>
            </label>
            <div class="mt-1">
              <input
                type="text"
                id="name"
                value={donation.name}
                onInput$={(e) => (donation.name = (e.target as HTMLInputElement).value)}
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <div class="mt-1">
              <input
                type="email"
                id="email"
                value={donation.email}
                onInput$={(e) => (donation.email = (e.target as HTMLInputElement).value)}
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="message" class="block text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <div class="mt-1">
              <textarea
                id="message"
                rows={3}
                value={donation.message}
                onInput$={(e) => (donation.message = (e.target as HTMLTextAreaElement).value)}
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Leave a message of support..."
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <button
              type="button"
              onClick$={handleDonate}
              disabled={isLoading.value}
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading.value ? 'Processing...' : `Donate $${(donation.amount / 100).toFixed(2)}`}
            </button>
            
            <div class="mt-4 text-center text-sm text-gray-500">
              <p>Secure payment processing by Stripe</p>
              <div class="mt-2 flex justify-center">
                <svg class="h-8 w-auto" viewBox="0 0 71 28">
                  <g fill-rule="evenodd">
                    <path d="M58.3 5.6h-3.6c-1 0-1.9.6-2.3 1.5l-6.7 16.3c-.2.6-.4 1.3-.4 1.3h-.1s-.2-.7-.4-1.3l-2.4-5.7-2.5 6c-.2.6-.4 1.3-.4 1.3h-.1s-.2-.7-.4-1.3L35.5 7c-.3-.8-1.2-1.4-2.2-1.4h-3.6c-.5 0-.9.4-1 .8l-5.2 15.7c-.1.4-.2.8-.2 1.2 0 .8.6 1.5 1.4 1.5h5.1c.9 0 1.7-.6 2-1.4l1.1-3.6h6.6l1.1 3.6c.3.8 1.1 1.4 2 1.4h5.1c.8 0 1.4-.7 1.4-1.5 0-.4-.1-.8-.2-1.2l-1.5-4.7 3.5-8.6c.2-.6.4-1.3.4-1.3h.1s.2.7.4 1.3l2.1 5.5 1.9-4.6c.4-1 .5-1.6.5-1.6h.1s-.2-.5-.8-.5zm-20.2 9.4l2-6.2h.1l2 6.2h-4.1z"></path>
                    <path d="M13.5 5.6c-4.3 0-7.7 3.5-7.7 7.8 0 3.6 2.7 6.6 6.3 7.3.5.1.7-.2.7-.5 0-.2 0-1 0-1.9-.2 0-3.5.7-3.5-3.1 0-.7.3-1.3.7-1.8.7-.8 2-.8 2.5-.7.6.1 1.2.2 1.8.4.1-.1.3-.3.4-.5.6-.9.8-1.9.6-2.9-.8.1-1.6.1-2.4.1z"></path>
                    <path d="M12.5 16.2c-3.7 0-6.6-3-6.6-6.6 0-3.7 3-6.6 6.6-6.6.7 0 1.3.1 2 .3-.9-.6-2-.9-3.1-.9-3.3 0-6 2.7-6 6s2.7 6 6 6c1.8 0 3.4-.8 4.5-2.1-.6.1-1.3.2-2 .2z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
