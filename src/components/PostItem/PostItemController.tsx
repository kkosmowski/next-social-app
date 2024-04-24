'use client';

import { useState } from 'react';

import type { Post } from '@/types/post';

import PostItem from './PostItem';
import PostItemEditor from './PostItemEditor';

function PostItemController(props: Post) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditMode) {
    return <PostItemEditor onClose={() => setIsEditMode(false)} {...props} />;
  }

  return <PostItem onEdit={() => setIsEditMode(true)} {...props} />;
}

export default PostItemController;
