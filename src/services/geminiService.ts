
const GEMINI_API_KEY = 'AIzaSyC-pDJqx2e2BzLjhWrEI9hnT2s6V5quzWI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling Gemini API with prompt:', prompt);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      console.error('Gemini API Error:', response.status, response.statusText);
      throw new Error(`Failed to get response from Gemini API: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    console.log('Gemini API Response:', data);
    
    const responseText = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not process your request.';
    return responseText;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I am experiencing technical difficulties. Please try again later.';
  }
};

export const getProductRecommendations = async (query: string, context?: string): Promise<string> => {
  const prompt = `As a smart e-commerce assistant for SnapBasket, an Indian online shopping platform, help with this request: "${query}". ${context ? `Context: ${context}` : ''} 

Provide helpful, specific product recommendations or shopping advice in a friendly, conversational tone. Focus on:
- Products available in India with INR pricing
- Quality and value for money
- Popular brands and trusted sellers
- Seasonal offers and deals
- Regional preferences

Keep responses concise and actionable.`;
  
  return generateGeminiResponse(prompt);
};

export const getShoppingAssistance = async (query: string, cartItems?: any[]): Promise<string> => {
  const cartContext = cartItems ? `Current cart: ${cartItems.map(item => `${item.product.name} (${item.quantity}x)`).join(', ')}` : '';
  const prompt = `As a helpful shopping assistant for SnapBasket e-commerce platform in India, answer this question: "${query}". ${cartContext} 

Provide concise, helpful advice about:
- Product comparisons and alternatives
- Pricing and deals
- Shipping and delivery information
- Return and exchange policies
- Payment options (UPI, Cards, Wallets)
- Bundle offers and discounts

Keep responses friendly and practical for Indian customers.`;
  
  return generateGeminiResponse(prompt);
};

export const getChatbotResponse = async (message: string, context?: string): Promise<string> => {
  const prompt = `You are an AI shopping assistant for SnapBasket, a modern e-commerce platform in India. 

User message: "${message}"
${context ? `Context: ${context}` : ''}

Respond naturally and helpfully. You can help with:
- Finding products ("Show me smartphones under ₹20,000")
- Product recommendations ("What's good for gaming?")
- Shopping advice ("Is this a good deal?")
- Order support ("Track my order")
- General shopping questions

Keep responses conversational, helpful, and focused on Indian market preferences. Use ₹ for pricing.`;

  return generateGeminiResponse(prompt);
};
