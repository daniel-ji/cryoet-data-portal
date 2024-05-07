import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Page } from '@playwright/test'

export interface TableValidatorOptions {
  client: ApolloClient<NormalizedCacheObject>
  page: Page
  params?: URLSearchParams
}

export type TableValidator = (options: TableValidatorOptions) => Promise<void>
