import { MdxContent } from 'app/components/MDX'
import { getLocalFileContent } from 'app/utils/repo.server'

export async function loader() {
  return getLocalFileContent('website-docs/privacy-policy.mdx')
}

export default function PrivacyPage() {
  return <MdxContent />
}
