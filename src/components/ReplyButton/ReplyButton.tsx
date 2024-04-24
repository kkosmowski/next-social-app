'use client';

import useIntl from '@/app/hooks/useIntl';

type Props = {
  onReply: VoidFunction;
};

function ReplyButton({ onReply }: Props) {
  const { t } = useIntl();

  return <button onClick={onReply}>{t('POSTS.COMMENT_REPLY')}</button>;
}

export default ReplyButton;
