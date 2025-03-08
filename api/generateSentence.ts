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
        {
          role: 'user',
          content: `Write a short, grammatically correct sentence using "${word}". 
            - If it is a **verb**, conjugate it with a **random pronoun** and in a **random tense** (present, past, or future).
            - If it is a **noun**, use it in a **random case** (e.g., nominative, accusative, genitive, etc.) with natural sentence structure.
            - If it is an **adjective**, apply it to a noun in a **random gender and case**, ensuring agreement.
            - The sentence should sound **natural and idiomatic** in Czech.`
        }
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
