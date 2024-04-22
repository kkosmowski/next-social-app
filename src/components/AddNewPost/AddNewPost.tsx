'use client';

import type { ChangeEvent, FormEventHandler } from 'react';
import { useState } from 'react';

import useIntl from '@/app/hooks/useIntl';
import TextArea from '@/components/TextArea';
import Input from '@/components/Input';
import type { AddPostPayload } from '@/types/post';
import type { FormErrors } from '@/types/common';

import styles from './AddNewPost.module.css';

type Props = {
  isLoading: boolean;
  errors?: FormErrors<AddPostPayload>;
  onCancel: VoidFunction;
  onSubmit: FormEventHandler;
};

function AddNewPost({ isLoading, errors, onCancel, onSubmit }: Props) {
  const { t } = useIntl();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        autoFocus
        label={t('POSTS.ADD.TITLE.LABEL')}
        name="title"
        value={title}
        onChange={handleTitleChange}
        placeholder={t('POSTS.ADD.TITLE.PLACEHOLDER')}
        error={errors?.title}
        required
      />

      <TextArea
        label={t('POSTS.ADD.CONTENT.LABEL')}
        name="content"
        value={content}
        onChange={handleContentChange}
        minLength={2}
        placeholder={t('POSTS.ADD.CONTENT.PLACEHOLDER')}
        className={styles.textarea}
        error={errors?.content}
        required
      />

      <Input
        label={t('POSTS.ADD.TAGS.LABEL')}
        name="tags"
        value={tags}
        onChange={handleTagsChange}
        placeholder={t('POSTS.ADD.TAGS.PLACEHOLDER')}
        error={errors?.tags}
      />

      <footer className={styles.controls}>
        <button className="primary filled" type="submit" disabled={isLoading}>
          {t(isLoading ? 'COMMON.LOADING' : 'POSTS.ADD.SUBMIT')}
        </button>
        <button className="secondary" type="button" disabled={isLoading} onClick={onCancel}>
          {t('COMMON.CANCEL')}
        </button>
      </footer>
    </form>
  );
}

export default AddNewPost;
