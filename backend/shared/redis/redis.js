import Redis from "ioredis";

// Redis to be used by both gateway and services
const redis = new Redis(process.env.REDIS_URL)

redis.on("connect", () => {
    console.log("Redis connected!")
})

export default redis;