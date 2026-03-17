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
      
      <header ref={topRef} className="px-4 md:px-6 pt-8 md:pt-12 pb-4">
        <div className="max-w-4xl mx-auto paper tape p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full shrink-0" style={{ background: 'radial-gradient(circle, #ffda1a, #ffb300)' }} />
              <div>
                <div className="hand text-3xl md:text-4xl">Hi, Sreeparna 🌻</div>
                <div className="hand text-base md:text-lg opacity-80">This little space is handmade for you with love.</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(gardenRef)}>Garden</button>
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(cloudsRef)}>Clouds</button>
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(jarRef)}>Love Jar</button>
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(storyRef)}>Our Story</button>
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(scratchRef)}>Note</button>
              <button className="btn-cute hand text-sm" onClick={() => scrollTo(carouselRef)}>Messages</button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-6 pb-20">
        <section ref={gardenRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
          <SunflowerGarden />
        </section>

        <section ref={cloudsRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
          <CloudsGame />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8 md:mb-10">
          <section ref={jarRef}>
            <LoveJar />
          </section>
          <section ref={scratchRef}>
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

        <section ref={storyRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
          <OurStory />
        </section>

        <section ref={carouselRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
          <LoveCarousel />
        </section>

        <div className="max-w-4xl mx-auto">
          <div className="paper tape p-6 md:p-8 text-center">
            <div className="hand text-2xl md:text-3xl mb-2">One more thing</div>
            <div className="hand text-lg">
              If you feel a little sad, plant a flower, pop a cloud,
              open the jar, and remember that you are deeply loved.
            </div>
            <div className="mt-6">
              <button className="btn-cute hand" onClick={() => scrollTo(topRef)}>Back to top</button>
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
