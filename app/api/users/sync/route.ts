import {
  createGraphClient,
  fetchEntraUsers,
  syncUsers,
} from '@/utils/microsoft'
import { NextResponse } from 'next/server'

export async function GET() {
  const graphClient = createGraphClient()
  const entraUsers = await fetchEntraUsers(graphClient)

  const result = await syncUsers(entraUsers)

  return NextResponse.json(result)
}
