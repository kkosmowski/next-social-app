import styles from './Backdrop.module.css';

type Props = {
  onClick: VoidFunction;
};

function Backdrop({ onClick }: Props) {
  return <div className={styles.backdrop} onClick={() => onClick()} />;
}

export default Backdrop;
