"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"

export default function PreviewChart() {
  // Sample data for gender pay gap by industry
  const data = [
    { industry: "Tech", male: 120000, female: 102000 },
    { industry: "Finance", male: 110000, female: 88000 },
    { industry: "Healthcare", male: 95000, female: 85000 },
    { industry: "Education", male: 75000, female: 70000 },
    { industry: "Retail", male: 65000, female: 55000 },
  ]

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4 text-center">Gender Pay Gap by Industry</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Data based on anonymous submissions from our platform
      </p>
    </div>
  )
}
