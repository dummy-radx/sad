import React, { useRef, useState } from 'react'

const Sunflower = ({ size = 80 }) => {
  const petalCount = 12
  const petals = Array.from({ length: petalCount })
  return (
    <div className="relative sunflower" style={{ width: size, height: size }}>
      {petals.map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2
        const x = Math.cos(angle) * (size * 0.32) + size / 2 - size * 0.08
        const y = Math.sin(angle) * (size * 0.32) + size / 2 - size * 0.08
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: x,
              top: y,
              width: size * 0.16,
              height: size * 0.16,
              background:
                'radial-gradient(circle at 30% 30%, #fff, #ffd7a5 60%, #ffb300)',
              transform: `rotate(${angle}rad)`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
          />
        )
      })}
      <div
        className="absolute rounded-full"
        style={{
          left: size * 0.25,
          top: size * 0.25,
          width: size * 0.5,
          height: size * 0.5,
          background:
            'radial-gradient(circle at 30% 30%, #a8733a, #6a3f1c 70%, #3c2412)',
          boxShadow: 'inset 0 0 8px rgba(255,255,255,0.2), 0 4px 14px rgba(0,0,0,0.2)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: size * 0.47,
          top: size,
          width: size * 0.06,
          height: size * 0.7,
          background:
            'linear-gradient(180deg, #4caf50, #2e7d32)',
          borderRadius: size * 0.03,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      />
      <div
        className="absolute rounded-[40%] bg-[#4caf50]"
        style={{
          left: size * 0.35,
          top: size * 1.2,
          width: size * 0.24,
          height: size * 0.12,
          transform: 'rotate(-30deg)',
          filter: 'brightness(1.1)',
          boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
        }}
      />
      <div
        className="absolute rounded-[40%] bg-[#4caf50]"
        style={{
          left: size * 0.58,
          top: size * 1.0,
          width: size * 0.24,
          height: size * 0.12,
          transform: 'rotate(22deg)',
          filter: 'brightness(1.05)',
          boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
        }}
      />
    </div>
  )
}

const SunflowerGarden = ({ onJoy }) => {
  const areaRef = useRef(null)
  const [plants, setPlants] = useState([])

  const plantSeed = (e) => {
    const rect = areaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = crypto.randomUUID()
    const newPlant = {
      id,
      x,
      y,
      size: 70 + Math.random() * 30,
      stage: 0,
    }
    setPlants((prev) => [...prev, newPlant])
    setTimeout(() => {
      setPlants((prev) => prev.map(p => p.id === id ? { ...p, stage: 1 } : p))
    }, 400)
    setTimeout(() => {
      setPlants((prev) => prev.map(p => p.id === id ? { ...p, stage: 2 } : p))
      onJoy?.(3)
    }, 1000)
  }

  return (
    <div className="paper tape p-4 md:p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle, #ffda1a, #ffb300)' }} />
        <h2 className="hand text-2xl md:text-3xl">Grow a Sunflower</h2>
      </div>
      <p className="hand text-lg mb-4">Tap anywhere to plant a little sunshine.</p>
      <div
        ref={areaRef}
        onClick={plantSeed}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          plantSeed({ clientX: touch.clientX, clientY: touch.clientY })
        }}
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        style={{
          height: 320,
          background:
            'linear-gradient(180deg, #eaf8ff 0%, #eaf8ff 60%, #c7f5a1 61%, #bdf292 100%)',
          boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.06)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-6 opacity-40"
             style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 6px, transparent 6px, transparent 12px)' }} />
        {plants.map(p => (
          <div
            key={p.id}
            className="absolute shrink-0"
            style={{ left: p.x - p.size / 2, top: p.y - p.size }}
          >
            <Sunflower size={p.size} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-cute hand text-sm md:text-base flex-1 md:flex-none" onClick={(e) => { e.stopPropagation(); setPlants([]); }}>Reset garden</button>
        <button className="btn-cute hand text-sm md:text-base flex-1 md:flex-none" onClick={(e) => {
          e.stopPropagation()
          const rect = areaRef.current.getBoundingClientRect()
          const x = Math.random() * rect.width
          const y = 80 + Math.random() * (rect.height - 100)
          plantSeed({ clientX: rect.left + x, clientY: rect.top + y })
        }}>Plant random</button>
      </div>
    </div>
  )
}

export default SunflowerGarden
