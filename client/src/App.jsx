import { useRef } from 'react'
import SunflowerGarden from './components/SunflowerGarden.jsx'
import CloudsGame from './components/CloudsGame.jsx'
import ScratchCard from './components/ScratchCard.jsx'
import LoveCarousel from './components/LoveCarousel.jsx'

const App = () => {
  const topRef = useRef(null)
  const gardenRef = useRef(null)
  const cloudsRef = useRef(null)
  const scratchRef = useRef(null)
  const carouselRef = useRef(null)

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen">
      <header ref={topRef} className="px-4 md:px-6 pt-8 md:pt-12 pb-4">
        <div className="max-w-4xl mx-auto paper tape p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle, #ffda1a, #ffb300)' }} />
              <div>
                <div className="hand text-3xl md:text-4xl">Hi, Sreeparna 🌻</div>
                <div className="hand text-base md:text-lg opacity-80">This little space is handmade for you.</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-cute hand" onClick={() => scrollTo(gardenRef)}>Garden</button>
              <button className="btn-cute hand" onClick={() => scrollTo(cloudsRef)}>Clouds</button>
              <button className="btn-cute hand" onClick={() => scrollTo(scratchRef)}>Note</button>
              <button className="btn-cute hand" onClick={() => scrollTo(carouselRef)}>Messages</button>
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

        <section ref={scratchRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
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

        <section ref={carouselRef} className="max-w-4xl mx-auto mb-8 md:mb-10">
          <LoveCarousel />
        </section>

        <div className="max-w-4xl mx-auto">
          <div className="paper p-6 md:p-8 text-center">
            <div className="hand text-2xl md:text-3xl mb-2">One more thing</div>
            <div className="hand text-lg">
              If you feel a little sad, plant a flower, pop a cloud,
              and remember that you are deeply loved.
            </div>
            <div className="mt-6">
              <button className="btn-cute hand" onClick={() => scrollTo(topRef)}>Back to top</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
