import api from "../../utils/axios.js";

export const verifyPayment = async (payload) => {
 
    const { data } = await api.post("/api/billing/verify", payload);
    return data
 
  
};