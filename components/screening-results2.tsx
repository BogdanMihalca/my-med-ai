"use client";

import { map } from "lodash";
import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import { PatientData } from "@/app/patient/page";

interface ScreeningResultsProps {
  result?: PatientData;
  ready: boolean | null;
}

const ScreeningResults2: FC<ScreeningResultsProps> = ({ result, ready }) => {
  console.log("ready---> ", ready);
  console.log("ready === false---> ", ready === false);

  const chartConfig = map(
    result?.possible_diseases,
    (value: { label: any; score: number }, key: number) => ({
      [value.label]: {
        label: value.label,
        score: (value.score * 100).toFixed(2),
        color: `hsl(var(--chart-${key + 1}))`,
      },
    })
  ).reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {
    score: {
      label: "Score",
    },
  }) as ChartConfig;

  const chartData = map(
    result?.possible_diseases,
    (value: { label: any; score: number }, i: number) => ({
      category: value.label,
      label: value.label,
      labelScore: (value.score * 100).toFixed(2) + "%",
      score: value.score.toFixed(2),
      fill: `hsl(var(--chart-${i + 1}))`,
    })
  );

  return (
    <div className="flex items-stretch justify-start mt-4 md:mt-0 ml-8">
      {ready === false ? (
        <div className="flex flex-col align-middle justify-center max-w-[400px]">
          <Skeleton className="w-[350px] h-4 my-6" />
          <Skeleton className="w-[350px] h-4 my-6" />
          <Skeleton className="text-md text-orange-500">
            Doing in depth diagnosis.... This might take a few seconds.
          </Skeleton>
          <Skeleton className="w-[350px] h-4 my-6" />
          <Skeleton className="w-[350px] h-4 my-6" />
        </div>
      ) : ready === null || !result ? (
        <div className="flex items-center justify-center md:p-10 lg:p-20"></div>
      ) : (
        <div className="flex flex-col md:flex-row justify-start align-baseline">
          <Card className="rounded-md overflow-hidden mb-5">
            <CardHeader>
              <p className="text-md text-orange-500">In depth diagnosis</p>
              <p className="text-sm text-muted-foreground">
                This diagnosis might be more accurate than the preliminary
                diagnosis. Please consult a medical professional for accurate
                diagnosis.
              </p>
            </CardHeader>
            <CardContent className=" pt-2 bg-neutral-950/50 pb-7">
              <ChartContainer
                config={chartConfig}
                className="mx-auto max-h-[200px]"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig[value as keyof typeof chartConfig]
                        ?.label as string
                    }
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `${value * 100}%`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        formatter={(value: any) => `${value * 100}%`}
                      />
                    }
                  />
                  <Bar
                    dataKey="score"
                    strokeWidth={2}
                    radius={8}
                    activeIndex={5}
                    activeBar={({ ...props }) => {
                      return (
                        <Rectangle
                          {...props}
                          fillOpacity={0.8}
                          stroke={props.payload.fill}
                          strokeDasharray={4}
                          strokeDashoffset={4}
                        />
                      );
                    }}
                  >
                    <LabelList
                      dataKey="score"
                      position="top"
                      offset={8}
                      className="fill-foreground"
                      fontSize={12}
                      formatter={(value: number) =>
                        `${(value * 100).toFixed(1)}%`
                      }
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
              <Separator className="mb-4" />

              <div className="py-4">
                {result?.possible_diseases.map((value, i) => (
                  <div className="border-b-2 py-2 border-gray-400" key={i}>
                    <div key={i} className="flex justify-between items-center">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: `hsl(var(--chart-${i + 1}))`,
                        }}
                      />
                      <span className="text-md text-white text-left flex-1 ml-4">
                        {value.label}
                      </span>
                      <span className="text-md text-white">
                        {(value.score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-sm text-blue-400 text-left flex-1 ml-4 mt-4">
                      References:
                    </p>
                    {value.references.map((ref, index) => (
                      <p
                        key={index}
                        className="text-sm text-muted-foreground text-left flex-1 ml-4 flex justify-between mt-2"
                      >
                        - {ref}{" "}
                        <a
                          href={`
                        https://www.google.com/search?q=${ref.replace(
                          / /g,
                          "+"
                        )}x
                        `}
                          target="_blank"
                          className="text-blue-400 w-[200px] text-right"
                        >
                          🔍 Find out more
                        </a>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ScreeningResults2;
