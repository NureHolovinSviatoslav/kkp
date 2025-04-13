import { useQuery } from "react-query";
import { Location } from "../types/Location";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useLocationQuery = (id?: string) => {
  return useQuery({
    queryKey: ["location", id],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `locations${id ? `/${id}` : ""}`,
        "GET",
      )) as Location[] | Location;

      return Array.isArray(data) ? data : [data];
    },
  });
};
