import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';
import RecentWork from '@/components/RecentWork';
import MyFavourites from '@/components/MyFavourites';
import FromBlog from '@/components/FromBlog';
import Footer from '@/components/Footer';

import {
  getProfile,
  getRightNow,
  getExperiences,
  getTechStack,
  getProjects,
  getFavorites,
  getPosts,
} from '@/lib/data';

// Revalidate every 60 seconds (ISR) so edits in Supabase automatically appear live
export const revalidate = 60;

export default async function HomePage() {
  const [profile, rightNow, experiences, techStack, projects, favorites, posts] =
    await Promise.all([
      getProfile(),
      getRightNow(),
      getExperiences(),
      getTechStack(),
      getProjects(),
      getFavorites(),
      getPosts(),
    ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar logoText={profile.nav_logo || `[${profile.name.toUpperCase()}]`} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
        <Hero profile={profile} rightNow={rightNow} />
        <Experience experiences={experiences} />
        <TechStack techStack={techStack} />
        <RecentWork projects={projects} />
        <MyFavourites favorites={favorites} />
        <FromBlog posts={posts.slice(0, 3)} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
