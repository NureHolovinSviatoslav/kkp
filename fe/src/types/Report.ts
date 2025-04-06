import { LocationItem } from "./LocationItem";
import { SensorData } from "./SensorData";

export type Report = {
  location_id: number;
  name: string;
  address: string;
  location_items: LocationItem[];
  sensor_data: SensorData[];
  used_quantity: number;
};
