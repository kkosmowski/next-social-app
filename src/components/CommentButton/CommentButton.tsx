'use client';

import useIntl from '@/app/hooks/useIntl';

type Props = {
  disabled?: boolean;
  onClick?: VoidFunction;
};

function CommentButton({ disabled, onClick }: Props) {
  const { t } = useIntl();

  return (
    <button disabled={disabled} onClick={() => onClick?.()}>
      {t('POSTS.COMMENT')}
    </button>
  );
}

export default CommentButton;
