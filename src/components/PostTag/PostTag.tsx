import Link from 'next/link';

type Props = {
  name: string;
};

function PostTag({ name }: Props) {
  return <Link href="#">#{name}</Link>;
}

export default PostTag;
