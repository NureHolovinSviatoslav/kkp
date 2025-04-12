import { useMutation, useQueryClient } from "react-query";

import { LocationItem } from "../types/LocationItem";
import { fetchAbstract } from "../utils/fetchAbstract";
import { typeToMethod } from "../utils/typeToMethod";

export const useLocationItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      type,
      data,
    }:
      | { type: "create" | "update"; data: LocationItem }
      | { type: "delete"; data: { location_item_id: string } }) => {
      await fetchAbstract(
        `locationItems${type !== "create" ? `/${data.location_item_id}` : ""}`,
        typeToMethod[type],
        data,
      );
    },
    {
      onSuccess: () => {
        queryClient.resetQueries("location_item");
      },
    },
  );
};
