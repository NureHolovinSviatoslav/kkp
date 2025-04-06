import { useQuery } from "react-query";
import { fetchAbstract } from "../utils/fetchAbstract";
import { User, UserRole } from "../types/User";
import { toEnum } from "../utils/toEnum";

export const useUserQuery = (username?: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const _user = (await fetchAbstract(
        `users${username ? `/${username}` : ""}`,
        "GET",
      )) as User[] | User;
      const users = Array.isArray(_user) ? _user : [_user];

      return users.map((user) => ({
        ...user,
        role: toEnum(user.role ?? "", UserRole) || null,
      })) as User[];
    },
  });
};
