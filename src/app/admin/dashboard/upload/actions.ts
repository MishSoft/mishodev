'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const project_link = formData.get('project_link') as string;
  const github_link = formData.get('github_link') as string;
  const techString = formData.get('technologies') as string;

  const technologies = techString
    ? techString.split(',').map(t => t.trim())
    : [];

  // დროებითი სურათი, სანამ Upload სერვისს დაამატებ
  const image_url = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";

  try {
    await sql`
      INSERT INTO projects (title, description, project_link, github_link, technologies, image_url)
      VALUES (${title}, ${description}, ${project_link}, ${github_link}, ${technologies}, ${image_url})
    `;

    revalidatePath('/');
    revalidatePath('/admin/projects');
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "მონაცემების შენახვა ვერ მოხერხდა ბაზაში." };
  }

  // Redirect ყოველთვის try-catch-ის გარეთ
  redirect('/admin/dashboard/projects');
}
