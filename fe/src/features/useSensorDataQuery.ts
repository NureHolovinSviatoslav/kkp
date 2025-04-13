import { useQuery } from "react-query";
import { SensorData } from "../types/SensorData";
import { fetchAbstract } from "../utils/fetchAbstract";

export const useSensorDataQuery = (id?: string) => {
  return useQuery({
    queryKey: ["sensor_data", id],
    queryFn: async () => {
      const data = (await fetchAbstract(
        `sensorData${id ? `/${id}` : ""}`,
        "GET",
      )) as SensorData[] | SensorData;

      return Array.isArray(data) ? data : [data];
    },
  });
};
