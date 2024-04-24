'use client';

import useIntl from '@/app/hooks/useIntl';

type Props = {
  disabled?: boolean;
};

function ShareButton({ disabled }: Props) {
  const { t } = useIntl();

  return <button disabled={disabled}>{t('POSTS.SHARE')}</button>;
}

export default ShareButton;
