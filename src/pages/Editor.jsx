import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_HTML = `<!-- Write HTML here -->\n<div class="p-4">\n  <h1>Hello CollabCode</h1>\n  <p>Edit HTML, CSS, and JS, then press Run.</p>\n</div>`
const DEFAULT_CSS = `/* Write CSS here */\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter, sans-serif;\n}\n.hi { color: #60a5fa }`
const DEFAULT_JS = `// Write JS here (executed in preview)\nconsole.log('CollabCode Studio Editor ready')`

export default function Editor() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [autoRun, setAutoRun] = useState(true)
  const iframeRef = useRef(null)

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cc_editor') || '{}')
    setHtml(saved.html || DEFAULT_HTML)
    setCss(saved.css || DEFAULT_CSS)
    setJs(saved.js || DEFAULT_JS)
  }, [])

  // Persist to localStorage
  useEffect(() => {
    const data = { html, css, js }
    localStorage.setItem('cc_editor', JSON.stringify(data))
    if (autoRun) run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js])

  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`
  }, [html, css, js])

  const run = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Code Editor</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-blue-200/80">\n            <input type="checkbox" checked={autoRun} onChange={(e)=>setAutoRun(e.target.checked)} /> Auto-run\n          </label>
          <button onClick={run} className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500">Run</button>
          <a href="/" className="text-blue-300 hover:text-white text-sm">Home</a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Panel title="HTML">
            <textarea value={html} onChange={(e)=>setHtml(e.target.value)} className="w-full h-48 md:h-56 lg:h-64 bg-slate-900/60 border border-white/10 rounded p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </Panel>
          <Panel title="CSS">
            <textarea value={css} onChange={(e)=>setCss(e.target.value)} className="w-full h-48 md:h-56 lg:h-64 bg-slate-900/60 border border-white/10 rounded p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </Panel>
          <Panel title="JS">
            <textarea value={js} onChange={(e)=>setJs(e.target.value)} className="w-full h-48 md:h-56 lg:h-64 bg-slate-900/60 border border-white/10 rounded p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </Panel>
        </div>
        <div>
          <div className="h-[720px] bg-white/5 border border-white/10 rounded overflow-hidden">
            <iframe ref={iframeRef} title="preview" className="w-full h-full bg-white" srcDoc={srcDoc} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, children }){
  return (
    <div>
      <div className="mb-2 text-sm text-blue-200/80">{title}</div>
      {children}
    </div>
  )
}
