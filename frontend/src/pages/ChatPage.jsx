import React from 'react'
import Sidebar from '../components/Sidebar'

const ChatPage = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white"> 
      <Sidebar />
      <main className="flex-1 relative bg-white overflow-hidden border-black">
        
      </main>
    </div>
  )
}

export default ChatPage
