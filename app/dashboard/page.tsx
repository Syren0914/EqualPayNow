"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ClipLoader from "react-spinners/ClipLoader"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { JobTitleCombobox } from "@/components/ui/JobTitleCombobox"
import { LocationCombobox } from "@/components/ui/LocationCombobox"
import CountUp from "react-countup"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState("")
  const [location, setLocation] = useState("")
  const [data, setData] = useState<any[]>([])
  const [view, setView] = useState("gender")
  const [summary, setSummary] = useState<any>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchStats = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
    const url =
      view === "ethnicity"
        ? `${baseUrl}/api/salaries?groupBy=ethnicity`
        : `${baseUrl}/api/salaries?job=${job}&location=${location}&groupBy=${view}`
    try {
      const res = await fetch(url)
      const json = await res.json()
      console.log("Stats response:", json)
      setData(json)
    } catch (err) {
      console.error("Error fetching stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSummary = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
      const res = await fetch(`${baseUrl}/api/insights/summary`)
      const json = await res.json()
      setSummary(json)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      console.error("Error fetching summary:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [job, location, view])

  useEffect(() => {
    fetchSummary()
    const interval = setInterval(fetchSummary, 60000)
    return () => clearInterval(interval)
  }, [])

  const chartData = {
    labels: data.map((entry) => entry._id),
    datasets: [
      {
        label: `Average Salary by ${view.charAt(0).toUpperCase() + view.slice(1)}`,
        data: data.map((entry) => entry.averageSalary),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderRadius: 6,
      },
    ],
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Salary Insights Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            View average salaries by gender, ethnicity, or industry.
          </p>
        </div>

        {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader size={40} color="#3B82F6" />
        </div>):

        summary && (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Total Entries</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center pb-6">
                  <p className="text-2xl font-semibold">
                    <CountUp end={summary.totalEntries} duration={1.2} separator="," />
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Avg. Salary</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center pb-6">
                  <p className="text-2xl font-semibold">
                    $<CountUp end={summary.avgSalary} duration={1.2} separator="," />
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Gender Pay Gap</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center pb-6">
                  <p className="text-2xl font-semibold">
                    <CountUp end={summary.genderGap * 100} duration={1.2} decimals={2} />%
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground text-right">Last updated: {lastUpdated}</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <JobTitleCombobox value={job} onChange={setJob} />
            </div>
            <div className="flex-1">
              <LocationCombobox value={location} onChange={setLocation} />
            </div>
            <Button onClick={fetchStats}>Apply</Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="gender" value={view} onValueChange={setView} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="ethnicity">Ethnicity</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
          </TabsList>

          <TabsContent value={view}>
            <Card>
              <CardHeader>
                <CardTitle>Average Salary by {view.charAt(0).toUpperCase() + view.slice(1)}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {loading ? (
                <div className="flex justify-center items-center h-40">
                  <ClipLoader size={40} color="#3B82F6" />
                </div>):
                data.length > 0 ? (
                  <Bar data={chartData} />
                ) : (
                  <p className="text-center text-muted-foreground">No data found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
