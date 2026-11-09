import redis from "../../../shared/redis/redis.js"

const Limits = {
    chat: 20,
    coding: 5,
    pdf: 5,
    ppt: 5,
    image: 3,
    search: 5
}

export const checkAgentLimit = async( userId, agent) => {
    const max = Limits[agent] || Limits ["chat"]
    const key = `rate:${userId}:${agent}`
    const count = await redis.incr(key)
    if (count == 1){
        await redis.expire()
    }
}