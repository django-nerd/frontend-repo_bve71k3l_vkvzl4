export default function Navbar(){
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 py-4">
      <a href="/" className="text-white text-xl font-bold">CollabCode Studio</a>
      <div className="flex items-center gap-3 text-sm">
        <a href="/login" className="text-blue-300 hover:text-white">Login</a>
        <a href="/chat" className="text-blue-300 hover:text-white">Team Chat</a>
        <a href="/editor" className="text-blue-300 hover:text-white">Editor</a>
        <a href="/whiteboard" className="text-blue-300 hover:text-white">Whiteboard</a>
      </div>
    </div>
  )
}
