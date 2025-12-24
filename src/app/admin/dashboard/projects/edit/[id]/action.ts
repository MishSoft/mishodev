'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProject(id: string, formData: FormData) {
  // 1. ვიღებთ მონაცემებს ფორმიდან - სახელები უნდა ემთხვეოდეს input-ების name ატრიბუტს
  const title = formData.get('title') as string;
  const long_description = formData.get('long_description') as string;
  const project_link = formData.get('project_link') as string;
  const github_link = formData.get('github_link') as string;

  // 2. მასივების ამოღება (getAll აუცილებელია მრავალი მნიშვნელობისთვის)
  const images = formData.getAll('images') as string[];
  const tools = formData.getAll('tools') as string[];

  try {
    // 3. SQL ქვერი - სვეტების სახელები უნდა ემთხვეოდეს Neon-ის ბაზის სვეტებს
    await sql`
      UPDATE projects
      SET
        title = ${title},
        long_description = ${long_description},
        images = ${images},
        tools = ${tools},
        project_link = ${project_link},
        github_link = ${github_link}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Database update failed" };
  }

  // 4. ქეშის გასუფთავება
  revalidatePath('/admin/dashboard/projects');
  revalidatePath(`/projects/${id}`);

  // 5. დაბრუნება სიაში
  redirect('/admin/dashboard/projects');
}
