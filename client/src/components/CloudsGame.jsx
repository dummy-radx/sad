import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const Heart = ({ x, y, size = 18, fadeMs = 1200 }) => {
  const style = {
    left: x,
    top: y,
    width: size,
    height: size,
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    animation: `floaty ${fadeMs}ms ease-in-out`,
  }
  return (
    <div style={style}>
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path
          d="M16 27s-8.6-6.7-11.4-9.5C1.8 14.7 2.5 9.9 6 8c3.4-1.9 6.4.5 8 2.5C15.6 8.5 18.6 6.1 22 8c3.5 1.9 4.2 6.7 1.4 9.5C24.6 20.3 16 27 16 27z"
          fill="#ff6b9a"
        />
      </svg>
    </div>
  )
}

const Cloud = ({ x, y, onPop }) => {
  return (
    <div
      className="absolute cursor-pointer"
      onClick={onPop}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        animation: 'floaty 3s ease-in-out infinite',
      }}
    >
      <svg viewBox="0 0 120 70" width="120" height="70">
        <g filter="drop-shadow(0px 6px 10px rgba(0,0,0,0.12))">
          <ellipse cx="40" cy="40" rx="36" ry="24" fill="#ffffff" />
          <ellipse cx="70" cy="36" rx="24" ry="20" fill="#ffffff" />
          <ellipse cx="92" cy="44" rx="18" ry="14" fill="#ffffff" />
          <ellipse cx="24" cy="48" rx="22" ry="16" fill="#ffffff" />
        </g>
      </svg>
    </div>
  )
}

const Note = ({ x, y, text }) => {
  return (
    <div
      className="absolute hand"
      style={{
        left: x,
        top: y - 50,
        transform: 'translate(-50%, -50%)',
        background: '#fffaf1',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 12,
        padding: '8px 12px',
        boxShadow: '0 8px 14px rgba(0,0,0,0.12)',
        animation: 'floaty 1600ms ease-in-out',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  )
}

const CloudsGame = ({ onJoy }) => {
  const [clouds, setClouds] = useState([])
  const [hearts, setHearts] = useState([])
  const [notes, setNotes] = useState([])
  const containerRef = useRef(null)
  const [area, setArea] = useState({ w: 640, h: 260 })

  const msgs = useMemo(() => [
    'You are loved 💛',
    'You are sunshine 🌻',
    'We got this 🌈',
    'You’re brave and kind ✨',
    'I’m here, always 🤍',
    'Breathe. You’ve got this 🌬️',
    'Proud of you 🫶',
    'You make days brighter ☀️',
    'I’m cheering for you 🎉',
    'Sending hugs 🤗',
    'You are enough 💖',
    'Tiny steps count 👣',
    'Soft days are okay 🌙',
    'You’ve come so far 🏁',
    'I believe in you 💪',
    'Your heart is gold 💛',
    'Warm tea, warm heart 🍵',
    'More sunflowers soon 🌻',
    'Smiles ahead 😊',
    'Brave little star ⭐',
    'We’re a team 🤝',
    'Always with you 🧡',
    'Kindness suits you 🌸',
    'Clouds pass. Sun stays ☀️',
    'You’re my favorite ❤️',
    'Love is right here 💞',
    'Safe and loved 💗',
    'Gentle day, gentle heart 🫧',
    'You glow in my sky ✨',
  ], [])

  const createClouds = useCallback((count = 5, currentArea) => {
    const placed = []
    const minDistance = 140
    const relaxedDistance = 110
    const maxAttempts = count * 60
    let attempts = 0
    const width = currentArea?.w || 640
    const height = currentArea?.h || 260

    while (placed.length < count && attempts < maxAttempts) {
      attempts += 1
      const candidate = {
        id: placed.length + '-' + Math.random().toString(36).slice(2),
        x: 70 + Math.random() * (width - 140),
        y: 50 + Math.random() * (height - 100),
      }
      const overlaps = placed.some(c => Math.hypot(c.x - candidate.x, c.y - candidate.y) < minDistance)
      if (!overlaps) placed.push(candidate)
    }

    attempts = 0
    while (placed.length < count && attempts < maxAttempts) {
      attempts += 1
      const candidate = {
        id: placed.length + '-' + Math.random().toString(36).slice(2),
        x: 70 + Math.random() * (width - 140),
        y: 50 + Math.random() * (height - 100),
      }
      const overlaps = placed.some(c => Math.hypot(c.x - candidate.x, c.y - candidate.y) < relaxedDistance)
      if (!overlaps) placed.push(candidate)
    }

    while (placed.length < count) {
      placed.push({
        id: placed.length + '-' + Math.random().toString(36).slice(2),
        x: 70 + Math.random() * (width - 140),
        y: 50 + Math.random() * (height - 100),
      })
    }

    return placed
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setArea({ w: width, h: height })
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Initial clouds and refill when area becomes available
  useEffect(() => {
    if (area.w > 0 && clouds.length === 0) {
      setClouds(createClouds(5, area))
    }
  }, [area, clouds.length, createClouds])

  const popCloud = (id, x, y) => {
    setClouds(prev => prev.filter(c => c.id !== id))
    const burst = Array.from({ length: 8 }).map(() => ({
      id: crypto.randomUUID(),
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
    }))
    setHearts(prev => [...prev, ...burst])
    onJoy?.(2)
    setTimeout(() => {
      setHearts(prev => prev.slice(burst.length))
    }, 1200)
    const note = {
      id: crypto.randomUUID(),
      x,
      y,
      text: msgs[Math.floor(Math.random() * msgs.length)],
    }
    setNotes(prev => [...prev, note])
    setTimeout(() => {
      setNotes(prev => prev.filter(n => n.id !== note.id))
    }, 1800)
  }

  return (
    <div className="paper tape p-4 md:p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle, #fff, #cfefff)' }} />
        <h2 className="hand text-2xl md:text-3xl">Pop the Sad Clouds</h2>
      </div>
      <p className="hand text-lg mb-4">Tap clouds to release hearts and little notes.</p>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: '100%',
          height: 260,
          background:
            'linear-gradient(180deg, #dff3ff 0%, #eaf8ff 60%, #eefbff 100%)',
        }}
      >
        {clouds.map(c => (
          <Cloud key={c.id} x={c.x} y={c.y} onPop={() => popCloud(c.id, c.x, c.y)} />
        ))}
        {hearts.map(h => (
          <Heart key={h.id} x={h.x} y={h.y} />
        ))}
        {notes.map(n => (
          <Note key={n.id} x={n.x} y={n.y} text={n.text} />
        ))}
        {clouds.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hand text-xl">All clear and sunny!</div>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="btn-cute hand"
          onClick={() => {
            setClouds(createClouds(5))
          }}
        >
          Refill clouds
        </button>
      </div>
    </div>
  )
}

export default CloudsGame
