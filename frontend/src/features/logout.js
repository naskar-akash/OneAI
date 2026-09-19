import api from "../../utils/axios"

export const logout = async () => {
    try {
        const {data} = await api.get("/api/auth/logout");
        return data;
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}