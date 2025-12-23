'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const image_url = formData.get('image_url') as string; // <-- დარწმუნდი რომ ეს ხაზი გაქვს
  const project_link = formData.get('project_link') as string;
  const github_link = formData.get('github_link') as string;

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        image_url = ${image_url},  -- <-- და ეს ხაზიც აუცილებელია SQL-ში
        project_link = ${project_link},
        github_link = ${github_link}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "განახლება ვერ მოხერხდა" };
  }

  revalidatePath('/admin/dashboard/projects');
  revalidatePath(`/projects/${id}`);
  redirect('/admin/dashboard/projects');
}
