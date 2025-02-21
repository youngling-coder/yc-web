import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
export const prerender = false;


const transport = nodemailer.createTransport({
  host: import.meta.env.MAILTRAP_HOST,
  port: parseInt(import.meta.env.MAILTRAP_PORT),
  auth: {
    pass: import.meta.env.MAILTRAP_PASS,
    user: import.meta.env.MAILTRAP_USER,
  },
});


export const POST: APIRoute = async ({ request }) => {
    try {
      const { name, email, message } = await request.json();
  
      await transport.sendMail({
        from: `"${name}" <hello@demomailtrap.com>`,
        to: import.meta.env.OWNER_EMAIL,
        subject: `Reply To Your Portfolio from ${name} <${email}>`,
        text: message, 
      });
  
      return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  };
  
