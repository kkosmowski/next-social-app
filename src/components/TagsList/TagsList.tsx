import PostTag from '../PostTag';
import type { Locale } from '@/types/i18n';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';

import styles from './TagsList.module.css';

type Props = {
  locale: Locale;
  tags: string[];
};
function TagsList({ locale, tags }: Props) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {tags.map((tagName) => (
        <PostTag key={tagName} tagName={tagName} link={dynamicRoute(Routes.taggedPosts, { locale, tagName })} />
      ))}
    </ul>
  );
}

export default TagsList;
