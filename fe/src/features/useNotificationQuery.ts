import { useQuery } from "react-query";
import { Notification } from "../types/Notification";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useNotificationQuery = (id?: string) => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `notifications${id ? `/${id}` : ""}`,
        "GET",
      )) as Notification[] | Notification;

      return Array.isArray(data) ? data : [data];
    },
  });
};
