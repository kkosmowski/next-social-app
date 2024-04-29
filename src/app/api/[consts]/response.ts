import { NextResponse } from 'next/server';

import { ERROR_NOT_LOGGED_IN } from '@/consts/auth';
import { HttpStatus } from '@/consts/api';
import { ERROR_FORBIDDEN_ACTION, ERROR_INVALID_PAYLOAD, ERROR_UNKNOWN } from '@/consts/common';

const response = {
  // 204
  noContent: new NextResponse(undefined, { status: HttpStatus.NoContent }),

  // 400
  badRequest: <P>(fields: (keyof P)[]) =>
    NextResponse.json(
      { error: `Invalid payload fields: ${fields.join(', ')}.`, code: ERROR_INVALID_PAYLOAD },
      { status: HttpStatus.BadRequest },
    ),

  // 401
  unauthorized: NextResponse.json(
    { error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN },
    { status: HttpStatus.Unauthorized },
  ),

  // 403
  forbidden: NextResponse.json(
    { error: 'Forbidden action. Lack of permissions.', code: ERROR_FORBIDDEN_ACTION },
    { status: HttpStatus.Forbidden },
  ),

  // 500
  unknownError: (e: unknown) =>
    NextResponse.json({ error: e, code: ERROR_UNKNOWN }, { status: HttpStatus.InternalServerError }),
};

export default response;
