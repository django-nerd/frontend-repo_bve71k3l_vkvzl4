import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-8">
        <Navbar />
        <div className="max-w-3xl mx-auto text-center mt-16">
          <img src="/flame-icon.svg" alt="Flames" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">CollabCode Studio</h1>
          <p className="text-xl text-blue-200 mb-6">Frontend-only demo with login, team chat, a code editor, and a whiteboard.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="/login" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">Get Started</a>
            <a href="/chat" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20">Open Team Chat</a>
            <a href="/editor" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20">Open Code Editor</a>
            <a href="/whiteboard" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20">Open Whiteboard</a>
          </div>
        </div>

        <footer className="absolute bottom-6 left-0 right-0 text-center text-sm text-blue-300/60">Frontend-only: data is stored locally in your browser</footer>
      </div>
    </div>
  )
}

export default App