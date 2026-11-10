import redis from "../../../shared/redis/redis.js"

const Limits = {
    chat: 10,
    coding: 1,
    pdf: 2,
    ppt: 2,
    image: 1,
    search: 2
}   // These limits should be incresed

export const checkAgentLimit = async( userId, agent) => {
    const max = Limits[agent] || Limits ["chat"]
    const key = `rate:${userId}:${agent}`
    const count = await redis.incr(key)
    if (count == 1){
        await redis.expire(key,60)
    }
    const ttl = await redis.ttl(key)    // time to leave

    if (count > max) {
        const minutes = Math.floor(ttl/60)
        const seconds = ttl%60
        const time = minutes > 0 ? `${minutes} min : ${seconds} sec` : `${seconds} seconds`

        const error = new Error(`Rate limit exceeded for ${agent}.`)
        error.status = 429
        error.data = {
            success: false,
            agent,
            limit: max,
            remainingTime: ttl,
            retryAfter: time,
            message: `You  have reached the ${agent} limit (${max} requests per minute). Try again in ${time}.`
        }
        throw error;
    }
    return {
        remaining: max - count,
        limit: max
    }
}