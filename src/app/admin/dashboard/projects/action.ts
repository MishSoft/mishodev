'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 1. პროექტის წაშლა
export async function deleteProject(id: number) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');
  } catch (error) {
    console.error("Delete Error:", error);
  }
}

// 2. სტატუსის შეცვლა (Visible/Hidden)
export async function toggleVisibility(id: number, currentStatus: boolean) {
  try {
    await sql`UPDATE projects SET is_visible = ${!currentStatus} WHERE id = ${id}`;
    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');
  } catch (error) {
    console.error("Toggle Error:", error);
  }
}

// 3. პროექტის განახლება (რედაქტირება)
export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const long_description = formData.get('long_description') as string;
  const project_link = formData.get('project_link') as string;
  const github_link = formData.get('github_link') as string;

  const images = formData.getAll('images') as string[];
  const tools = formData.getAll('tools') as string[];

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        long_description = ${long_description},
        project_link = ${project_link},
        github_link = ${github_link},
        images = ${images},
        tools = ${tools}
      WHERE id = ${id}
    `;

    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');

  } catch (error) {
    console.error("Update Error:", error);
    return { error: "განახლება ვერ მოხერხდა" };
  }

  // წარმატების შემთხვევაში ვაბრუნებთ იუზერს სიაში
  redirect('/admin/dashboard/projects');
}
