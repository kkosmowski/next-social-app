import type { LocaleCode } from '@/types/i18n';
import getIntl from '@/app/utils/getIntl';
import ServerIntlProvider from '@/contexts/ServerIntlProvider';

import styles from './page.module.css';

type Props = {
  params: { locale: LocaleCode };
};

async function Home({ params }: Props) {
  const { t, messages, locale } = await getIntl(params.locale, 'home');

  return (
    <ServerIntlProvider messages={messages} locale={locale}>
      <main className={styles.main}>{t('TEST')}</main>
    </ServerIntlProvider>
  );
}

export default Home;
