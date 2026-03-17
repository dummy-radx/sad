import { useState, useEffect } from 'react'

const CursorTrail = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 10,
        rotation: Math.random() * 360,
      }
      setParticles((prev) => [...prev.slice(-20), newParticle])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 800))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
          style={{
            left: p.x,
            top: p.y,
            fontSize: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  )
}

export default CursorTrail
