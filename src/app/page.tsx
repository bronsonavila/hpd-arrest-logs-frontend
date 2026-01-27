import { ArrestDataGrid } from '@/components/ArrestDataGrid'
import { fetchArrestData, fetchMetadata } from '@/lib/fetchData'

export default async function HomePage() {
  const metadata = await fetchMetadata()
  const cacheKey = new Date(metadata.lastUpdated).getTime().toString()
  const data = await fetchArrestData(cacheKey)

  return <ArrestDataGrid data={data} metadata={metadata} />
}
