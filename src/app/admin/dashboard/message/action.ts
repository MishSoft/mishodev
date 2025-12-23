'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteMessage(id: number) {
  try {
    await sql`DELETE FROM messages WHERE id = ${id}`;
    revalidatePath('/admin/dashboard/message');
  } catch (error) {
    console.error("Delete Error:", error);
  }
}
