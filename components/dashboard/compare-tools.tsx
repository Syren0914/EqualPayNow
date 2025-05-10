"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompareTools() {
  const [industry, setIndustry] = useState("technology")
  const [location, setLocation] = useState("us")
  const [experience, setExperience] = useState("all")

  // Sample data for filtered results
  const genderData = [
    { group: "Male", salary: 120000 },
    { group: "Female", salary: 102000 },
    { group: "Non-binary", salary: 110000 },
  ]

  const ethnicityData = [
    { group: "White", salary: 115000 },
    { group: "Asian", salary: 118000 },
    { group: "Black", salary: 98000 },
    { group: "Hispanic", salary: 95000 },
    { group: "Other", salary: 105000 },
  ]

  const educationData = [
    { group: "High School", salary: 75000 },
    { group: "Bachelor's", salary: 105000 },
    { group: "Master's", salary: 125000 },
    { group: "PhD", salary: 145000 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter & Compare Tool</CardTitle>
          <CardDescription>Compare salary data across different demographics by applying filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="executive">Executive (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button>Apply Filters</Button>
          </div>

          <Tabs defaultValue="gender" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gender">By Gender</TabsTrigger>
              <TabsTrigger value="ethnicity">By Ethnicity</TabsTrigger>
              <TabsTrigger value="education">By Education</TabsTrigger>
            </TabsList>

            <TabsContent value="gender" className="pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Avg. Salary"]} />
                    <Legend />
                    <Bar dataKey="salary" name="Average Salary" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  In the {industry} industry in {location === "us" ? "United States" : location}, women earn
                  approximately 15% less than men with similar experience levels.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ethnicity" className="pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ethnicityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Avg. Salary"]} />
                    <Legend />
                    <Bar dataKey="salary" name="Average Salary" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Significant disparities exist between ethnic groups in the {industry} industry, with Black and
                  Hispanic professionals earning 15-18% less than their White and Asian counterparts.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="education" className="pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={educationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Avg. Salary"]} />
                    <Legend />
                    <Bar dataKey="salary" name="Average Salary" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Education level has a significant impact on salary in the {industry} industry, with each degree level
                  increasing average compensation by approximately 20%.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
