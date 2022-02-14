import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    const userRole = roles.find((role) => role === user.role);
    if (!userRole) throw new UnauthorizedException();
    return true;
  }
}
