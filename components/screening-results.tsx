"use client";

import { map, maxBy } from "lodash";
import { FC } from "react";
import { Terminal, PieChart } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "./ui/skeleton";

interface ScreeningResultsProps {
  result:
    | {
        results: {
          label: string;
          score: number;
        }[];
        text: string;
      }
    | undefined;
  ready: boolean | null;
}

const ScreeningResults: FC<ScreeningResultsProps> = ({ result, ready }) => {
  const chartConfig = map(
    result?.results,
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
    result?.results,
    (value: { label: any; score: number }, i: number) => ({
      category: value.label,
      label: value.label,
      labelScore: (value.score * 100).toFixed(2) + "%",
      score: value.score.toFixed(2),
      fill: `hsl(var(--chart-${i + 1}))`,
    })
  );

  const resultedLabel = (maxBy(result?.results, "score") as any)?.label;

  return (
    <div className="flex items-stretch justify-start mt-4 md:mt-0">
      {ready === false ? (
        <div>
          <Skeleton className="w-[250px] h-4 my-6" />
          <Skeleton className="w-[250px] h-4 my-6" />
          <Skeleton className="w-[250px] h-4 my-6" />
          <Skeleton className="w-[250px] h-4 my-6" />
        </div>
      ) : ready === null || !result?.results ? (
        <div className="flex items-center justify-center md:p-10 lg:p-20">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Do you want to check you symptoms</AlertTitle>
            <AlertDescription className="pt-5 flex">
              <PieChart className="h-10 w-10 mr-4" />
              use the right side button
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-start align-baseline">
          <Card className="w-[400px] rounded-md overflow-hidden mb-5">
            <CardHeader>
              <p className="text-md text-orange-500">Preliminary results</p>
              <p className="text-sm text-muted-foreground">
                This might not be accurate at all times and please wait for the
                in depth diagnosis for more details
              </p>
            </CardHeader>
            <CardContent className=" pt-2 bg-neutral-950/50 pb-7">
              <ChartContainer
                config={chartConfig}
                className="mx-auto max-h-[200px]"
              >
                <RadarChart data={chartData}>
                  <ChartTooltip
                    cursor={true}
                    content={
                      <ChartTooltipContent
                        formatter={(value: any) => `${value * 100}%`}
                      />
                    }
                  />
                  <PolarGrid
                    className="opacity-50"
                    gridType="circle"
                    stroke="#ffffff"
                  />
                  <PolarAngleAxis dataKey="category" />
                  <Radar
                    dataKey="score"
                    strokeWidth={3}
                    stroke="#2a41f5"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.9}
                    dot={{
                      r: 2,
                      fillOpacity: 1,
                      fill: "red",
                    }}
                  />
                </RadarChart>
              </ChartContainer>
              <Separator className="mb-4" />

              <div className="py-4">
                {result?.results.map((value, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
                    />
                    <span className="text-sm text-muted-foreground text-left flex-1 ml-4">
                      {value.label}
                    </span>
                    <span>{(value.score * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm border-t-2 pt-2 text-start block">
              <CardDescription className="block my-2">
                <span className="font-bold">Result:</span> {resultedLabel}
              </CardDescription>
              <CardDescription className="block my-2">
                <span className="font-bold">Probability of:</span>{" "}
                {((maxBy(result.results, "score") as any)?.score * 100).toFixed(
                  2
                )}
                %
              </CardDescription>
              <CardDescription className="block my-2">
                {
                  // if in result the label other is greater than .5 show a warning message
                  maxBy(result.results, "score")?.label === "others" &&
                    maxBy(result.results, "score")!.score > 0.5 && (
                      <Alert className="bg-red-900 bg-opacity-1">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription className="pt-5 flex">
                          The result is might not accurate, please consult a
                          medical professional
                        </AlertDescription>
                      </Alert>
                    )
                }
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ScreeningResults;
