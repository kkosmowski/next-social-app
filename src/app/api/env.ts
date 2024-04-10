import ensureVariable from '@/utils/ensureVariable';

export const POCKETBASE_URL = ensureVariable('NEXT_PUBLIC_POCKETBASE_URL', process.env.NEXT_PUBLIC_POCKETBASE_URL);
