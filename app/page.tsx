import HeroCarousel from '@/components/HeroCarousel'
import AboutSection from '@/components/AboutSection'
import VehicleCarousel from '@/components/VehicleCarousel'
import TeamGrid from '@/components/TeamGrid'
import BlogGrid from '@/components/BlogGrid'

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <VehicleCarousel />
      <TeamGrid />
      <BlogGrid />
    </>
  )
}

