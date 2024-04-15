import PostTag from '../PostTag';

import styles from './TagsList.module.css';

type Props = {
  tags: string[];
};
async function TagsList({ tags }: Props) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {tags.map((tag) => (
        <PostTag key={tag} name={tag} />
      ))}
    </ul>
  );
}

export default TagsList;
