import { ArrestDataGrid } from '@/components/ArrestDataGrid'
import { fetchArrestData, fetchMetadata } from '@/lib/fetchData'

export default async function HomePage() {
  const [data, metadata] = await Promise.all([fetchArrestData(), fetchMetadata()])

  return <ArrestDataGrid data={data} metadata={metadata} />
}
