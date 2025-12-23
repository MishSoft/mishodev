'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function sendContactMessage(formData: FormData) {
  const sender_name = formData.get('name') as string;
  const sender_email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // მარტივი ვალიდაცია
  if (!sender_name || !sender_email || !message) {
    return { error: "გთხოვთ, შეავსოთ ყველა ველი." };
  }

  try {
    await sql`
      INSERT INTO messages (sender_name, sender_email, message)
      VALUES (${sender_name}, ${sender_email}, ${message})
    `;

    // განვაახლოთ ადმინ პანელის მესიჯების გვერდი
    revalidatePath('/admin/dashboard/messages');

    return { success: "შეტყობინება წარმატებით გაიგზავნა!" };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { error: "მონაცემების გაგზავნა ვერ მოხერხდა." };
  }
}
