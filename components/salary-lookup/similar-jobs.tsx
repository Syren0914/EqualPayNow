"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample data - in a real app, this would come from an API
const getSimilarJobs = (jobTitle: string) => {
  // This would be replaced with actual API call
  const similarJobsMap = {
    "Software Engineer": [
      { title: "Frontend Developer", avgSalary: 112000, submissions: 890 },
      { title: "Backend Developer", avgSalary: 118000, submissions: 820 },
      { title: "Full Stack Developer", avgSalary: 125000, submissions: 950 },
      { title: "DevOps Engineer", avgSalary: 130000, submissions: 680 },
      { title: "Mobile Developer", avgSalary: 115000, submissions: 720 },
    ],
    "Product Manager": [
      { title: "Product Owner", avgSalary: 125000, submissions: 650 },
      { title: "Program Manager", avgSalary: 130000, submissions: 580 },
      { title: "Project Manager", avgSalary: 115000, submissions: 780 },
      { title: "Business Analyst", avgSalary: 105000, submissions: 720 },
      { title: "Technical Product Manager", avgSalary: 140000, submissions: 520 },
    ],
    "Data Scientist": [
      { title: "Data Analyst", avgSalary: 95000, submissions: 920 },
      { title: "Machine Learning Engineer", avgSalary: 135000, submissions: 680 },
      { title: "Data Engineer", avgSalary: 125000, submissions: 750 },
      { title: "Business Intelligence Analyst", avgSalary: 100000, submissions: 680 },
      { title: "Research Scientist", avgSalary: 130000, submissions: 480 },
    ],
    "UX Designer": [
      { title: "UI Designer", avgSalary: 95000, submissions: 680 },
      { title: "Product Designer", avgSalary: 110000, submissions: 720 },
      { title: "Interaction Designer", avgSalary: 100000, submissions: 480 },
      { title: "Visual Designer", avgSalary: 90000, submissions: 520 },
      { title: "UX Researcher", avgSalary: 105000, submissions: 380 },
    ],
  }

  return (
    similarJobsMap[jobTitle as keyof typeof similarJobsMap] || [
      { title: "Related Position 1", avgSalary: 95000, submissions: 450 },
      { title: "Related Position 2", avgSalary: 100000, submissions: 380 },
      { title: "Related Position 3", avgSalary: 105000, submissions: 420 },
      { title: "Related Position 4", avgSalary: 98000, submissions: 350 },
      { title: "Related Position 5", avgSalary: 102000, submissions: 390 },
    ]
  )
}

export default function SimilarJobs({ jobTitle }: { jobTitle: string }) {
  const similarJobs = getSimilarJobs(jobTitle)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {similarJobs.map((job) => (
        <div key={job.title} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-medium mb-2">{job.title}</h3>
          <p className="text-2xl font-bold mb-1">{formatCurrency(job.avgSalary)}</p>
          <p className="text-xs text-muted-foreground mb-4">Based on {job.submissions.toLocaleString()} submissions</p>
          <Link
            href={`/salary-lookup/results?job=${encodeURIComponent(job.title)}`}
            className="text-xs text-primary hover:underline inline-flex items-center"
          >
            View details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      ))}
    </div>
  )
}
