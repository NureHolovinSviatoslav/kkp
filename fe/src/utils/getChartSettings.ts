/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisClasses } from "@mui/x-charts";

export const ChartSettings = {
  datePreset: {
    min: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
    max: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getTime(),
    label: "Дата",
    valueFormatter: (unixTime: string) => {
      const data = new Date(unixTime);
      const str = data.toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const date = str.split(".");

      return date[0];
    },
  },
};

export const getChartSettings = ({
  yAxisLabel,
  yAxisMin,
  yAxisMax,
  yAxisValueFormatter,

  xAxisLabel,
  xAxisMin,
  xAxisMax,
  xAxisValueFormatter,
}: {
  yAxisLabel?: string;
  yAxisMin?: unknown;
  yAxisMax?: unknown;
  yAxisValueFormatter?: (value: any) => string;

  xAxisLabel?: string;
  xAxisMin?: unknown;
  xAxisMax?: unknown;
  xAxisValueFormatter?: (value: any) => string;
}) => {
  return {
    width: 1200,
    height: 450,
    yAxis: [
      {
        label: yAxisLabel,
        min: yAxisMin,
        max: yAxisMax,
        valueFormatter: yAxisValueFormatter,
      },
    ],
    xAxis: [
      {
        min: xAxisMin,
        max: xAxisMax,
        label: xAxisLabel,
        valueFormatter: xAxisValueFormatter,
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-7px, 0)",
      },
    },
  };
};
