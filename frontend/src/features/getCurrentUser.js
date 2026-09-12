import api from "../../utils/axios.js"

export const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me")
        console.log(data)
    } catch (error) {
        console.log(data)
    }
}