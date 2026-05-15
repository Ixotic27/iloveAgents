const salesObjectionHandler = {
  id: 'sales-objection-handler',
  name: 'Sales Objection Handler',
  description: 'Handle common sales objections with empathetic, direct, and data-driven responses.',
  category: 'Sales',
  icon: 'ShieldAlert',
  provider: 'any',
  defaultProvider: 'openai',
  model: 'gpt-4o',
  inputs: [
    {
      id: 'product',
      label: 'Your Product/Service',
      type: 'text',
      placeholder: 'e.g., B2B SaaS CRM, Enterprise Cloud Storage...',
      required: true,
    },
    {
      id: 'objection',
      label: 'Specific Objection',
      type: 'textarea',
      placeholder: 'e.g., "It\'s too expensive", "We already use a competitor", "We don\'t have the budget right now"...',
      required: true,
    },
  ],
  systemPrompt: `You are an elite, battle-tested sales trainer and closer. 
Your task is to help sales reps handle common objections by providing 3 distinct ways to respond:
1. Empathetic: Acknowledge their concern and gently pivot.
2. Direct: Challenge the premise respectfully but firmly.
3. Data-driven: Focus on ROI, case studies, or logical comparisons.

Input Context:
- Product/Service: {{product}}
- Objection: {{objection}}

Output Format (Markdown):
Start with a brief summary of why prospects typically use this objection.
Then, provide the 3 responses formatted clearly with:
- **Approach** (e.g., Empathetic)
- **When to use this:** (brief explanation of the best scenario for this response)
- **What to say:** (the exact word-for-word script the rep should use)

Keep the scripts conversational, natural, and confident. Avoid sounding robotic or overly aggressive.`,
  outputType: 'markdown',
};

export default salesObjectionHandler;
