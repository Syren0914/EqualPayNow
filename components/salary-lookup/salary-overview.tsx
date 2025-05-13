"use client"

import { ArrowDown, ArrowUp, Info } from "lucide-react"
import { useState, useEffect, use } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"



export default function SalaryOverview({
  jobTitle,
  location,
}: {
  jobTitle: string
  location: string
}) {
    const [data, setData] = useState<null | {
    averageSalary: number
    medianSalary: number
    salaryRange: [number, number]
    genderGap: number
    submissions: number
    trend: number
  }>(null)
  useEffect(() => {
  const fetchOverview = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/salaries?job=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`
      );
      const json = await res.json();
      const item = Array.isArray(json) ? json[0] : json;

      if (!item) return;

      console.log("Salary Overview Data:", item);

      setData({
        averageSalary: item.averageSalary ?? 0,
        medianSalary: item.medianSalary ?? 0,
        salaryRange: Array.isArray(item.salaryRange) ? item.salaryRange : [0, 0],
        genderGap: item.genderGap ?? 0,
        submissions: item.count ?? 0,
        trend: item.trend ?? 0,
      });
    } catch (err) {
      console.error("Error fetching salary overview:", err);
    }
  };

  fetchOverview();
}, [jobTitle, location]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }
  

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <>
      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Average Salary</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Average salary based on {data.submissions} anonymous submissions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{formatCurrency(data.averageSalary)}</p>
                <p className="text-sm text-muted-foreground">per year</p>
              </div>
              <div className={`flex items-center ${data.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                {data.trend > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span className="text-sm font-medium">{Math.abs(data.trend)}%</span>
                <span className="text-xs ml-1">YoY</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Salary Range</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">10th to 90th percentile range of reported salaries</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">10th</span>
                <span className="text-sm text-muted-foreground">50th</span>
                <span className="text-sm text-muted-foreground">90th</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full mb-2">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    left: "0%",
                    width: "100%",
                    opacity: 0.3,
                  }}
                />
                <div
                  className="absolute h-4 w-1 bg-primary top-1/2 -translate-y-1/2"
                  style={{
                    left: "50%",
                  }}
                />
              </div>
              <div className="flex justify-between">
                {Array.isArray(data.salaryRange) && data.salaryRange.length === 2 && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{formatCurrency(data.salaryRange[0])}</span>
                    <span className="text-sm font-medium">{formatCurrency(data.medianSalary)}</span>
                    <span className="text-sm font-medium">{formatCurrency(data.salaryRange[1])}</span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Gender Pay Gap</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Women earn this percentage less than men in this role on average</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <p className="text-2xl font-bold text-rose-500">{data.genderGap}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Females earn {data.genderGap}% less on average than males in this role
              </p>
            </div>
            <div className="pt-2">
              <div className="text-xs text-muted-foreground flex justify-between mb-1">
                <span>Industry Average: 18%</span>
                <span className="text-green-500 font-medium">Better than average</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full">
                <div
                  className="absolute h-full bg-rose-500 rounded-full"
                  style={{ width: `${(data.genderGap / 25) * 100}%` }}
                />
                <div
                  className="absolute h-4 w-1 bg-muted-foreground top-1/2 -translate-y-1/2"
                  style={{ left: `${(18 / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
