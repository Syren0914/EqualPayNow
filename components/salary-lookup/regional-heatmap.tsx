"use client"

import { useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - in a real app, this would come from an API
const getRegionalData = (jobTitle: string, location: string) => {
  // This would be replaced with actual API call
  const regions =
    location === "United States"
      ? ["Northeast", "Southeast", "Midwest", "Southwest", "West Coast"]
      : ["London", "North", "Midlands", "Scotland", "Wales"]

  const cities =
    location === "United States"
      ? ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Denver", "Atlanta"]
      : ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Cardiff", "Bristol", "Leeds"]

  // Generate sample data for regions
  const regionData = regions.map((region) => {
    const baseSalary =
      {
        "Software Engineer": 120000,
        "Product Manager": 135000,
        "Data Scientist": 125000,
      }[jobTitle] || 100000

    // Add some variation
    const multiplier =
      {
        Northeast: 1.15,
        "West Coast": 1.25,
        Midwest: 0.9,
        Southeast: 0.85,
        Southwest: 0.95,
        London: 1.2,
        North: 0.85,
        Midlands: 0.9,
        Scotland: 0.95,
        Wales: 0.8,
      }[region] || 1

    return {
      region,
      salary: Math.round(baseSalary * multiplier),
      submissions: Math.floor(Math.random() * 500) + 100,
    }
  })

  // Generate sample data for cities
  const cityData = cities.map((city) => {
    const baseSalary =
      {
        "Software Engineer": 120000,
        "Product Manager": 135000,
        "Data Scientist": 125000,
      }[jobTitle] || 100000

    // Add some variation
    const multiplier =
      {
        "New York": 1.2,
        "San Francisco": 1.3,
        Chicago: 1.05,
        Austin: 1.1,
        Seattle: 1.25,
        Boston: 1.15,
        Denver: 1,
        Atlanta: 0.95,
        London: 1.25,
        Manchester: 0.9,
        Birmingham: 0.85,
        Edinburgh: 0.95,
        Glasgow: 0.9,
        Cardiff: 0.8,
        Bristol: 0.95,
        Leeds: 0.85,
      }[city] || 1

    return {
      city,
      salary: Math.round(baseSalary * multiplier),
      submissions: Math.floor(Math.random() * 300) + 50,
    }
  })

  return { regionData, cityData }
}

export default function RegionalHeatmap({
  jobTitle,
  location,
}: {
  jobTitle: string
  location: string
}) {
  const [view, setView] = useState("regions")
  const { regionData, cityData } = getRegionalData(jobTitle, location)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Find min and max salaries for color scaling
  const allSalaries = view === "regions" ? regionData.map((d) => d.salary) : cityData.map((d) => d.salary)

  const minSalary = Math.min(...allSalaries)
  const maxSalary = Math.max(...allSalaries)

  // Function to calculate color intensity
  const getColorIntensity = (salary: number) => {
    const percentage = (salary - minSalary) / (maxSalary - minSalary)
    return Math.round(percentage * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regions">By Region</TabsTrigger>
            <TabsTrigger value="cities">By City</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="salary">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="View metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="salary">Average Salary</SelectItem>
            <SelectItem value="gap">Gender Gap</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square md:aspect-auto">
          <Image
            src={
              location === "United States"
                ? "/placeholder.svg?height=300&width=300"
                : "/placeholder.svg?height=300&width=300"
            }
            alt={`${location} map`}
            width={300}
            height={300}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Map visualization would appear here
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">{view === "regions" ? "Regional" : "City"} Salary Breakdown</h3>
          <div className="space-y-3">
            {(view === "regions" ? regionData : cityData).map((item) => (
              <div key={view === "regions" ? item.region : item.city} className="flex items-center">
                <div className="w-1/3 font-medium truncate">{view === "regions" ? item.region : item.city}</div>
                <div className="w-2/3 flex items-center gap-3">
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-300 to-blue-600"
                      style={{ width: `${getColorIntensity(item.salary)}%` }}
                    />
                  </div>
                  <div className="w-24 text-right font-medium">{formatCurrency(item.salary)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            Based on submissions from professionals in each {view === "regions" ? "region" : "city"}
          </div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Regional Insights</h3>
        <p className="text-sm text-muted-foreground">
          {location === "United States"
            ? `${jobTitle} salaries are highest in West Coast and Northeast regions, with San Francisco and New York offering the highest compensation. The cost of living in these areas is also significantly higher.`
            : `${jobTitle} salaries are highest in London, with a significant drop when moving to other regions. The North and Wales regions show the lowest average compensation.`}
        </p>
      </div>
    </div>
  )
}
