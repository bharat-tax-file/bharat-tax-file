
import { Inter } from "next/font/google"

import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'

import GenerationStep from '@/components/home/GenerationStep'

import PageMetaTags from '@/containers/PageMetaTags'
import Login from "./login/login"



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <PageMetaTags title="Home | GST & ITR Filing" description="Simplify your GST and ITR filing with our platform." url="/" />
      <Hero />
      <GenerationStep />
      <Features />
    </>
  )
}
