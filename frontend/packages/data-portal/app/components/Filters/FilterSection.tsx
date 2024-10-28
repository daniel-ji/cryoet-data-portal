import { ReactNode } from 'react'

import { cns } from 'app/utils/cns'

export function FilterSection({
  border = true,
  children,
  title,
}: {
  border?: boolean
  children: ReactNode
  title: string
}) {
  return (
    <div
      className={cns(
        'pl-sds-l py-sds-default',
        border && 'border-b last:border-0 border-sds-color-primitive-gray-300',
      )}
    >
      <p className="font-semibold text-sds-header-s leading-sds-header-s pl-sds-s">
        {title}
      </p>

      {children}
    </div>
  )
}
