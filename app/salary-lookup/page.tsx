"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import JobSalarySearch from "@/components/salary-lookup/job-salary-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import Link from "next/link"

export default function SalaryLookupPage() {
  const [job, setJob] = useState("")
  const [location, setLocation] = useState("")
  const [data, setData] = useState<any[]>([])
  const [currentTab, setCurrentTab] = useState("tech")
  const [popularJobs, setPopularJobs] = useState<any[]>([])
  const [genderStats, setGenderStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPopularJobs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/salaries?groupBy=jobTitle`)
      const json = await res.json()
      setPopularJobs(json)
    } catch (err) {
      console.error("Error fetching popular jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchGenderStats = async (jobTitle: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/salaries?job=${encodeURIComponent(jobTitle)}&groupBy=gender`
      )
      const json = await res.json()
      setGenderStats(json)
    } catch (err) {
      console.error("Error fetching gender stats:", err)
    }
  }

  const fetchLookupData = async (selectedJob: string, selectedLocation: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/salaries?job=${selectedJob}&location=${selectedLocation}`
      )
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error("Error fetching lookup data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularJobs()
  }, [])

  useEffect(() => {
    if (job) {
      fetchLookupData(job, location)
      fetchGenderStats(job)
    }
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
              fetchGenderStats(newJob)
            }}
            onLocationChange={(newLocation) => {
              setLocation(newLocation)
              fetchLookupData(job, newLocation)
            }}
          />
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader size={40} color="#3B82F6" />
            </div>
          ) : (
            genderStats.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-8 mb-4">Salary by Gender</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {genderStats.map((entry, index) => (
                    <Card key={entry._id || index}>
                      <CardHeader>
                        <CardTitle>{entry._id || "Unspecified"}</CardTitle>
                        <CardDescription>
                          Avg Salary: ${Math.round(entry.averageSalary).toLocaleString()} <br />
                          Submissions: {entry.count}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </>
            )
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
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <ClipLoader size={40} color="#3B82F6" />
                </div>
              ) : (
                ["tech", "healthcare", "finance", "education"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {popularJobs.map((entry) => (
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
                ))
              )}
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
          <Link
            href={`/salary-lookup/results?job=${encodeURIComponent(title)}`}
            className="text-sm text-primary hover:underline"
          >
            View detailed breakdown →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
