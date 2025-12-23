'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

// პროექტის წაშლა
export async function deleteProject(id: number) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/admin/projects');
    revalidatePath('/'); // მთავარ გვერდზეც რომ გაქრეს
  } catch (error) {
    console.error("Delete Error:", error);
  }
}

// სტატუსის შეცვლა (Visible/Hidden)
export async function toggleVisibility(id: number, currentStatus: boolean) {
  try {
    await sql`UPDATE projects SET is_visible = ${!currentStatus} WHERE id = ${id}`;
    revalidatePath('/admin/projects');
    revalidatePath('/');
  } catch (error) {
    console.error("Toggle Error:", error);
  }
}
