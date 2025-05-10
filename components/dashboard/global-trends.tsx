"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "@/components/ui/chart"

export default function GlobalTrends() {
  // Sample data for gender pay gap by industry
  const industryData = [
    { industry: "Tech", male: 120000, female: 102000, gap: 15 },
    { industry: "Finance", male: 110000, female: 88000, gap: 20 },
    { industry: "Healthcare", male: 95000, female: 85000, gap: 10.5 },
    { industry: "Education", male: 75000, female: 70000, gap: 6.7 },
    { industry: "Retail", male: 65000, female: 55000, gap: 15.4 },
    { industry: "Manufacturing", male: 80000, female: 68000, gap: 15 },
  ]

  // Sample data for gender pay gap by country
  const countryData = [
    { country: "United States", gap: 18 },
    { country: "United Kingdom", gap: 15.5 },
    { country: "Canada", gap: 13.3 },
    { country: "Australia", gap: 14 },
    { country: "Germany", gap: 18.3 },
    { country: "France", gap: 15.8 },
    { country: "Japan", gap: 23.5 },
  ]

  // Sample data for pay gap over time
  const timeData = [
    { year: "2010", gap: 23 },
    { year: "2012", gap: 21.5 },
    { year: "2014", gap: 20.3 },
    { year: "2016", gap: 19.1 },
    { year: "2018", gap: 18.5 },
    { year: "2020", gap: 18 },
    { year: "2022", gap: 17.3 },
    { year: "2024", gap: 16.8 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Gender Pay Gap by Industry</CardTitle>
          <CardDescription>Average salary comparison between genders across different industries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, ""]} labelFormatter={(label) => `Industry: ${label}`} />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#3b82f6" />
                <Bar dataKey="female" name="Female" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gender Pay Gap by Country</CardTitle>
          <CardDescription>Percentage difference in average pay between genders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 25]} />
                <YAxis type="category" dataKey="country" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, "Gap"]} labelFormatter={(label) => `Country: ${label}`} />
                <Bar dataKey="gap" name="Pay Gap %" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gender Pay Gap Over Time</CardTitle>
          <CardDescription>Historical trend of the gender pay gap percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[15, 25]} />
                <Tooltip formatter={(value) => [`${value}%`, "Gap"]} labelFormatter={(label) => `Year: ${label}`} />
                <Line
                  type="monotone"
                  dataKey="gap"
                  name="Pay Gap %"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
