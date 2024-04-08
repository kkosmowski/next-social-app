import type { User, UserModel } from '@/types/auth';

const mapUserModelToUser = (model: UserModel): User => ({ ...model, created: new Date(model.created) });

export default mapUserModelToUser;
