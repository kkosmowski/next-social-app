import type { PropsWithChildren } from '@/types/common';

async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default RootLayout;
