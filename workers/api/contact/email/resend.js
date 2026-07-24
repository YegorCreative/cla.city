const subjects = {
  general: 'General Contact',
  prayer: 'Prayer Request',
  visit: 'General Contact',
  connection: 'General Contact'
};

export async function sendContactEmail(contact, env) {
  const submittedAt = new Date().toISOString();
  const text = [
    'Submission Time', submittedAt, '',
    'Name', contact.name, '',
    'Email', contact.email, '',
    'Category', contact.category, '',
    'Language', contact.language, '',
    'Page', contact.page, '',
    'Message', contact.message
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'CLA Website <onboarding@resend.dev>',
      to: ['russianspeakingchurch@gmail.com'],
      reply_to: contact.email,
      subject: `[CLA Website] ${subjects[contact.category]}`,
      text
    })
  });
  if (!response.ok) throw new Error('Email provider rejected the request');
}
