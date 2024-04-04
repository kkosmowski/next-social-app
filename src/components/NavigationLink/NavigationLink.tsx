import Link from 'next/link';

import type { NavLink } from '@/types/navigation';
import getIntl from '@/app/utils/getIntl';
import type { LocaleCode } from '@/types/i18n';

type Props = Omit<NavLink, 'route'> & {
  route: string;
  localeCode: LocaleCode;
};

async function NavigationLink({ route, label, access, localeCode }: Props) {
  const { t } = await getIntl(localeCode);

  // @todo: handle access
  if (access) {
    return <Link href={route}>{t(label)}</Link>;
  }
  return <></>;
}

export default NavigationLink;
