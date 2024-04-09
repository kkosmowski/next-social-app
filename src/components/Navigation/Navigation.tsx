import { navigationLinks } from '@/consts/navigation';
import NavigationLink from '@/components/NavigationLink';
import AppLogo from '@/components/AppLogo';
import LoggedOnly from '@/components/LoggedOnly';
import GuestOnly from '@/components/GuestOnly';
import UserButton from '@/components/UserButton';
import SignInButton from '@/components/SignInButton';
import validateLocaleCode from '@/i18n/validateLocaleCode';

import styles from './Navigation.module.css';

type Props = {
  localeCode: string;
};

async function Navigation({ localeCode }: Props) {
  const validatedCode = validateLocaleCode(localeCode);
  return (
    <header className={styles.header}>
      <AppLogo />

      <nav className={styles.nav}>
        {navigationLinks.map(({ key, route, label, access }) => (
          <NavigationLink
            key={key}
            route={route({ localeCode: validatedCode })}
            label={label}
            access={access}
            localeCode={validatedCode}
          />
        ))}
      </nav>

      <LoggedOnly content={<UserButton />} />
      <GuestOnly content={<SignInButton />} />
    </header>
  );
}

export default Navigation;
