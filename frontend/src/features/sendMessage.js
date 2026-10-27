import api from "../../utils/axios.js"

export const sendMessage = async (formData) => {
    try {
       
        const { data } = await api.post("/api/agent/chat",formData)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}