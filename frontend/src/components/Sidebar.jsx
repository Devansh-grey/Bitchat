import React, { useEffect, useState } from 'react'
import { useToast } from "../components/ToastProvider"
import { useAuthStore } from '../store/AuthStore.js';
import { useNavigate } from "react-router-dom"
import Chats from './Chats.jsx';
import Contacts from './Contacts.jsx';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('chats');
    const toast = useToast()
    const { logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            setIsOpen(false)
            navigate("/login")
        } catch (error) {
            console.error("error logging out", error)
            toast.error("Error logging out")
        }
    }

    return (
        <>
            {/* Menu Button - Scaled up icon and padding for w-80 context */}
            {!isOpen && (
                <button
                    className="md:hidden fixed top-5 left-5 z-50 p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="material-symbols-outlined text-2xl">menu</span>
                </button>
            )}

            {/* Main Sidebar Container - Updated to w-80 */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-80 bg-white border-r-4 border-black flex flex-col shrink-0
                transition-transform duration-300 ease-in-out transform
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0
            `}>

                {/* Header - Height increased to h-20 for better proportion */}
                <div className="h-20 flex items-center justify-between px-6 border-b-2 border-black bg-white">
                    <div className="text-2xl font-black font-headline italic tracking-tighter">
                        BITCHAT
                    </div>
                    <button
                        className="md:hidden p-2 hover:bg-black hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">

                    {/* --- NAVIGATION SECTION --- */}
                    <nav className="flex flex-col">
                        <button
                            onClick={() => setActiveTab('chats')}
                            className={`flex items-center gap-4 px-6 py-5 font-headline font-bold text-base border-b-2 border-black transition-all ${activeTab === 'chats' ? 'bg-black text-white' : 'bg-white text-black hover:text-white hover:bg-black'
                                }`}
                        >
                            <span className="material-symbols-outlined text-2xl">chat</span>
                            <span className="tracking-tight">CHATS</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('contacts')}
                            className={`flex items-center gap-4 px-6 py-5 font-headline font-bold text-base border-b-[6px] border-black transition-all ${activeTab === 'contacts' ? 'bg-black text-white' : 'bg-white text-black hover:text-white hover:bg-black'
                                }`}
                        >
                            <span className="material-symbols-outlined text-2xl">group</span>
                            <span className="tracking-tight">CONTACTS</span>
                        </button>
                    </nav>

                    {/* --- CONTENT SECTION --- */}
                    <div className="flex-1 bg-gray-50">
                        {activeTab === 'chats' ? <Chats /> : <Contacts />}
                    </div>
                    
                    {/* --- FOOTER SECTION --- */}
                    <div className="p-6 bg-white mt-auto flex flex-col gap-4">

                        {/* NEW CHAT BUTTON - Scaled padding and text */}
                        <button 
                            onClick={() => setActiveTab('contacts')}
                            className="w-full border-2 border-black py-4 px-6 font-headline font-black text-base uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                            <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">add</span>
                            <span>NEW CHAT</span>
                        </button>

                        {/* Settings and Logout row */}
                        <div className="flex gap-3">
                            <button className="flex-1 border-2 border-black py-3 font-headline font-bold text-sm uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2" title="SETTINGS">
                                <span className="material-symbols-outlined text-base">settings</span>
                                <span>SETTINGS</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-14 border-2 border-black p-3 flex items-center justify-center hover:bg-black hover:text-white transition-all" title="LOGOUT">
                                <span className="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar