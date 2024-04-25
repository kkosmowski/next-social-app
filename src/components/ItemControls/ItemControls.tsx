'use client';

import useIntl from '@/app/hooks/useIntl';
import { useAuth } from '@/contexts/AuthProvider';

type Props = {
  authorId: string;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

function ItemControls({ authorId, onEdit, onDelete }: Props) {
  const { t } = useIntl();
  const { user } = useAuth();

  if (authorId !== user?.id) {
    return null;
  }

  return (
    <>
      {'|'}
      <button className="primary ghost" onClick={() => onEdit()}>
        {t('COMMON.EDIT')}
      </button>
      <button className="error ghost" onClick={onDelete}>
        {t('COMMON.DELETE')}
      </button>
    </>
  );
}

export default ItemControls;
