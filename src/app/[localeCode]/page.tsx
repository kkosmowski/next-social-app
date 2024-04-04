import getIntl from '@/app/utils/getIntl';
import type { PageProps } from '@/types/common';

async function Home({ params: { localeCode } }: PageProps) {
  const { t } = await getIntl(localeCode);

  return <section>{t('TEST')}</section>;
}

export default Home;
