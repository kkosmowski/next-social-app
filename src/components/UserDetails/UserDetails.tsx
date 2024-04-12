import Image from 'next/image';

import type { User } from '@/types/auth';
import type { LocaleCode } from '@/types/i18n';
import getIntl from '@/app/utils/getIntl';

import styles from './UserDetails.module.css';

type Props = {
  user: User;
  localeCode: LocaleCode;
};

async function UserDetails({ user, localeCode }: Props) {
  const { t } = await getIntl(localeCode);

  return (
    <section className={`${styles.column} ${styles.wrapper}`}>
      <Image src={user.avatarUrl} alt={t('ME.AVATAR_ALT')} width={200} height={200} />
      <article className={styles.column}>
        <h2>{user.username}</h2>
        <span>{user.status}</span>
        <hr className={styles.divider} />
        <h2 className={styles.aboutTitle}>{t('ME.ABOUT')}</h2>
        <em className={styles.about}>{user.about}</em>
      </article>
    </section>
  );
}

export default UserDetails;
