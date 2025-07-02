import { component$, useSignal } from '@builder.io/qwik';
import { Chatbot } from './Chatbot';

export const DemoShowcase = component$(() => {
  const activeTab = useSignal('chatbot');
  
  const tabs = [
    {
      id: 'chatbot',
      title: '🤖 AI Chatbot',
      description: 'RAG-powered conversational AI'
    },
    {
      id: 'analytics',
      title: '📊 AI Analytics',
      description: 'Coming soon'
    },
    {
      id: 'automation',
      title: '⚡ AI Automation',
      description: 'Coming soon'
    },
    {
      id: 'vision',
      title: '👁️ Computer Vision',
      description: 'Coming soon'
    }
  ];

  return (
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        {/* Tab Navigation */}
        <div class="flex flex-wrap justify-center mb-8 bg-gray-100 rounded-2xl p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick$={() => activeTab.value = tab.id}
              class={`px-6 py-3 rounded-xl font-medium transition-all duration-300 m-1 ${
                activeTab.value === tab.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-600 hover:bg-white'
              }`}
            >
              <div class="text-sm">{tab.title}</div>
              <div class="text-xs opacity-75">{tab.description}</div>
            </button>
          ))}
        </div>
        
        {/* Demo Content */}
        <div class="bg-gray-50 rounded-2xl p-8 min-h-[600px]">
          {activeTab.value === 'chatbot' && (
            <div class="animate-fade-in">
              <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">
                  🤖 Intelligent AI Chatbot
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                  Experience our RAG (Retrieval-Augmented Generation) powered chatbot. 
                  Ask questions about AI, business solutions, or anything else!
                </p>
              </div>
              <Chatbot />
            </div>
          )}
          
          {activeTab.value !== 'chatbot' && (
            <div class="text-center py-20 animate-fade-in">
              <div class="text-6xl mb-6">🚧</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                {tabs.find(t => t.id === activeTab.value)?.title} Demo
              </h3>
              <p class="text-gray-600 mb-8 max-w-md mx-auto">
                This exciting demo is coming soon! Join our wait-list to be 
                notified when it's ready.
              </p>
              <div class="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
                <h4 class="font-semibold text-gray-900 mb-2">What to expect:</h4>
                <ul class="text-left text-gray-600 space-y-2">
                  <li>• Real-time AI processing</li>
                  <li>• Interactive demonstrations</li>
                  <li>• Custom business scenarios</li>
                  <li>• Performance metrics</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Demo Features */}
        <div class="mt-12 grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="text-3xl mb-3">⚡</div>
            <h3 class="font-semibold text-gray-900 mb-2">Real-time Processing</h3>
            <p class="text-gray-600 text-sm">Experience lightning-fast AI responses</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="text-3xl mb-3">🎯</div>
            <h3 class="font-semibold text-gray-900 mb-2">Accurate Results</h3>
            <p class="text-gray-600 text-sm">Powered by state-of-the-art models</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg text-center">
            <div class="text-3xl mb-3">🔧</div>
            <h3 class="font-semibold text-gray-900 mb-2">Customizable</h3>
            <p class="text-gray-600 text-sm">Tailored to your business needs</p>
          </div>
        </div>
      </div>
    </section>
  );
});
