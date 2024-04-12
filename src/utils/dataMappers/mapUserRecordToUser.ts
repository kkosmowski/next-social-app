import type { RecordModel } from 'pocketbase';

import { POCKETBASE_URL } from '@/app/api/env';
import type { User } from '@/types/auth';

function buildAvatarUrl(record: RecordModel) {
  return POCKETBASE_URL + '/api/files/' + record.collectionName + '/' + record.id + '/' + record.avatar;
}

function mapUserRecordToUser(record: RecordModel): User {
  return {
    id: record.id,
    created: record.created,
    email: record.email,
    username: record.username,
    verified: record.verified,
    avatarUrl: buildAvatarUrl(record),
    status: record.status,
    about: record.about,
  };
}

export default mapUserRecordToUser;
