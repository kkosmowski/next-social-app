'use client';

import useIntl from '@/app/hooks/useIntl';

type Props = {
  disabled?: boolean;
  onReply: VoidFunction;
};

function ReplyButton({ disabled, onReply }: Props) {
  const { t } = useIntl();

  return (
    <button disabled={disabled} onClick={onReply}>
      {t('COMMENTS.REPLY')}
    </button>
  );
}

export default ReplyButton;
