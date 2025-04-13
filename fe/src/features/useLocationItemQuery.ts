import { useQuery } from "react-query";
import { LocationItem } from "../types/LocationItem";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useLocationItemQuery = (id?: string) => {
  return useQuery({
    queryKey: ["location_item", id],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `locationItems${id ? `/${id}` : ""}`,
        "GET",
      )) as LocationItem[] | LocationItem;

      return Array.isArray(data) ? data : [data];
    },
  });
};
