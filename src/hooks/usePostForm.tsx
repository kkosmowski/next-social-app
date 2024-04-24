import type { FormEvent, ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import getFormData from '@/utils/getFormData';
import type { AddPostPayload, PostFormValues } from '@/types/post';
import type { FormErrors } from '@/types/common';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import useIntl from '@/app/hooks/useIntl';

import styles from './usePostForm.module.css';

const initialErrors: FormErrors<AddPostPayload> = {
  title: undefined,
  content: undefined,
  tags: undefined,
  global: undefined,
};

type Options = {
  initialValues?: PostFormValues;
  ghostInputs?: boolean;
};

function usePostForm(options?: Options) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors<PostFormValues>>(initialErrors);
  const [values, setValues] = useState<PostFormValues>(
    options?.initialValues ?? {
      title: '',
      content: '',
      tags: '',
    },
  );
  const { t } = useIntl();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((values) => ({
        ...values,
        [e.target.name]: e.target.value,
      }));
    },
    [setValues],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent, callback: (payload: AddPostPayload) => Promise<unknown>) => {
      setIsLoading(true);
      event.preventDefault();

      const formData = getFormData<PostFormValues>(event.target);

      if (formData?.errors) {
        setErrors(formData.errors);
        setIsLoading(false);
        return;
      }

      if (!formData?.data) {
        setIsLoading(false);
        return;
      }

      const payload: AddPostPayload = {
        title: formData.data.title,
        content: formData.data.content,
        tags: formData.data.tags ? formData.data.tags.split(/,\s?/g) : [],
      };

      await callback(payload);
      setIsLoading(false);
    },
    [setErrors, setIsLoading],
  );

  const resetErrors = useCallback(() => {
    setErrors(initialErrors);
  }, [setErrors]);

  const TitleInput = useMemo(
    () => (
      <Input
        autoFocus
        label={t('POSTS.FORM.TITLE.LABEL')}
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder={t('POSTS.FORM.TITLE.PLACEHOLDER')}
        error={errors?.title}
        required
        labelHidden={options?.ghostInputs}
        ghost={options?.ghostInputs}
      />
    ),
    [values.title, handleChange, errors, options?.ghostInputs, t],
  );

  const ContentTextArea = useMemo(
    () => (
      <TextArea
        label={t('POSTS.FORM.CONTENT.LABEL')}
        name="content"
        value={values.content}
        onChange={handleChange}
        minLength={2}
        placeholder={t('POSTS.FORM.CONTENT.PLACEHOLDER')}
        className={styles.textarea}
        error={errors?.content}
        required
        labelHidden={options?.ghostInputs}
        ghost={options?.ghostInputs}
      />
    ),
    [values.content, handleChange, errors, options?.ghostInputs, t],
  );

  const TagsInput = useMemo(
    () => (
      <Input
        label={t('POSTS.FORM.TAGS.LABEL')}
        name="tags"
        value={values.tags}
        onChange={handleChange}
        placeholder={t('POSTS.FORM.TAGS.PLACEHOLDER')}
        error={errors?.tags}
        labelHidden={options?.ghostInputs}
        ghost={options?.ghostInputs}
      />
    ),
    [values.tags, handleChange, errors, options?.ghostInputs, t],
  );

  return {
    values,
    isLoading,
    errors,
    handleSubmit,
    handleChange,
    resetErrors,
    endLoading: () => setIsLoading(false),
    setErrors,
    TitleInput,
    ContentTextArea,
    TagsInput,
  };
}

export default usePostForm;
