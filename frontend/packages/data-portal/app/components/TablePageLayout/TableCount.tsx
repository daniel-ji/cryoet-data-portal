import Skeleton from '@mui/material/Skeleton'

import { useI18n } from 'app/hooks/useI18n'
import { useIsLoading } from 'app/hooks/useIsLoading'

export function TableCount({
  filteredCount,
  totalCount,
  type,
}: {
  filteredCount: number
  totalCount: number
  type: string
}) {
  const { isLoadingDebounced } = useIsLoading()
  const { t } = useI18n()

  return (
    <p className="text-sds-body-xs text-sds-color-primitive-gray-500 whitespace-nowrap mr-sds-xxl">
      {isLoadingDebounced ? (
        <Skeleton className="max-w-" variant="text" />
      ) : (
        t('filterCountOfMaxType', {
          type,
          count: filteredCount,
          max: totalCount,
        })
      )}
    </p>
  )
}