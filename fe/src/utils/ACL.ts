import { UserRole } from "../types/User";

export const ACL = {
  users: { allowedRoles: [UserRole.Admin] },
} satisfies Record<string, { allowedRoles: UserRole[] }>;
