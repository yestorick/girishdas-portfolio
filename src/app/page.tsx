import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';
import RecentWork from '@/components/RecentWork';
import FromBlog from '@/components/FromBlog';
import Footer from '@/components/Footer';

import {
  getProfile,
  getRightNow,
  getExperiences,
  getTechStack,
  getProjects,
  getPosts,
} from '@/lib/data';

// Revalidate every 60 seconds (ISR) so edits in Supabase automatically appear live
export const revalidate = 60;

export default async function HomePage() {
  const [profile, rightNow, experiences, techStack, projects, posts] =
    await Promise.all([
      getProfile(),
      getRightNow(),
      getExperiences(),
      getTechStack(),
      getProjects(),
      getPosts(),
    ]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar
        logoText={profile.nav_logo || profile.name}
        avatarUrl={profile.avatar_url}
        statusBadge={profile.status_badge}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 focus:outline-none">
        <Hero profile={profile} rightNow={rightNow} />
        <Experience experiences={experiences} resumeUrl={profile.resume_url} />
        <RecentWork projects={projects} />
        <TechStack techStack={techStack} />
        <FromBlog posts={posts.slice(0, 3)} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
