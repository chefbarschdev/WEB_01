import { component$, useSignal, useStore, useTask$, $ } from '@builder.io/qwik';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chatbot = component$(() => {
  const messages = useStore<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I can help you learn about AI solutions, business automation, and how AISOLUTIONS can transform your company. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const inputValue = useSignal('');
  const isLoading = useSignal(false);
  const containerRef = useSignal<HTMLDivElement>();

  // Auto-scroll to bottom when new messages arrive
  useTask$(({ track }) => {
    track(() => messages.length);
    if (containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight;
    }
  });

  const sendMessage = $(async () => {
    if (!inputValue.value.trim() || isLoading.value) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.value,
      isUser: true,
      timestamp: new Date(),
    };

    messages.push(userMessage);
    const userInput = inputValue.value;
    inputValue.value = '';
    isLoading.value = true;

    // Simulate AI response (in real implementation, this would call your API)
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(userInput);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        };
        messages.push(aiMessage);
        isLoading.value = false;
      },
      1000 + Math.random() * 1000
    );
  });

  const handleKeyPress = $((event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  return (
    <div class="max-w-4xl mx-auto">
      {/* Chat Container */}
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div class="bg-red-600 text-white p-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span class="text-lg">🤖</span>
            </div>
            <div>
              <h3 class="font-semibold">AI Assistant</h3>
              <p class="text-red-100 text-sm">Powered by AISOLUTIONS</p>
            </div>
            <div class="ml-auto">
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={containerRef} class="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              class={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                class={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p class="text-sm">{message.text}</p>
                <p
                  class={`text-xs mt-1 ${
                    message.isUser ? 'text-red-200' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading.value && (
            <div class="flex justify-start">
              <div class="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div
                    class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style="animation-delay: 0.2s"
                  ></div>
                  <div
                    class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style="animation-delay: 0.4s"
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div class="border-t p-4">
          <div class="flex space-x-2">
            <input
              type="text"
              value={inputValue.value}
              onInput$={(e) =>
                (inputValue.value = (e.target as HTMLInputElement).value)
              }
              onKeyPress$={handleKeyPress}
              placeholder="Ask me about AI solutions, pricing, or anything else..."
              class="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              disabled={isLoading.value}
            />
            <button
              onClick$={sendMessage}
              disabled={isLoading.value || !inputValue.value.trim()}
              class="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div class="mt-6 flex flex-wrap gap-2 justify-center">
        {[
          'What AI solutions do you offer?',
          'How much does an AI implementation cost?',
          'Can you show me a demo?',
          'How long does deployment take?',
        ].map((question) => (
          <button
            key={question}
            onClick$={() => {
              inputValue.value = question;
              sendMessage();
            }}
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
});

// Simulate AI responses (in real implementation, this would call your API)
function generateAIResponse(input: string): string {
  const responses = {
    greeting: [
      "Hello! I'm excited to help you explore AI solutions. What specific area interests you most?",
      "Hi there! I'm here to answer any questions about AI implementation and our services.",
    ],
    pricing: [
      'Our AI solutions are priced based on complexity and scale. A basic chatbot starts at $5,000, while enterprise solutions range from $50,000-$500,000. Would you like to schedule a consultation for a custom quote?',
      "Pricing varies by project scope. We offer flexible packages from $5K for simple automation to $500K+ for comprehensive AI transformation. Let's discuss your specific needs!",
    ],
    demo: [
      "You're already experiencing one of our demos! This chatbot showcases our conversational AI capabilities. We also have demos for computer vision, predictive analytics, and automation. Which interests you most?",
      "Great question! You're currently using our live chatbot demo. We can also show you our AI analytics dashboard, automation workflows, and custom AI models. What would you like to see?",
    ],
    timeline: [
      'Deployment timelines vary: Simple chatbots take 2-4 weeks, custom AI models need 6-12 weeks, and enterprise solutions require 3-6 months. We prioritize rapid prototyping to show value quickly!',
      'We work fast! Basic implementations take 2-4 weeks, while complex AI systems need 2-6 months. We always start with a working prototype within the first month.',
    ],
    default: [
      "That's a great question! Our AI solutions can help with automation, customer service, data analysis, and much more. Could you tell me more about your specific business challenges?",
      "Interesting! AI has incredible potential for businesses. Whether it's improving efficiency, reducing costs, or creating new revenue streams, we can help. What's your biggest business challenge right now?",
      "I'd love to help you with that! AISOLUTIONS specializes in practical AI implementations that deliver real ROI. What industry are you in, and what processes would you like to optimize?",
    ],
  };

  const lowerInput = input.toLowerCase();

  if (
    lowerInput.includes('hello') ||
    lowerInput.includes('hi') ||
    lowerInput.includes('hey')
  ) {
    return responses.greeting[
      Math.floor(Math.random() * responses.greeting.length)
    ];
  }

  if (
    lowerInput.includes('price') ||
    lowerInput.includes('cost') ||
    lowerInput.includes('pricing')
  ) {
    return responses.pricing[
      Math.floor(Math.random() * responses.pricing.length)
    ];
  }

  if (
    lowerInput.includes('demo') ||
    lowerInput.includes('show') ||
    lowerInput.includes('example')
  ) {
    return responses.demo[Math.floor(Math.random() * responses.demo.length)];
  }

  if (
    lowerInput.includes('time') ||
    lowerInput.includes('long') ||
    lowerInput.includes('deploy')
  ) {
    return responses.timeline[
      Math.floor(Math.random() * responses.timeline.length)
    ];
  }

  return responses.default[
    Math.floor(Math.random() * responses.default.length)
  ];
}
