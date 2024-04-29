'use client';

import type { FormEvent } from 'react';

import { useRouter } from 'next/navigation';

import type {
  AddCommentPayload,
  Comment,
  SubComment,
  UpdateCommentPayload,
  UpdateCommentResponse,
} from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import useCommentForm from '@/hooks/useCommentForm';
import useIntl from '@/app/hooks/useIntl';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';

import styles from './CommentItemEditor.module.css';

type Props = (Comment | SubComment) & {
  isSubComment: boolean;
  onClose: VoidFunction;
};

function CommentItemEditor(props: Props) {
  const { id, content, user, created, updated, likes, isSubComment, onClose } = props;
  const { ContentTextArea, isLoading, handleSubmit, endLoading, setErrors } = useCommentForm({
    initialValues: { content },
  });
  const { t, locale } = useIntl();
  const router = useRouter();

  const updateComment = async (payload: AddCommentPayload) => {
    try {
      return api.patch<UpdateCommentPayload, UpdateCommentResponse>(
        dynamicEndpoint(endpoints.comment, { commentId: id }),
        { ...payload, isSubComment },
      );
    } catch (e) {
      const error = handleError(e);
      endLoading();
      setErrors((errors) => ({
        ...errors,
        global: error.message ?? 'ERROR.UNKNOWN',
      }));
    }
  };

  const handleUpdateComment = async (event: FormEvent) => {
    await handleSubmit(event, updateComment);
    onClose();
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleUpdateComment}>
      <ItemDetails locale={locale} created={created} updated={updated} user={user} noControls />
      {ContentTextArea}

      <footer className={styles.controls}>
        <button className="primary filled" type="submit" disabled={isLoading}>
          {t(isLoading ? 'COMMON.LOADING' : 'COMMENTS.EDIT.SUBMIT')}
        </button>

        <button className="secondary" type="button" disabled={isLoading} onClick={onClose}>
          {t('COMMON.CANCEL')}
        </button>
      </footer>

      <CommentActions isSubComment={isSubComment} commentId={id} likes={likes} isEditMode />
    </form>
  );
}

export default CommentItemEditor;
