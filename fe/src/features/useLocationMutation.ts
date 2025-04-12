import { useMutation, useQueryClient } from "react-query";

import { Location } from "../types/Location";
import { fetchAbstract } from "../utils/fetchAbstract";
import { typeToMethod } from "../utils/typeToMethod";

export const useLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      type,
      data,
    }:
      | { type: "create" | "update"; data: Location }
      | { type: "delete"; data: { location_id: string } }) => {
      await fetchAbstract(
        `locations${type !== "create" ? `/${data.location_id}` : ""}`,
        typeToMethod[type],
        data,
      );
    },
    {
      onSuccess: () => {
        queryClient.resetQueries("location");
      },
    },
  );
};
