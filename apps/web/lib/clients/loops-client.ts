import { LoopsClient } from 'loops'
import { env } from '@/lib/env'

export const loopsClient = new LoopsClient(env.LOOPS_API_KEY)
