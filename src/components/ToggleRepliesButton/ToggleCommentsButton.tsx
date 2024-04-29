'use client';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import useIntl from '@/app/hooks/useIntl';
import type { TranslationKey } from '@/types/i18n';

import styles from './ToggleRepliesButton.module.css';

type Props = {
  visible?: boolean;
  subComments?: boolean;
  count?: number;
  onToggle?: VoidFunction;
};

function ToggleCommentsButton({ visible, subComments, count, onToggle }: Props) {
  const { t } = useIntl();

  const hideLabel: TranslationKey = subComments ? 'COMMON.HIDE_REPLIES' : 'COMMON.HIDE_COMMENTS';
  const showLabel: TranslationKey = subComments ? 'COMMON.SHOW_REPLIES' : 'COMMON.SHOW_COMMENTS';
  const Icon = visible ? ArrowDropDown : ArrowDropUp;

  const label = t(visible ? hideLabel : showLabel, { count });

  return (
    <button className={`ghost ${styles.button}`} onClick={onToggle}>
      <Icon />
      {label}
    </button>
  );
}

export default ToggleCommentsButton;
