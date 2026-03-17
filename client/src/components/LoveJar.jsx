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
    <div className="paper p-8 text-center relative overflow-hidden">
      <div className="hand text-3xl mb-6">Jar of Little Joys 🍯</div>
      
      <div className="relative inline-block cursor-pointer group" onClick={pickNote}>
        <motion.div
          animate={isOpening ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="text-8xl filter drop-shadow-lg group-hover:scale-110 transition-transform"
        >
          🍯
        </motion.div>
        {!currentNote && !isOpening && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-4 py-1 rounded-full hand text-sm shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Click me!
          </div>
        )}
      </div>

      <div className="mt-8 h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentNote && !isOpening && (
            <motion.div
              key={currentNote}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-[#fff9e6] p-4 rounded-lg border-2 border-dashed border-[#ffda1a] shadow-inner max-w-sm"
            >
              <p className="hand text-xl text-[#7a5c00]">{currentNote}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {currentNote && (
        <button 
          onClick={() => setCurrentNote(null)}
          className="mt-4 text-xs opacity-50 hover:opacity-100 transition-opacity hand underline"
        >
          Put it back
        </button>
      )}
    </div>
  )
}

export default LoveJar
