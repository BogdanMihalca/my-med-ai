"use client";

import { map, maxBy } from "lodash";
import jsPDF from "jspdf";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, Activity } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateReport } from "@/lib/utils";

interface ScreeningResultsProps {
  result?: {
    results: {
      label: string;
      score: number;
    }[];
    text: string;
  };
  ready: boolean | null;
}

const ScreeningResults: FC<ScreeningResultsProps> = ({ result, ready }) => {
  const chartConfig = map(result?.results, (value, key) => ({
    [value.label]: {
      label: value.label,
      score: (value.score * 100).toFixed(2),
      color: `hsl(var(--chart-${key + 1}))`,
    },
  })).reduce((acc, obj) => ({ ...acc, ...obj }), {
    score: { label: "Score" },
  }) as ChartConfig;

  const chartData = map(result?.results, (value, i) => ({
    category: value.label,
    label: value.label,
    labelScore: (value.score * 100).toFixed(2) + "%",
    score: value.score.toFixed(2),
    fill: `hsl(var(--chart-${i + 1}))`,
  }));

  const highestResult = maxBy(result?.results, "score");
  const resultedLabel = highestResult?.label;
  const isHighRisk = highestResult?.score ?? 0 > 0.7;

  if (ready === false) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 p-6"
      >
        <Skeleton className="w-full lg:w-[300px] h-[200px] rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="w-[250px] h-4" />
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[150px] h-4" />
        </div>
      </motion.div>
    );
  }

  if (ready === null || !result?.results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center p-8"
      >
        <Alert className="max-w-md bg-slate-800/50 border-slate-700">
          <Info className="h-5 w-5 text-blue-400" />
          <AlertTitle className="text-lg font-semibold mb-2">
            Start Your Health Screening
          </AlertTitle>
          <AlertDescription className="flex items-center gap-4 text-slate-300">
            <Activity className="h-12 w-12 text-blue-500" />
            <span>
              Begin your symptom assessment by clicking the screening button on
              the right
            </span>
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-6 p-4"
    >
      <Card className="w-full lg:w-[450px] bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-100">
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered preliminary health assessment
              </CardDescription>
            </div>
            <Badge
              variant={isHighRisk ? "destructive" : "secondary"}
              className="px-3 py-1"
            >
              {isHighRisk ? "High Risk" : "Low Risk"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="bg-slate-900/50 pt-6">
          <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig}>
              <RadarChart data={chartData}>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: any) => `${(value * 100).toFixed(1)}%`}
                    />
                  }
                />
                <PolarGrid
                  className="opacity-30"
                  gridType="circle"
                  stroke="currentColor"
                />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                />
                <Radar
                  dataKey="score"
                  strokeWidth={2}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  dot={{
                    r: 3,
                    fill: "hsl(var(--primary))",
                    strokeWidth: 0,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </ResponsiveContainer>

          <Separator className="my-6" />

          <div className="space-y-3">
            {result.results.map((value, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
                />
                <span className="flex-1 text-sm text-slate-200">
                  {value.label}
                </span>
                <Badge variant="secondary">
                  {(value.score * 100).toFixed(1)}%
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-slate-700 pt-6">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Primary Indication</span>
              <Badge variant="outline" className="text-lg">
                {resultedLabel}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Confidence Score</span>
              <span className="text-lg font-semibold">
                {((highestResult?.score || 0) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <AnimatePresence mode="sync">
            {highestResult?.label === "others" && highestResult.score > 0.5 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert
                  variant="destructive"
                  className="bg-red-900/50 border-red-800 text-red-300"
                >
                  <AlertTriangle className="h-5 w-5 bg-red-300" />
                  <AlertTitle>Medical Attention Recommended</AlertTitle>
                  <AlertDescription>
                    Based on your symptoms, we recommend consulting a healthcare
                    professional for a thorough evaluation.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2 mt-4">
            <Button
              className="flex-1"
              onClick={() => generateReport(result.results)}
            >
              Download Report
            </Button>

            <Button variant="outline">Share Results</Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ScreeningResults;
