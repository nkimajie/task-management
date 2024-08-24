import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
  Type,
} from '@nestjs/common';
import JwtAuthGuard from './jwt-auth.guard';

const RoleGuard = (allowedRoles): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // if (
      //   user?.status == 'SUSPENDED' ||
      //   user?.status == 'DEACTIVATED' ||
      //   user?.deleted
      // ) {
      //   throw new HttpException(
      //     {
      //       statusCode: HttpStatus.UNAUTHORIZED,
      //       name: 'UNAUTHORIZED',
      //       error:
      //         'Account unauthorized to perform action, kindly log out and try again.',
      //     },
      //     HttpStatus.UNAUTHORIZED,
      //   );
      // }

      allowedRoles = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];

      return allowedRoles
        .map((allowedRole) => allowedRole.toUpperCase())
        .includes(user?.userType.toUpperCase());
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
