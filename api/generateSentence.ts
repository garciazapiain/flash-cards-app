export default async function handler(req: Request): Promise<Response> {
    const { word } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    console.log(apiKey)
  
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `Write a short sentence using the word, it can be conjugated or transformed "${word}".` },
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
  