import type { ServerComponentProps } from '@/types/common';

async function EditProfilePage({ params }: ServerComponentProps) {
  console.log(params);
  return (
    <section>
      <h2>Edit Profile page</h2>
      <p>Hello</p>
    </section>
  );
}

export default EditProfilePage;
