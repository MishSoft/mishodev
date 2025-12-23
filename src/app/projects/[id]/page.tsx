import sql from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Globe, Github, Calendar, Layout } from 'lucide-react';

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // წამოვიღოთ კონკრეტული პროექტი ID-ით
  const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
  const project = projects[0];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-400">პროექტი ვერ მოიძებნა</p>
          <Link href="/" className="mt-6 inline-block text-pink-500 hover:underline">მთავარზე დაბრუნება</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-pink-500/30">
      {/* ზედა ნავიგაცია */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20">
        <Link href="/#work" className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all font-medium">
          <ArrowLeft size={20} /> Back to Projects
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] flex items-end">
        <img
          src={project.image_url}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-20 pb-20">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 backdrop-blur-md">Case Study</span>
            <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs text-pink-500 backdrop-blur-md font-bold italic">2024</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase italic">
            {project.title}
          </h1>
        </div>
      </div>

      {/* კონტენტი და დეტალები */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* მარცხენა მხარე: აღწერა */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-3">
              <Layout className="text-pink-500" size={24} /> პროექტის შესახებ
            </h2>
            <div className="text-gray-400 leading-[1.8] text-lg md:text-xl font-light whitespace-pre-wrap">
              {project.description}
            </div>
          </section>
        </div>

        {/* მარჯვენა მხარე: ლინკები */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-gray-900/40 border border-white/5 rounded-3xl backdrop-blur-xl sticky top-32">
            <h3 className="text-xl font-bold mb-6 italic underline decoration-pink-500 underline-offset-8">პროექტის ბმულები</h3>

            <div className="space-y-4">
              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  className="group flex items-center justify-between w-full bg-white text-black p-4 rounded-2xl font-bold hover:bg-pink-500 hover:text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-2"><Globe size={20} /> Live Preview</span>
                  <div className="group-hover:translate-x-1 transition-transform">→</div>
                </a>
              )}

              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  className="group flex items-center justify-between w-full bg-transparent border border-white/10 p-4 rounded-2xl font-bold hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2"><Github size={20} /> Repository</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">↗</div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
