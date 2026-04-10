import { useState, useEffect, useRef } from "react"
import { useChatStore } from "../store/ChatStore"
import Avatar from "./Avatar"

const Contacts = () => {
    const [query, setQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)

    const {
        contacts,
        searchUsers,
        isSearching
    } = useChatStore()

    // to automatically focus on search bar
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            searchUsers(query)
        }, 400)
        return () => clearTimeout(timer)
    }, [query])

    // keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, contacts.length - 1))
        }
        if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0))
        }
        if (e.key === "Enter") {
            const user = contacts[selectedIndex]
            if (user) startChat(user)
        }
    }

    const startChat = (user) => {
        console.log("Start chat with:", user)
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b-2 border-black bg-white">
                <div className="relative group">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="SEARCH NAME OR EMAIL"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSelectedIndex(0)
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 border-2 border-black font-mono text-sm outline-none placeholder:text-gray-400 transition-colors"
                    />
                    <div className="absolute inset-0 border-2 border-black translate-x-1 translate-y-1 -z-10 group-focus-within:translate-x-0 group-focus-within:translate-y-0 transition-transform bg-black"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y-2 divide-black border-b-2 border-black bg-gray-50">

                {isSearching && (
                    <p className="p-6 text-xs font-mono text-gray-500 animate-pulse">
                        {">"} SEARCHING...
                    </p>
                )}

                {contacts.map((user, index) => (
                    <div
                        key={user._id}
                        onClick={() => startChat(user)}
                        /* Scaled padding (px-6 py-4) and sharp transitions */
                        className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all group
                        ${index === selectedIndex
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-black hover:text-white"}
                        `}
                    >
                        {/* avatar with brutalist border */}
                        <div className={`shrink-0 border-2 transition-all ${index === selectedIndex ? "border-white" : "border-transparent group-hover:border-white"
                            }`}>
                            <Avatar
                                name={user.fullName}
                                src={user.profilePic}
                                size={40}
                            />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold font-mono truncate uppercase">
                                {user.fullName}
                            </span>

                            <span className={`text-[10px] font-mono truncate ${index === selectedIndex ? "text-gray-400" : "text-gray-500"
                                }`}>
                                {user.email.toLowerCase()}
                            </span>
                        </div>

                    </div>
                ))}

                {!isSearching && contacts.length === 0 && query && (
                    <div className="p-6">
                        <p className="text-xs font-mono text-gray-500 p-2 text-center uppercase">
                            Error: No users found
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contacts