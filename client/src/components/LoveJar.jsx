import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoveJar = () => {
  const notes = [
    "Your smile is my favorite thing in the world. 😊",
    "You make every day feel like a sunny day. ☀️",
    "I'm so lucky to have you in my life. 🍀",
    "You're the most beautiful person I know, inside and out. ✨",
    "I love the way you laugh. It's music to my ears. 🎶",
    "Thank you for being you. You're perfect. 💖",
    "I can't wait to make more memories with you. 📸",
    "You are my greatest adventure. 🗺️",
    "My heart is happiest when I'm with you. 💓",
    "You're my favorite 'hello' and hardest 'goodbye'. 👋",
  ]

  const [currentNote, setCurrentNote] = useState(null)
  const [isOpening, setIsOpening] = useState(false)

  const pickNote = () => {
    setIsOpening(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * notes.length)
      setCurrentNote(notes[randomIndex])
      setIsOpening(false)
    }, 500)
  }

  return (
    <div className="paper tape p-5 md:p-8 h-full flex flex-col items-center">
      <div className="flex items-center gap-4 mb-4 w-full">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner" style={{ background: 'linear-gradient(135deg, #fff9e6, #ffda1a)' }}>
          🍯
        </div>
        <h2 className="hand text-3xl md:text-4xl text-[#7a5c00]">Jar of Little Joys</h2>
      </div>
      <p className="hand text-xl mb-6 text-[#5c4a00] w-full min-h-14 md:min-h-12">Click the jar to find a little bit of happiness inside.</p>

      <div 
        className="relative rounded-3xl overflow-hidden shadow-inner border border-yellow-100 flex flex-col items-center justify-center w-full"
        style={{ height: 320, background: '#fffaf1' }}
      >
        <div 
          className="relative cursor-pointer group mb-4" 
          onClick={pickNote}
        >
          <motion.div
            animate={isOpening ? { rotate: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="text-8xl filter drop-shadow-lg group-hover:scale-110 transition-transform"
          >
            🍯
          </motion.div>
          {!currentNote && !isOpening && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-4 py-1 rounded-full hand text-sm shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click me!
            </div>
          )}
        </div>

        <div className="h-32 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {currentNote && !isOpening && (
              <motion.div
                key={currentNote}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-[#fffdf5] p-4 rounded-xl border-2 border-dashed border-[#ffda1a] shadow-sm max-w-sm text-center"
              >
                <p className="hand text-lg md:text-xl text-[#7a5c00] leading-tight">{currentNote}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentNote && (
          <button 
            onClick={() => setCurrentNote(null)}
            className="mt-2 text-xs opacity-50 hover:opacity-100 transition-opacity hand underline absolute bottom-4"
          >
            Put it back
          </button>
        )}
      </div>
    </div>
  )
}

export default LoveJar
