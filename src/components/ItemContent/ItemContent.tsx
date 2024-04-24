import styles from './ItemContent.module.css';

type Props = {
  content: string;
  smallPadding?: boolean;
};

function ItemContent({ content, smallPadding }: Props) {
  const className = smallPadding ? `${styles.content} ${styles.smallPadding}` : styles.content;

  return <p className={className} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default ItemContent;
