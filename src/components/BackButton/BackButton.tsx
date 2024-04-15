'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from '@/consts/symbols';
import type { Route } from '@/types/navigation';
import type { TranslationKey } from '@/types/i18n';
import useIntl from '@/app/hooks/useIntl';

import styles from './BackButton.module.css';

type Props =
  | {
      backRoute?: never;
      label?: never;
    }
  | {
      backRoute: Route;
      label: TranslationKey;
    };

function BackButton(props?: Props) {
  const router = useRouter();
  const { t } = useIntl();

  const navigateBack = () => {
    if (props?.backRoute) {
      router.push(props.backRoute);
    } else {
      router.back();
    }
  };

  return (
    <button className={`ghost ${styles.button}`} onClick={navigateBack}>
      {ArrowLeft} {t(props?.label ?? 'COMMON.BACK')}
    </button>
  );
}

export default BackButton;
