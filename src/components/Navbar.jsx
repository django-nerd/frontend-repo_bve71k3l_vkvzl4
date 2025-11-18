export default function Navbar(){
  return (
    <div className="w-full flex items-center justify-between py-4">
      <a href="/" className="text-white text-xl font-bold">CollabCode Studio</a>
      <div className="flex items-center gap-3">
        <a href="/login" className="text-blue-300 hover:text-white">Login</a>
        <a href="/chat" className="text-blue-300 hover:text-white">Team Chat</a>
      </div>
    </div>
  )
}
