import { R2 } from "node-cloudflare-r2"
import dotenv from 'dotenv'
dotenv.config()
const {env} = process

const r2 = new R2({
    accountId: env.R2_ACCOUNT_ID!,
    accessKeyId: env.R2_ACCESS_KEY_ID!,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY!
})

const bucket = r2.bucket(env.R2_BUCKET_NAME!)
bucket.provideBucketPublicUrl(env.R2_PUBLIC_URL!)
export default bucket