import { navigationLinks } from '@/consts/navigation';
import NavigationLink from '@/components/NavigationLink';
import AppLogo from '@/components/AppLogo';
import LoggedOnly from '@/components/LoggedOnly';
import GuestOnly from '@/components/GuestOnly';
import UserButton from '@/components/UserButton';
import SignInButton from '@/components/SignInButton';
import session from '@/app/api/[utils]/SessionClient';

import styles from './Navigation.module.css';

async function Navigation() {
  const localeCode = session.getLocaleCode();

  return (
    <header className={styles.header}>
      <AppLogo />

      <nav className={styles.nav}>
        {navigationLinks.map(({ key, route, label, access }) => (
          <NavigationLink key={key} route={route({ localeCode })} label={label} access={access} />
        ))}
      </nav>

      <LoggedOnly content={<UserButton />} />
      <GuestOnly content={<SignInButton />} />
    </header>
  );
}

export default Navigation;
