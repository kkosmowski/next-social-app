'use client';

import useIntl from '@/app/hooks/useIntl';
import { useAuth } from '@/contexts/AuthProvider';
import { useConfirmation } from '@/contexts/ConfirmationProvider';

type Props = {
  authorId: string;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

function ItemControls({ authorId, onEdit, onDelete }: Props) {
  const { t } = useIntl();
  const { user } = useAuth();
  const { ask } = useConfirmation();

  if (authorId !== user?.id) {
    return null;
  }

  const handleDelete = () => {
    ask(
      {
        title: 'POSTS.DELETE.CONFIRM.TITLE',
        description: 'POSTS.DELETE.CONFIRM.DESCRIPTION',
      },
      { onConfirm: onDelete },
    );
  };

  return (
    <>
      {'|'}
      <button className="primary ghost" onClick={() => onEdit()}>
        {t('COMMON.EDIT')}
      </button>
      <button className="error ghost" onClick={handleDelete}>
        {t('COMMON.DELETE')}
      </button>
    </>
  );
}

export default ItemControls;
