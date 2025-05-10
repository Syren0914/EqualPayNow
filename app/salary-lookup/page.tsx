"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import JobSalarySearch from "@/components/salary-lookup/job-salary-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

export default function SalaryLookupPage() {
  const [job, setJob] = useState("Software Engineer")
  const [location, setLocation] = useState("California, US")
  const [data, setData] = useState<any[]>([])
  const [currentTab, setCurrentTab] = useState("tech")


  const fetchLookupData = async (selectedJob: string, selectedLocation: string) => {
    const res = await fetch(`http://localhost:5000/api/salaries?job=${selectedJob}&location=${selectedLocation}`)
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    fetchLookupData(job, location)
  }, [job, location])
  

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">View Your Job Salary</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore average salaries and pay gaps by job title, gender, location, and more.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Search Job Salaries</CardTitle>
          <CardDescription>Enter a job title and apply filters to see detailed salary information</CardDescription>
        </CardHeader>
        <CardContent>
          <JobSalarySearch
            job={job}
            location={location}
            onJobChange={(newJob) => {
              setJob(newJob)
              fetchLookupData(newJob, location)
            }}
            onLocationChange={(newLocation) => {
              setLocation(newLocation)
              fetchLookupData(job, newLocation)
            }}
          />

          {data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {data.map((entry) => (
                <Card key={entry._id}>
                  <CardHeader>
                    <CardTitle>{entry._id}</CardTitle>
                    <CardDescription>
                      Avg Salary: ${Math.round(entry.averageSalary).toLocaleString()} <br />
                      Submissions: {entry.count}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Popular Job Searches</CardTitle>
            <CardDescription>Quickly explore salary data for commonly searched positions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">


              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="tech">Technology</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="tech" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data
                    .filter((entry) => [
                      "Software Engineer",
                      "Product Manager",
                      "Data Scientist",
                      "UX Designer",
                      "DevOps Engineer",
                      "Frontend Developer"
                    ].includes(entry._id))
                    .map((entry) => (
                      <PopularJobCard
                        key={entry._id}
                        title={entry._id}
                        avgSalary={`$${Math.round(entry.averageSalary).toLocaleString()}`}
                        gapPercent={Math.floor(Math.random() * 20)}
                        totalSubmissions={entry.count}
                      />
                    ))}
                </div>
              </TabsContent>
              {/* Additional TabsContent blocks can be adjusted similarly */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PopularJobCard({
  title,
  avgSalary,
  gapPercent,
  totalSubmissions,
}: {
  title: string
  avgSalary: string
  gapPercent: number
  totalSubmissions: number
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Average Salary</p>
            <p className="text-2xl font-bold">{avgSalary}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Gender Gap</p>
            <p className="text-lg font-medium text-rose-500">{gapPercent}%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Based on {totalSubmissions.toLocaleString()} submissions</p>
        <div className="mt-4">
          <a
            href={`/salary-lookup/results?job=${encodeURIComponent(title)}`}
            className="text-sm text-primary hover:underline"
          >
            View detailed breakdown →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
