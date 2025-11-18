import { useEffect, useRef, useState } from 'react'

export default function Whiteboard() {
  const canvasRef = useRef(null)
  const [color, setColor] = useState('#60a5fa')
  const [size, setSize] = useState(4)
  const [drawing, setDrawing] = useState(false)
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cc_whiteboard') || '[]')
    setPaths(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('cc_whiteboard', JSON.stringify(paths))
    redraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths])

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      if (!canvas) return
      const parent = canvas.parentElement
      const ratio = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * ratio
      canvas.height = (parent.clientHeight) * ratio
      canvas.style.width = parent.clientWidth + 'px'
      canvas.style.height = parent.clientHeight + 'px'
      const ctx = canvas.getContext('2d')
      ctx.scale(ratio, ratio)
      redraw()
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const start = (e) => {
    const { x, y } = point(e)
    setDrawing(true)
    setPaths((p) => [...p, { color, size, points: [{ x, y }] }])
  }
  const move = (e) => {
    if (!drawing) return
    const { x, y } = point(e)
    setPaths((p) => {
      const copy = [...p]
      copy[copy.length - 1].points.push({ x, y })
      return copy
    })
  }
  const end = () => setDrawing(false)

  const point = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    return { x, y }
  }

  const redraw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = 'round'
    paths.forEach((p) => {
      ctx.strokeStyle = p.color
      ctx.lineWidth = p.size
      ctx.beginPath()
      p.points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      })
      ctx.stroke()
    })
  }

  const undo = () => setPaths((p) => p.slice(0, -1))
  const clearAll = () => setPaths([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Whiteboard</h1>
        <div className="flex items-center gap-3">
          <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-8 h-8 p-0 bg-transparent border border-white/20 rounded" />
          <input type="range" min="1" max="20" value={size} onChange={(e)=>setSize(parseInt(e.target.value))} />
          <button onClick={undo} className="px-3 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20">Undo</button>
          <button onClick={clearAll} className="px-3 py-2 rounded bg-red-600 hover:bg-red-500">Clear</button>
          <a href="/" className="text-blue-300 hover:text-white text-sm">Home</a>
        </div>
      </header>

      <div className="h-[70vh] bg-white/5 border border-white/10 rounded overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={(e)=>{e.preventDefault(); start(e)}}
          onTouchMove={(e)=>{e.preventDefault(); move(e)}}
          onTouchEnd={(e)=>{e.preventDefault(); end(e)}}
        />
      </div>
    </div>
  )
}
