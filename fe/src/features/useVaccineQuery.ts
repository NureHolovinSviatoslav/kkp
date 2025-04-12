import { useQuery } from "react-query";
import { Vaccine } from "../types/Vaccine";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useVaccineQuery = (id?: string) => {
  return useQuery({
    queryKey: ["vaccine"],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `vaccines${id ? `/${id}` : ""}`,
        "GET",
      )) as Vaccine[] | Vaccine;

      return Array.isArray(data) ? data : [data];
    },
  });
};
