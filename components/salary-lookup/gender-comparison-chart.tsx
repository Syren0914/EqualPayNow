"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - in a real app, this would come from an API
const getGenderData = (jobTitle: string) => {
  // This is just sample data - would be replaced with actual API call
  const baseData = {
    "Software Engineer": {
      salaryByGender: [
        { gender: "Male", salary: 128000 },
        { gender: "Female", salary: 110000 },
        { gender: "Non-binary", salary: 118000 },
      ],
      salaryByExperience: [
        { experience: "0-2 years", male: 95000, female: 88000, nonBinary: 90000 },
        { experience: "3-5 years", male: 120000, female: 105000, nonBinary: 112000 },
        { experience: "6-10 years", male: 145000, female: 125000, nonBinary: 135000 },
        { experience: "10+ years", male: 175000, female: 145000, nonBinary: 160000 },
      ],
      bonusByGender: [
        { gender: "Male", bonus: 15000 },
        { gender: "Female", bonus: 12000 },
        { gender: "Non-binary", bonus: 13500 },
      ],
    },
    "Product Manager": {
      salaryByGender: [
        { gender: "Male", salary: 142000 },
        { gender: "Female", salary: 125000 },
        { gender: "Non-binary", salary: 132000 },
      ],
      salaryByExperience: [
        { experience: "0-2 years", male: 110000, female: 100000, nonBinary: 105000 },
        { experience: "3-5 years", male: 135000, female: 120000, nonBinary: 128000 },
        { experience: "6-10 years", male: 160000, female: 140000, nonBinary: 150000 },
        { experience: "10+ years", male: 190000, female: 165000, nonBinary: 175000 },
      ],
      bonusByGender: [
        { gender: "Male", bonus: 20000 },
        { gender: "Female", bonus: 16000 },
        { gender: "Non-binary", bonus: 18000 },
      ],
    },
  }[jobTitle] || {
    salaryByGender: [
      { gender: "Male", salary: 100000 },
      { gender: "Female", salary: 85000 },
      { gender: "Non-binary", salary: 92000 },
    ],
    salaryByExperience: [
      { experience: "0-2 years", male: 75000, female: 68000, nonBinary: 72000 },
      { experience: "3-5 years", male: 95000, female: 82000, nonBinary: 88000 },
      { experience: "6-10 years", male: 115000, female: 98000, nonBinary: 105000 },
      { experience: "10+ years", male: 140000, female: 118000, nonBinary: 130000 },
    ],
    bonusByGender: [
      { gender: "Male", bonus: 10000 },
      { gender: "Female", bonus: 8000 },
      { gender: "Non-binary", bonus: 9000 },
    ],
  }

  return baseData
}

export default function GenderComparisonChart({ jobTitle }: { jobTitle: string }) {
  const [chartView, setChartView] = useState("overall")
  const data = getGenderData(jobTitle)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <Tabs value={chartView} onValueChange={setChartView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="experience">By Experience</TabsTrigger>
          <TabsTrigger value="bonus">Bonuses</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartView === "overall" ? (
            <BarChart data={data.salaryByGender} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gender" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), "Salary"]} />
              <Legend />
              <Bar dataKey="salary" name="Average Salary" fill="#8884d8" />
            </BarChart>
          ) : chartView === "experience" ? (
            <BarChart data={data.salaryByExperience} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="experience" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), ""]} />
              <Legend />
              <Bar dataKey="male" name="Male" fill="#3b82f6" />
              <Bar dataKey="female" name="Female" fill="#ec4899" />
              <Bar dataKey="nonBinary" name="Non-binary" fill="#8884d8" />
            </BarChart>
          ) : (
            <BarChart data={data.bonusByGender} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gender" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), "Bonus"]} />
              <Legend />
              <Bar dataKey="bonus" name="Average Bonus" fill="#10b981" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Key Insights</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 mr-2"></span>
                <span>
                  Women earn {Math.round((1 - data.salaryByGender[1].salary / data.salaryByGender[0].salary) * 100)}%
                  less than men in {jobTitle} roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                <span>
                  The gap widens with experience level, reaching{" "}
                  {Math.round((1 - data.salaryByExperience[3].female / data.salaryByExperience[3].male) * 100)}% at
                  senior levels
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>
                  Bonus compensation shows a similar pattern with a{" "}
                  {Math.round((1 - data.bonusByGender[1].bonus / data.bonusByGender[0].bonus) * 100)}% gap
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">What This Means</h3>
            <p className="text-sm text-muted-foreground">
              The data shows a persistent gender pay gap across all experience levels for {jobTitle} positions. The gap
              is smallest at entry-level positions but widens significantly as careers progress, suggesting potential
              issues with promotion rates or salary negotiations. Companies committed to pay equity should examine their
              compensation practices, especially for experienced professionals.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
