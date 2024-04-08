import ensureVariable from '@/utils/ensureVariable';

export const API_URL = ensureVariable('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
