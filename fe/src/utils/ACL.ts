import { UserRole } from "../types/User";

export const ACL = {
  users: { allowedRoles: [UserRole.Admin] },
  locations: { allowedRoles: [UserRole.Admin] },
  locationItems: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
  vaccines: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
  notifications: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
  sensorData: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
  reports: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
  graphs: { allowedRoles: [UserRole.Admin, UserRole.Staff] },
} satisfies Record<string, { allowedRoles: UserRole[] }>;
