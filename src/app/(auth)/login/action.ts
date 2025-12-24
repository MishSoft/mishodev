'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const correctEmail = process.env.ADMIN_EMAIL
  const correctPassword = process.env.ADMIN_PASSWORD

  if (email === correctEmail && password === correctPassword) {
    (await cookies()).set('admin_session', 'true', {
      httpOnly: true, // უსაფრთხოებისთვის, რომ JS-ით ვერ წაიკითხონ
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 დღე
      path: '/',
    })

    redirect('/admin/dashboard')
  } else {
    return { error: "არასწორი იმეილი ან პაროლი" }
  }
}
