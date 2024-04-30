import styles from './ItemContent.module.css';

type Props = {
  content: string;
  noSpacing?: boolean;
};

function ItemContent({ content, noSpacing }: Props) {
  const className = noSpacing ? `${styles.content} ${styles.noSpacing}` : styles.content;

  return <p className={className} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default ItemContent;
