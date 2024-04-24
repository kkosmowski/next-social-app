'use client';

type Props = {
  disabled?: boolean;
};

function CommentButton({ disabled }: Props) {
  return <button disabled={disabled}>Comment</button>;
}

export default CommentButton;
