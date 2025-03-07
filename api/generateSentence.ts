export default async function handler(req: Request): Promise<Response> {
    const { word } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
  
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `Write a short sentence using the word "${word}".` },
        ],
        max_tokens: 50,
        temperature: 0.7,
      }),
    });
  
    const data = await response.json();
    return new Response(JSON.stringify({ sentence: data.choices[0].message.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  