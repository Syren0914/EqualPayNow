"use client"

import { ArrowDown, ArrowUp, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data - in a real app, this would come from an API
const getSalaryData = (jobTitle: string, location: string) => {
  // This is just sample data - would be replaced with actual API call
  const baseData = {
    "Software Engineer": {
      avgSalary: 120500,
      medianSalary: 115000,
      salaryRange: [85000, 165000],
      genderGap: 14,
      submissions: 1250,
      trend: 3.5,
    },
    "Product Manager": {
      avgSalary: 135800,
      medianSalary: 130000,
      salaryRange: [95000, 180000],
      genderGap: 12,
      submissions: 980,
      trend: 4.2,
    },
    "Data Scientist": {
      avgSalary: 128300,
      medianSalary: 125000,
      salaryRange: [90000, 170000],
      genderGap: 11,
      submissions: 875,
      trend: 5.8,
    },
    "UX Designer": {
      avgSalary: 105200,
      medianSalary: 100000,
      salaryRange: [75000, 140000],
      genderGap: 9,
      submissions: 720,
      trend: 2.7,
    },
  }[jobTitle] || {
    avgSalary: 95000,
    medianSalary: 92000,
    salaryRange: [65000, 130000],
    genderGap: 15,
    submissions: 500,
    trend: 2.1,
  }

  // Apply a location modifier
  const locationModifier =
    {
      "United States": 1,
      "United Kingdom": 0.8,
      Canada: 0.85,
      Australia: 0.9,
      Germany: 0.82,
      France: 0.78,
      Global: 0.75,
    }[location] || 1

  return {
    ...baseData,
    avgSalary: Math.round(baseData.avgSalary * locationModifier),
    medianSalary: Math.round(baseData.medianSalary * locationModifier),
    salaryRange: [
      Math.round(baseData.salaryRange[0] * locationModifier),
      Math.round(baseData.salaryRange[1] * locationModifier),
    ],
  }
}

export default function SalaryOverview({
  jobTitle,
  location,
}: {
  jobTitle: string
  location: string
}) {
  const data = getSalaryData(jobTitle, location)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
                <p className="text-3xl font-bold">{formatCurrency(data.avgSalary)}</p>
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
                <span className="text-sm font-medium">{formatCurrency(data.salaryRange[0])}</span>
                <span className="text-sm font-medium">{formatCurrency(data.medianSalary)}</span>
                <span className="text-sm font-medium">{formatCurrency(data.salaryRange[1])}</span>
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
