import { component$, useSignal, useStore, $ } from '@builder.io/qwik';

interface FormData {
  email: string;
  company: string;
  size: string;
  pain: string;
  name: string;
}

export const WaitlistForm = component$(() => {
  const formData = useStore<FormData>({
    email: '',
    company: '',
    size: '',
    pain: '',
    name: ''
  });
  
  const sent = useSignal(false);
  const error = useSignal('');
  const isLoading = useSignal(false);
  const showCalendly = useSignal(false);
  
  // Form submission handler. If switching to a FormData-based approach,
  // these `name` attributes enable retrieval via
  // `new FormData(event.target as HTMLFormElement)`.
  const submitForm = $(async () => {
    if (isLoading.value) return;
    
    // Basic validation
    if (!formData.email || !formData.company || !formData.size || !formData.pain || !formData.name) {
      error.value = 'Please fill in all required fields.';
      return;
    }
    
    if (!formData.email.includes('@')) {
      error.value = 'Please enter a valid email address.';
      return;
    }
    
    isLoading.value = true;
    error.value = '';
    
    try {
      // In real implementation, this would call your API endpoint
      // const response = await fetch('/api/join-waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      sent.value = true;
      showCalendly.value = true;
      
      // Reset form
      formData.email = '';
      formData.company = '';
      formData.size = '';
      formData.pain = '';
      formData.name = '';
      
    } catch (err) {
      error.value = 'Something went wrong. Please try again.';
    } finally {
      isLoading.value = false;
    }
  });
  
  if (sent.value) {
    return (
      <section class="py-16">
        <div class="max-w-2xl mx-auto px-4 text-center">
          <div class="bg-green-50 border border-green-200 rounded-2xl p-8 animate-scale-in">
            <div class="text-6xl mb-6">🎉</div>
            <h2 class="text-3xl font-bold text-green-800 mb-4">
              Welcome to the Wait-list!
            </h2>
            <p class="text-green-700 mb-8">
              Thank you for joining! We'll be in touch within 24 hours to schedule your free discovery call.
            </p>
            
            {showCalendly.value && (
              <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                  📅 Schedule Your Discovery Call
                </h3>
                <p class="text-gray-600 mb-6">
                  Book a 15-minute call to discuss your AI needs and get your custom MVP blueprint.
                </p>
                
                {/* Calendly embed placeholder */}
                <div class="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-4xl mb-4">📅</div>
                    <h4 class="font-semibold text-gray-900 mb-2">Calendly Integration</h4>
                    <p class="text-gray-600 text-sm mb-4">
                      In production, this would show the embedded Calendly widget
                    </p>
                    <button class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Schedule 15-min Fit Call
                    </button>
                  </div>
                </div>
                
                <p class="text-xs text-gray-500 mt-4">
                  💡 After booking, you'll receive a Stripe checkout link for our paid MVP Blueprint service
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section class="py-16">
      <div class="max-w-2xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Join the Wait-list
            </h2>
            <p class="text-gray-600">
              Get exclusive early access and a free consultation with our AI experts.
            </p>
          </div>
          
          <form preventdefault:submit onSubmit$={submitForm} class="space-y-6">
            {error.value && (
              <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert" aria-live="assertive">
                {error.value}
              </div>
            )}
            
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onInput$={(e) => formData.name = (e.target as HTMLInputElement).value}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John Smith"
                autoComplete="name"
                autoFocus
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onInput$={(e) => formData.email = (e.target as HTMLInputElement).value}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="john@company.com"
                autoComplete="email"
                required
              />
            </div>
            
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onInput$={(e) => formData.company = (e.target as HTMLInputElement).value}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Acme Corp"
                autoComplete="organization"
                required
              />
            </div>
            
            <div>
              <label for="size" class="block text-sm font-medium text-gray-700 mb-2">
                Company Size *
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange$={(e) => formData.size = (e.target as HTMLSelectElement).value}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            
            <div>
              <label for="pain" class="block text-sm font-medium text-gray-700 mb-2">
                Biggest Business Challenge *
              </label>
              <textarea
                id="pain"
                name="pain"
                value={formData.pain}
                onInput$={(e) => formData.pain = (e.target as HTMLTextAreaElement).value}
                rows={4}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your main business challenge that AI could help solve..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isLoading.value}
              class="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              {isLoading.value ? (
                <span class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining Wait-list...
                </span>
              ) : (
                '🚀 Join Wait-list (Free)'
              )}
            </button>
            
            <p class="text-xs text-gray-500 text-center">
              By joining, you agree to receive updates about our AI solutions. 
              We respect your privacy and won't spam you.
            </p>
          </form>
          
          {/* Benefits */}
          <div class="mt-8 grid md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl mb-2">📞</div>
              <div class="text-sm font-medium text-green-800">Free Consultation</div>
              <div class="text-xs text-green-600">15-min discovery call</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl mb-2">📋</div>
              <div class="text-sm font-medium text-green-800">MVP Blueprint</div>
              <div class="text-xs text-green-600">Custom implementation plan</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl mb-2">⚡</div>
              <div class="text-sm font-medium text-green-800">Priority Access</div>
              <div class="text-xs text-green-600">First to get new features</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});