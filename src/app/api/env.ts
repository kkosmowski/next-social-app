import ensureVariable from '@/utils/ensureVariable';

export const POCKETBASE_URL = ensureVariable('POCKETBASE_URL', process.env.POCKETBASE_URL);
