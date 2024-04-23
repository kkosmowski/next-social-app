import useIntl from '@/app/hooks/useIntl';
import Backdrop from '@/components/Backdrop';
import type { ConfirmationCallbacks, ConfirmationData } from '../types';

import styles from './ConfirmationModal.module.css';

function ConfirmationModal({ data, onConfirm, onCancel }: { data: ConfirmationData } & ConfirmationCallbacks) {
  const { title, description, submitLabel = 'COMMON.CONFIRM', cancelLabel = 'COMMON.CANCEL' } = data;
  const { t } = useIntl();

  return (
    <Backdrop background>
      <aside className={styles.modal}>
        <h2 className={styles.title}>{t(title)}</h2>
        <p className={styles.description}>{t(description)}</p>

        <footer className={styles.footer}>
          <button className="primary filled" onClick={onConfirm}>
            {t(submitLabel)}
          </button>
          <button className="secondary" onClick={onCancel}>
            {t(cancelLabel)}
          </button>
        </footer>
      </aside>
    </Backdrop>
  );
}

export default ConfirmationModal;
