'use server'

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  // 1. მარტივი ველების წამოღება
  const title = formData.get('title') as string;
  const long_description = formData.get('long_description') as string;
  const project_link = formData.get('project_link') as string;
  const github_link = formData.get('github_link') as string;

  // 2. მასივების წამოღება (getAll აუცილებელია მრავალჯერადი მნიშვნელობებისთვის)
  const images = formData.getAll('images') as string[];
  const tools = formData.getAll('tools') as string[];

  // ვალიდაცია: შევამოწმოთ მინიმუმ სათაური თუ გვაქვს
  if (!title || title.length < 3) {
    return { error: "პროექტის სათაური აუცილებელია (მინ. 3 სიმბოლო)." };
  }

  try {
    // 3. ბაზაში ჩაწერა.
    // დარწმუნდი, რომ ბაზაში სვეტების სახელები ემთხვევა: title, long_description, project_link, github_link, images, tools
    await sql`
      INSERT INTO projects (
        title,
        long_description,
        project_link,
        github_link,
        images,
        tools
      )
      VALUES (
        ${title},
        ${long_description},
        ${project_link},
        ${github_link},
        ${images},
        ${tools}
      )
    `;

    // ქეშის გასუფთავება, რომ ცვლილებები მაშინვე გამოჩნდეს
    revalidatePath('/');
    revalidatePath('/admin/dashboard/projects');

  } catch (error) {
    console.error("Database Error:", error);
    return { error: "მონაცემების შენახვა ვერ მოხერხდა ბაზაში. შეამოწმეთ SQL სვეტები." };
  }

  // გადამისამართება ხდება მხოლოდ წარმატების შემთხვევაში
  redirect('/admin/dashboard/projects');
}
