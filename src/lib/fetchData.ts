import Papa from 'papaparse'
import type { ArrestRecord, Metadata } from './types'

const CSV_URL =
  process.env.NEXT_PUBLIC_CSV_URL ||
  'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/arrests.csv'

const METADATA_URL =
  process.env.NEXT_PUBLIC_METADATA_URL ||
  'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/metadata.json'

export async function fetchArrestData(): Promise<ArrestRecord[]> {
  const response = await fetch(CSV_URL, {
    next: { revalidate: 300 } // Revalidate every 5 minutes
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
    next: { revalidate: 300 }
  })
  return response.json()
}
