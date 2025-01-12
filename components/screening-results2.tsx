"use client";

import { map } from "lodash";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, ExternalLink, Info, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import { PatientData } from "@/app/records/page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScreeningResultsProps {
  result?: PatientData;
  ready: boolean | null;
}

const ScreeningResults2: FC<ScreeningResultsProps> = ({ result, ready }) => {
  const chartConfig = map(result?.possible_diseases, (value, key) => ({
    [value.label]: {
      label: value.label,
      score: (value.score * 100).toFixed(2),
      color: `hsl(var(--chart-${key + 1}))`,
    },
  })).reduce((acc, obj) => ({ ...acc, ...obj }), {
    score: { label: "Score" },
  }) as ChartConfig;

  const chartData = map(result?.possible_diseases, (value, i) => ({
    category: value.label,
    label: value.label,
    labelScore: (value.score * 100).toFixed(2) + "%",
    score: value.score.toFixed(2),
    fill: `hsl(var(--chart-${i + 1}))`,
  }));

  if (ready === false) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 space-y-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div>
              <Skeleton className="h-4 w-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (ready === null || !result) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4"
    >
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl text-orange-500 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Comprehensive Analysis
            </CardTitle>
            <Badge
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white
            "
            >
              AI-Powered Diagnosis
            </Badge>
          </div>
          <CardDescription className="text-slate-400">
            Advanced diagnostic analysis based on provided symptoms and medical
            history. Please consult healthcare professionals for accurate
            diagnosis.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "currentColor", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value * 100}%`}
                    tick={{ fill: "currentColor", fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    <LabelList
                      dataKey="score"
                      position="top"
                      formatter={(value: number) =>
                        `${(value * 100).toFixed(1)}%`
                      }
                      fill="currentColor"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>

          <Separator className="bg-slate-700" />

          <ScrollArea className="h-[400px] pr-4">
            <AnimatePresence mode="sync">
              {result.possible_diseases.map((disease, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="border-b border-slate-700 py-4 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
                    />
                    <span className="text-lg text-slate-200 flex-1">
                      {disease.label}
                    </span>
                    <Badge variant="outline">
                      {(disease.score * 100).toFixed(1)}%
                    </Badge>
                  </div>

                  <div className="ml-6 space-y-2">
                    <p className="text-sm text-blue-400 font-medium">
                      References:
                    </p>
                    {disease.references.map((ref, index) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={index}
                        className="flex items-center justify-between gap-4 text-sm text-slate-400"
                      >
                        <span>• {ref}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?q=${encodeURIComponent(
                                ref
                              )}`,
                              "_blank"
                            )
                          }
                        >
                          <Search className="h-4 w-4 mr-1" />
                          Learn More
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScreeningResults2;
