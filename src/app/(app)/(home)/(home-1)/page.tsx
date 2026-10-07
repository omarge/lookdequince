import BackgroundSection from '@/components/BackgroundSection'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionHero from '@/components/SectionHero'
import SectionMagazine5 from '@/components/SectionMagazine5'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts } from '@/data/posts'
import Vector1 from '@/images/Vector1.webp'
import rightImg from '@/images/quince-hero.jpg'
import { type Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Look de Quince — número 01',
  description: 'Looks de renta, maquillaje de iglesia y fiestas por zona para chavas de C y C+.',
  alternates: { canonical: '/' },
}

const Page = async () => {
  const posts = await getAllPosts()
  const authors = await getAuthors()
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <h1 className="sr-only">Look de Quince, número 01</h1>
      <SectionHero
        rightImg={rightImg}
        className="pt-14 lg:pt-20"
        heading={
          <span>
            Renta el vestido. <br /> El dinero se queda en la{' '}
            <span className="relative pr-3">
              <Image className="absolute -start-1 top-1/2 w-full -translate-y-1/2" src={Vector1} alt="" />
              <span className="relative">foto</span>
            </span>
          </span>
        }
        btnText="Ver la jornada"
        subHeading="Número 01 · 7 de octubre de 2026 · Para la chava de prepa cuya mamá ya pidió cotización. Fiesta de 100 a 200 mil."
      />

      <SectionGridCategoryBox
        categoryCardType="card2"
        categories={categories.slice(0, 8)}
        heading="Lo que se guarda"
        subHeading="Misa, salón, azotea, maquillaje y la nota para la mamá"
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionMagazine5 heading="Looks de la jornada" posts={posts.slice(0, 5)} />
      </div>

      <SectionSliderPosts
        postCardName="card10"
        heading="Por zona"
        subHeading="Tepoztlán, Coyoacán y Naucalpan no comparten la misma fiesta"
        posts={posts.slice(0, 8)}
      />

      <SectionPostsWithWidgets
        posts={posts.slice(0, 8)}
        postCardName="card7"
        gridClass="sm:grid-cols-2"
        heading="El día, en notas"
        subHeading="Encuesta a las 7:40, maquillaje a las 11, test a las 14:30"
        widgetAuthors={authors.slice(0, 4)}
        widgetCategories={categories.slice(0, 4)}
        widgetTags={tags.slice(0, 6)}
        widgetPosts={posts.slice(0, 4)}
      />

      <SectionSubscribe2 />
    </div>
  )
}

export default Page
