import { useRef, useState, useEffect } from 'react'
import SunflowerGarden from './components/SunflowerGarden.jsx'
import CloudsGame from './components/CloudsGame.jsx'
import ScratchCard from './components/ScratchCard.jsx'
import LoveCarousel from './components/LoveCarousel.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import LoveJar from './components/LoveJar.jsx'
import OurStory from './components/OurStory.jsx'

const BackgroundHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
      }
      setHearts((prev) => [...prev.slice(-15), newHeart])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="bg-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            bottom: '-50px',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const topRef = useRef(null)
  const gardenRef = useRef(null)
  const cloudsRef = useRef(null)
  const jarRef = useRef(null)
  const storyRef = useRef(null)
  const scratchRef = useRef(null)
  const carouselRef = useRef(null)

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen relative">
      <CursorTrail />
      <BackgroundHearts />
      
      <header ref={topRef} className="px-4 md:px-6 pt-6 md:pt-12 pb-4">
        <div className="max-w-4xl mx-auto paper tape p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-12 h-12 rounded-full shrink-0 shadow-md" style={{ background: 'radial-gradient(circle, #ffda1a, #ffb300)' }} />
              <div>
                <div className="hand text-3xl md:text-5xl">Hi, Sreeparna 🌻</div>
                <div className="hand text-base md:text-xl opacity-80 mt-1">This little space is handmade for you with all my love.</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 max-w-lg">
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(gardenRef)}>Garden</button>
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(cloudsRef)}>Clouds</button>
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(jarRef)}>Love Jar</button>
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(storyRef)}>Our Story</button>
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(scratchRef)}>Note</button>
              <button className="btn-cute hand text-xs md:text-sm px-4 py-2" onClick={() => scrollTo(carouselRef)}>Messages</button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-6 py-8 md:py-12">
        <section ref={gardenRef} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <SunflowerGarden />
        </section>

        <section ref={cloudsRef} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <CloudsGame />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 md:mb-16">
          <section ref={jarRef} className="h-full">
            <LoveJar />
          </section>
          <section ref={scratchRef} className="h-full">
            <ScratchCard
              message={
                <>
                  You are my sunflower, warm and bright. <br />
                  Even on cloudy days, you make my heart sunny. <br />
                  I love you. Always, always. 💛
                </>
              }
            />
          </section>
        </div>

        <section ref={storyRef} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <OurStory />
        </section>

        <section ref={carouselRef} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <LoveCarousel />
        </section>

        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="paper tape p-8 md:p-12 text-center">
            <div className="hand text-3xl md:text-4xl mb-4">One more thing</div>
            <div className="hand text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              If you feel a little sad, plant a flower, pop a cloud,
              open the jar, and remember that you are deeply loved.
            </div>
            <div className="mt-8">
              <button className="btn-cute hand px-8 py-3 text-lg" onClick={() => scrollTo(topRef)}>Back to the top ❤️</button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center opacity-40 hand">
        Made with ❤️ for Sreeparna
      </footer>
    </div>
  )
}

export default App
