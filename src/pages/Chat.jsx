import { useEffect, useState, useRef } from 'react'

// Frontend-only mode: store messages in localStorage per-user token
// We keep login token from localStorage and gate access without backend calls

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  const token = localStorage.getItem('cc_token')
  const name = localStorage.getItem('cc_name')

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
      return
    }
    const saved = JSON.parse(localStorage.getItem('cc_chat') || '[]')
    setMessages(saved)
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const persist = (items) => {
    localStorage.setItem('cc_chat', JSON.stringify(items))
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = {
      id: crypto.randomUUID(),
      user_name: name || 'Anonymous',
      content: input.trim(),
      ts: Date.now(),
    }
    const next = [...messages, newMsg]
    setMessages(next)
    persist(next)
    setInput('')
  }

  const logout = () => {
    localStorage.removeItem('cc_token')
    localStorage.removeItem('cc_name')
    localStorage.removeItem('cc_email')
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <aside className="hidden md:block w-64 border-r border-white/10 p-6 text-white/80">
        <h2 className="text-xl font-semibold text-white mb-4">CollabCode Team</h2>
        <div className="text-sm mb-2">Signed in as</div>
        <div className="font-medium">{name}</div>
        <button onClick={logout} className="mt-4 text-sm text-blue-300 hover:text-white">Sign out</button>
      </aside>

      <main className="flex-1 flex flex-col p-4 md:p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-bold">Team Chat</h1>
          <a href="/" className="text-blue-300 hover:text-white">Home</a>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="bg-slate-900/60 border border-white/10 rounded-lg p-3 text-white">
              <div className="text-xs text-blue-300/80">{m.user_name}</div>
              <div className="text-sm">{m.content}</div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-blue-200/60">No messages yet. Be the first to say hello!</div>
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">Send</button>
        </form>
      </main>
    </div>
  )
}
