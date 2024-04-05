import getIntl from '@/app/utils/getIntl';
import type { PageProps } from '@/types/common';

async function Home({ params: { localeCode } }: PageProps) {
  const { t } = await getIntl(localeCode);

  return <section>Hello</section>;
}

export default Home;
