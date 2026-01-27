import Papa from 'papaparse'
import type { ArrestRecord, Metadata } from './types'

const CSV_URL =
  process.env.NEXT_PUBLIC_CSV_URL ||
  'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/arrests.csv'

const METADATA_URL =
  process.env.NEXT_PUBLIC_METADATA_URL ||
  'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/metadata.json'

export async function fetchArrestData(cacheKey?: string): Promise<ArrestRecord[]> {
  const url = cacheKey ? `${CSV_URL}?v=${cacheKey}` : CSV_URL
  const response = await fetch(url, {
    next: { revalidate: 60 }
  })
  const csvText = await response.text()

  const result = Papa.parse<ArrestRecord>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  return result.data
}

export async function fetchMetadata(): Promise<Metadata> {
  const response = await fetch(METADATA_URL, {
    cache: 'no-store' // Always fetch fresh metadata
  })
  return response.json()
}
