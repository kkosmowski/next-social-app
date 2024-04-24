'use client';

type Props = {
  disabled?: boolean;
};

function ShareButton({ disabled }: Props) {
  return <button disabled={disabled}>Share</button>;
}

export default ShareButton;
