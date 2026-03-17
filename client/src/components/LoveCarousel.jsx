import React, { useEffect, useMemo, useRef, useState } from 'react'

const LoveCarousel = () => {
  const messages = useMemo(() => [
    'You are my favorite person in the whole world. ❤️',
    'Your smile is sunshine. It brightens everything. ☀️',
    'I love the way you care so deeply. ✨',
    'Even on cloudy days, you make my heart sunny. 🌻',
    'You are brave, kind, and endlessly beautiful. 🌸',
    'We’ll get through anything, together. Always. 🤝',
    'Every moment with you is a treasure I hold dear. 💎',
    'You make my world so much more colorful. 🌈',
    'Thank you for being my constant and my home. 🏠',
    'Your kindness is a gift to everyone who knows you. 🎁',
    'I am so incredibly proud of everything you are. 🏆',
    'You have a heart of gold, and I\'m so lucky to have it. 💛',
    'Just thinking of you makes me smile, no matter what. 😊',
    'You are the best thing that ever happened to me. 💘',
    'My love for you grows stronger with every passing day. 🌱',
    'You are my peace in the middle of any storm. 🌊',
    'I love your laugh—it\'s my favorite sound. 🎶',
    'You see the best in me even when I can\'t. 👁️',
    'Thank you for being your wonderful, unique self. 🦄',
    'I can\'t wait for all the adventures we have ahead. 🚀',
    'You are my forever and my always. ♾️'
  ], [])

  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const timerRef = useRef(null)

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      handleNext()
    }, 5000)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [messages.length])

  const handleNext = () => {
    setFade(false)
    setTimeout(() => {
      setIdx(prev => (prev + 1) % messages.length)
      setFade(true)
    }, 400)
    startTimer()
  }

  const handlePrev = () => {
    setFade(false)
    setTimeout(() => {
      setIdx(prev => (prev - 1 + messages.length) % messages.length)
      setFade(true)
    }, 400)
    startTimer()
  }

  const goTo = (n) => {
    if (n === idx) return
    setFade(false)
    setTimeout(() => {
      setIdx(n)
      setFade(true)
    }, 400)
    startTimer()
  }

  return (
    <div className="paper tape p-5 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner" style={{ background: 'linear-gradient(135deg, #ffecf3, #ffd7e3)' }}>
          💌
        </div>
        <h2 className="hand text-3xl md:text-4xl text-[#7a2948]">Little Love Notes</h2>
      </div>

      <div className="relative overflow-hidden rounded-3xl shadow-inner border border-pink-100" style={{ background: '#fffaf1', minHeight: 240 }}>
        {/* Decorative background elements */}
        <div className="absolute top-2 right-4 opacity-10 text-4xl select-none">✨</div>
        <div className="absolute bottom-4 left-4 opacity-10 text-4xl select-none">💖</div>

        <div className={`w-full h-full flex items-center justify-center p-8 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="hand text-2xl md:text-3xl text-center leading-relaxed text-[#4a323a] max-w-lg">
            {messages[idx]}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2.5">
          {messages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to note ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${i === idx ? 'w-6 h-2.5' : 'w-2.5 h-2.5'}`}
              style={{
                background: i === idx ? '#ffb6c8' : 'rgba(122, 41, 72, 0.15)',
                boxShadow: i === idx ? '0 0 8px rgba(255, 182, 200, 0.6)' : 'none'
              }}
            />
          ))}
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow hover:bg-white transition-colors flex items-center justify-center text-[#7a2948] hover:scale-105 active:scale-95"
          onClick={handlePrev}
          title="Previous Note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow hover:bg-white transition-colors flex items-center justify-center text-[#7a2948] hover:scale-105 active:scale-95"
          onClick={handleNext}
          title="Next Note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <p className="mt-4 text-center hand text-sm md:text-base opacity-60">
        Notes are added with love just for you.
      </p>
    </div>
  )
}

export default LoveCarousel
