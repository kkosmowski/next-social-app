import type { Tag } from '@/types/post';
import PostTag from '../PostTag';

import styles from './TagsList.module.css';

type Props = {
  tags: Tag[];
};
async function TagsList({ tags }: Props) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {tags.map((tag) => (
        <PostTag key={tag.name} name={tag.name} />
      ))}
    </ul>
  );
}

export default TagsList;
