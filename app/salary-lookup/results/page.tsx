import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SalaryOverview from "@/components/salary-lookup/salary-overview"
import GenderComparisonChart from "@/components/salary-lookup/gender-comparison-chart"
import RegionalHeatmap from "@/components/salary-lookup/regional-heatmap"
import CompanyRankings from "@/components/salary-lookup/company-rankings"
import SimilarJobs from "@/components/salary-lookup/similar-jobs"

export default function SalaryResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get search parameters
  const jobTitle = (searchParams.job as string) || "Software Engineer"
  const gender = (searchParams.gender as string) || "all"
  const location = (searchParams.location as string) || "us"
  const industry = (searchParams.industry as string) || ""
  const expMin = Number.parseInt((searchParams.expMin as string) || "0")
  const expMax = Number.parseInt((searchParams.expMax as string) || "15")

  // Format location for display
  const locationDisplay =
    {
      us: "United States",
      uk: "United Kingdom",
      ca: "Canada",
      au: "Australia",
      de: "Germany",
      fr: "France",
      global: "Global",
    }[location] || "United States"

  // Format industry for display
  const industryDisplay = industry
    ? {
        technology: "Technology",
        healthcare: "Healthcare",
        finance: "Finance",
        education: "Education",
        retail: "Retail",
        manufacturing: "Manufacturing",
      }[industry]
    : "All Industries"

  // Format gender for display
  const genderDisplay =
    {
      all: "All Genders",
      male: "Male",
      female: "Female",
      "non-binary": "Non-binary",
    }[gender] || "All Genders"

  // Format experience range for display
  const experienceDisplay =
    expMin === 0 && expMax === 15 ? "All Experience Levels" : `${expMin} - ${expMax === 15 ? "15+" : expMax} years`

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link
          href="/salary-lookup"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Search
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{jobTitle} Salary Data</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
            <span>{locationDisplay}</span>
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
            <span>{genderDisplay}</span>
          </Button>
          {industryDisplay !== "All Industries" && (
            <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
              <span>{industryDisplay}</span>
            </Button>
          )}
          {experienceDisplay !== "All Experience Levels" && (
            <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
              <span>{experienceDisplay}</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SalaryOverview jobTitle={jobTitle} location={locationDisplay} />
      </div>

      <Tabs defaultValue="gender" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="gender">By Gender</TabsTrigger>
          <TabsTrigger value="region">By Region</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="gender" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Comparison by Gender</CardTitle>
              <CardDescription>Average salary and pay gap breakdown for {jobTitle} positions</CardDescription>
            </CardHeader>
            <CardContent>
              <GenderComparisonChart jobTitle={jobTitle} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="region" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Salary Heatmap</CardTitle>
              <CardDescription>Salary variations across different regions in {locationDisplay}</CardDescription>
            </CardHeader>
            <CardContent>
              <RegionalHeatmap jobTitle={jobTitle} location={locationDisplay} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Rankings</CardTitle>
              <CardDescription>Companies with the highest and lowest pay equity for {jobTitle} roles</CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyRankings jobTitle={jobTitle} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Similar Job Titles</CardTitle>
            <CardDescription>Explore related positions that may have similar salary ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <SimilarJobs jobTitle={jobTitle} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
