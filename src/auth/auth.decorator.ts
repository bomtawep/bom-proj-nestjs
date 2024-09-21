import { SetMetadata } from '@nestjs/common';
import { Role } from '~/constants/enum';
import { IS_PUBLIC_KEY } from '~/constants/const';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);