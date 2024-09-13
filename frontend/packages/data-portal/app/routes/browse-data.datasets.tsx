import { Button, CellHeaderDirection } from '@czi-sds/components'
import { json, LoaderFunctionArgs } from '@remix-run/node'

import { Order_By } from 'app/__generated__/graphql'
import { apolloClient } from 'app/apollo.server'
import { DatasetTable } from 'app/components/BrowseData'
import { DatasetFilter } from 'app/components/DatasetFilter'
import { NoResults } from 'app/components/NoResults'
import { TablePageLayout } from 'app/components/TablePageLayout'
import { getBrowseDatasets } from 'app/graphql/getBrowseDatasets.server'
import { getDatasetsFilterData } from 'app/graphql/getDatasetsFilterData.server'
import { useDatasets } from 'app/hooks/useDatasets'
import { useFilter } from 'app/hooks/useFilter'
import { useI18n } from 'app/hooks/useI18n'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = +(url.searchParams.get('page') ?? '1')
  const sort = (url.searchParams.get('sort') ?? undefined) as
    | CellHeaderDirection
    | undefined
  const query = url.searchParams.get('search') ?? ''

  let orderBy: Order_By | null = null

  if (sort) {
    orderBy = sort === 'asc' ? Order_By.Asc : Order_By.Desc
  }

  const [datasetsResponse, datasetsFilterResponse] = await Promise.all([
    getBrowseDatasets({
      orderBy,
      page,
      query,
      client: apolloClient,
      params: url.searchParams,
    }),
    getDatasetsFilterData({ client: apolloClient, filter: {} }),
  ])

  return json({
    datasetsData: datasetsResponse.data,
    datasetsFilterData: datasetsFilterResponse.data,
  })
}

export default function BrowseDatasetsPage() {
  const { datasetCount, filteredDatasetCount } = useDatasets()
  const { reset } = useFilter()
  const { t } = useI18n()

  return (
    <TablePageLayout
      tabs={[
        {
          title: t('datasets'),
          description: t('datasetsDescription'),
          learnMoreLink:
            'https://chanzuckerberg.github.io/cryoet-data-portal/cryoet_data_portal_docsite_data.html#datasets',
          filterPanel: <DatasetFilter />,
          table: <DatasetTable />,
          noResults: (
            <NoResults
              title={t('filterNoResultsFound')}
              description={t('filterTooRestrictive')}
              actions={<Button onClick={reset}>{t('clearFilters')}</Button>}
            />
          ),
          filteredCount: filteredDatasetCount,
          totalCount: datasetCount,
          countLabel: t('datasets'),
        },
      ]}
    />
  )
}
