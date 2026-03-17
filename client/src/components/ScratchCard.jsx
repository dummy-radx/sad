import React, { useEffect, useRef, useState, useCallback } from 'react'

const ScratchCard = ({ onReveal, message }) => {
  const canvasRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const lastPoint = useRef(null)
  const brushRadius = 32

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    
    const initCanvas = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.scale(dpr, dpr)
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight)
      gradient.addColorStop(0, '#d1d5db')
      gradient.addColorStop(0.5, '#9ca3af')
      gradient.addColorStop(1, '#6b7280')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      
      // Add some "scratchy" texture
      ctx.strokeStyle = 'rgba(0,0,0,0.05)'
      ctx.lineWidth = 1
      for (let i = 0; i < 100; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight)
        ctx.lineTo(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight)
        ctx.stroke()
      }
      
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, 4 + Math.random() * 8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    initCanvas()
    const timer = setTimeout(initCanvas, 100) // Double check after a moment
    window.addEventListener('resize', initCanvas)
    return () => {
      window.removeEventListener('resize', initCanvas)
      clearTimeout(timer)
    }
  }, [])

  const handleStart = (e) => {
    setDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top
    lastPoint.current = { x, y }
    scratch(x, y)
  }

  const handleEnd = () => {
    setDrawing(false)
    lastPoint.current = null
  }

  const scratch = (x, y) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = brushRadius * 2

    ctx.beginPath()
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(x, y)
    } else {
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2)
    }
    ctx.stroke()
    lastPoint.current = { x, y }
    checkReveal()
  }

  const handleMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top
    
    setCursor({ x, y, visible: true })
    
    if (drawing && !revealed) {
      scratch(x, y)
    }
  }

  const [isAutoScratching, setIsAutoScratching] = useState(false)

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < img.length; i += 4) {
      if (img[i] === 0) cleared++
    }
    const ratio = cleared / (img.length / 4)
    if (ratio > 0.4 && !revealed) {
      setRevealed(true)
      setIsAutoScratching(false)
      onReveal?.()
    }
  }, [revealed, onReveal])

  const autoScratch = () => {
    if (revealed || isAutoScratching) return
    setIsAutoScratching(true)
    
    let frames = 0
    const animate = () => {
      if (!canvasRef.current || revealed) return
      
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      
      // Generate a few random scratch points per frame
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        scratch(x, y)
      }
      
      frames++
      if (frames < 60 && !revealed) {
        requestAnimationFrame(animate)
      } else {
        setIsAutoScratching(false)
      }
    }
    animate()
  }

  return (
    <div className="paper tape p-5 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner" style={{ background: 'linear-gradient(135deg, #ffecf3, #ffd7e3)' }}>
          🪄
        </div>
        <h2 className="hand text-3xl md:text-4xl text-[#7a2948]">Scratch to Reveal</h2>
      </div>
      <p className="hand text-xl mb-6 text-[#4a323a] min-h-14 md:min-h-12">Gently scratch to uncover a secret note just for you.</p>
      
      <div
        className="relative rounded-3xl overflow-hidden shadow-inner border border-pink-100 group cursor-none"
        style={{ height: 320, background: '#fffaf1' }}
        onMouseEnter={() => setCursor(c => ({ ...c, visible: true }))}
        onMouseLeave={() => {
          setCursor(c => ({ ...c, visible: false }))
          handleEnd()
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10 text-center">
          <div className="hand text-xl md:text-2xl leading-relaxed text-[#7a2948] overflow-hidden">
            {message}
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />

        {cursor.visible && !revealed && (
          <div
            className="absolute pointer-events-none z-50"
            style={{
              left: cursor.x,
              top: cursor.y,
              width: brushRadius * 2,
              height: brushRadius * 2,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(1px)',
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">✨</div>
          </div>
        )}
      </div>
      
      {revealed ? (
        <div className="mt-6 hand text-2xl text-center text-[#ff6b9a] animate-bounce">
          Yay! You found it 💛
        </div>
      ) : (
        <div className="mt-4 flex justify-center md:hidden">
          <button 
            onClick={autoScratch}
            disabled={isAutoScratching}
            className="btn-cute hand text-sm px-6 py-2 flex items-center gap-2"
          >
            {isAutoScratching ? "Revealing..." : "✨ Auto Reveal ✨"}
          </button>
        </div>
      )}
    </div>
  )
}

export default ScratchCard
