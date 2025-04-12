import { useQuery } from "react-query";
import { Report } from "../types/Report";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useReportQuery = (id: string) => {
  return useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `locations${id}/report`,
        "GET",
      )) as Report;

      return data;
    },
  });
};
