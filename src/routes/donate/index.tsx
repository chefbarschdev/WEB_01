import { component$ } from '@builder.io/qwik';
import { DonationForm } from '~/components/DonationForm';
import { NavBar } from '~/components/NavBar';
import { Footer } from '~/components/Footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-blue-600">
      <NavBar />
      
      <section class="py-20 text-white">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Support Our <span class="text-yellow-300">Mission</span>
            </h1>
            <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your generous donation helps us continue our work and make a difference in the AI solutions space.
            </p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
            <div class="p-6 sm:p-8">
              <DonationForm />
            </div>
            
            <div class="bg-blue-50 border-t border-blue-100 p-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-blue-800">Secure & Encrypted</h3>
                  <div class="mt-1 text-sm text-blue-700">
                    <p>
                      Your payment is processed securely via Stripe. We never store your payment details on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-12 text-center text-blue-100">
            <p class="text-lg">Have questions about donations?</p>
            <a href="/contact/" class="text-yellow-300 hover:text-yellow-200 font-medium">Contact our team</a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
});
