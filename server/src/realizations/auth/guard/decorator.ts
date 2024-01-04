import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from 'src/abstractions/user';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IRequestUser;
});
