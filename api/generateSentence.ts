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
        { role: 'system', content: 'You are a Czech language expert, specializing in proper grammar and sentence structure.' },
        {
          role: 'user',
          content: `Write a short, grammatically correct sentence using '${word}'.  
      - If it is a **verb**, conjugate it correctly (past, present, or future), ensuring **proper subject-verb agreement**.  
      - If it is a **noun**, use the **correct case** depending on its function in the sentence.  
      - If it is an **adjective**, make sure it matches the **gender, number, and case** of the noun.  
      - The sentence must sound **natural, fluent, and idiomatic in Czech**.`
        }
      ],
      max_tokens: 50,
      temperature: 0.4,
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify({ sentence: data.choices[0].message.content }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
