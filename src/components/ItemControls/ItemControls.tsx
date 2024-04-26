'use client';

import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

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
        <Edit /> <span className="md-only">{t('COMMON.EDIT')}</span>
      </button>
      <button className="error ghost" onClick={onDelete}>
        <Delete /> <span className="md-only">{t('COMMON.DELETE')}</span>
      </button>
    </>
  );
}

export default ItemControls;
