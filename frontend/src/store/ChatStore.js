import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

export const useChatStore = create((set) => ({
    chats: [],
    selectedChat: null,

    contacts: [],
    isSearching: false,

    setSelectedChat: (chat) => set({ selectedChat: chat }),

    fetchChats: async () => {
        try {
            const res = await axiosInstance.get("/chats")
            set({ chats: res.data.data })
            console.log(res);

        } catch (error) {
            console.error(error)
            throw error
        }
    },

    searchUsers: async (query) => {
        if (!query.trim()) {
            set({ contacts: [] })
            return
        }

        try {
            set({ isSearching: true })

            const res = await axiosInstance.get(`/user/search?q=${query}`)

            set({ contacts: res.data.data })

        } catch (error) {
            console.error(error)
        } finally {
            set({ isSearching: false })
        }
    }
}))