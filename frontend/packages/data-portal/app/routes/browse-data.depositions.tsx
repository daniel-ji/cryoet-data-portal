import { CellHeaderDirection } from '@czi-sds/components'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'

import { Order_By } from 'app/__generated__/graphql'
import { apolloClient } from 'app/apollo.server'
import { DepositionTable } from 'app/components/BrowseData/DepositionTable'
import {
  TableHeaderDefinition,
  TablePageLayout,
} from 'app/components/TablePageLayout'
import { QueryParams } from 'app/constants/query'
import { getBrowseDepositions } from 'app/graphql/getBrowseDepositions.server'
import { useDepositions } from 'app/hooks/useDepositions'
import { useI18n } from 'app/hooks/useI18n'
import { getFeatureFlag } from 'app/utils/featureFlags'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  const showDepositions = getFeatureFlag({
    env: process.env.ENV,
    key: 'depositions',
    params: url.searchParams,
  })

  if (!showDepositions) {
    return redirect('/404')
  }

  const page = +(url.searchParams.get(QueryParams.Page) ?? '1')
  const sort = (url.searchParams.get(QueryParams.Sort) ?? undefined) as
    | CellHeaderDirection
    | undefined
  const query = url.searchParams.get(QueryParams.Search) ?? ''

  let orderBy: Order_By | null = null

  if (sort) {
    orderBy = sort === 'asc' ? Order_By.Asc : Order_By.Desc
  }

  const { data } = await getBrowseDepositions({
    orderBy,
    page,
    query,
    client: apolloClient,
    params: url.searchParams,
  })

  return json(data)
}

export default function BrowseDepositionsPage() {
  const { depositionCount, filteredDepositionCount } = useDepositions()
  const { t } = useI18n()

  return (
    <TablePageLayout
      tabs={[
        {
          title: t('depositions'),
          description: t('depositionsDescription'),
          learnMoreLink:
            'https://chanzuckerberg.github.io/cryoet-data-portal/cryoet_data_portal_docsite_data.html#depositions',
          table: <DepositionTable />,
          filteredCount: filteredDepositionCount,
          totalCount: depositionCount,
          countLabel: t('depositions'),
          Header: TableHeaderDefinition,
        },
      ]}
    />
  )
}
