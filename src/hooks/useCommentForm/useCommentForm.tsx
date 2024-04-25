import type { FormEvent, ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import getFormData from '@/utils/getFormData';
import type { AddCommentPayload, CommentFormValues } from '@/types/comment';
import type { FormErrors } from '@/types/common';
import TextArea from '@/components/TextArea';
import useIntl from '@/app/hooks/useIntl';

import styles from './useCommentForm.module.css';

const initialErrors: FormErrors<AddCommentPayload> = {
  content: undefined,
  global: undefined,
};

type Options = {
  initialValues?: CommentFormValues;
};

const initialValues = {
  content: '',
};

function useCommentForm(options?: Options) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors<CommentFormValues>>(initialErrors);
  const [values, setValues] = useState<CommentFormValues>(options?.initialValues ?? initialValues);
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
    async (event: FormEvent, callback: (payload: AddCommentPayload) => Promise<unknown>) => {
      setIsLoading(true);
      event.preventDefault();

      const formData = getFormData<CommentFormValues>(event.target);

      if (formData?.errors) {
        setErrors(formData.errors);
        setIsLoading(false);
        return;
      }

      if (!formData?.data) {
        setIsLoading(false);
        return;
      }

      const payload: AddCommentPayload = {
        content: formData.data.content.trim(),
      };

      await callback(payload);
      setIsLoading(false);
    },
    [setErrors, setIsLoading],
  );

  const resetErrors = useCallback(() => {
    setErrors(initialErrors);
  }, [setErrors]);

  const resetForm = useCallback(() => {
    setValues(options?.initialValues ?? initialValues);
  }, [setValues]);

  const ContentTextArea = useMemo(
    () => (
      <TextArea
        label={t('COMMENTS.ADD.LABEL')}
        name="content"
        value={values.content}
        onChange={handleChange}
        minLength={2}
        placeholder={t('COMMENTS.ADD.PLACEHOLDER')}
        className={styles.textarea}
        error={errors?.content}
        resize="vertical"
        required
        labelHidden
      />
    ),
    [values.content, handleChange, errors, t],
  );

  return {
    values,
    isLoading,
    errors,
    handleSubmit,
    handleChange,
    resetErrors,
    resetForm,
    endLoading: () => setIsLoading(false),
    setErrors,
    ContentTextArea,
  };
}

export default useCommentForm;
