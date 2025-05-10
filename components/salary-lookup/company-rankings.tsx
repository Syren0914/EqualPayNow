"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Sample data - in a real app, this would come from an API
const getCompanyData = (jobTitle: string) => {
  // This would be replaced with actual API call
  const baseCompanies = [
    {
      name: "TechCorp",
      industry: "Technology",
      avgSalary: 135000,
      gapScore: 95,
      genderRatio: "48% F / 52% M",
    },
    {
      name: "DataSystems",
      industry: "Technology",
      avgSalary: 128000,
      gapScore: 92,
      genderRatio: "45% F / 55% M",
    },
    {
      name: "InnovateTech",
      industry: "Technology",
      avgSalary: 142000,
      gapScore: 88,
      genderRatio: "42% F / 58% M",
    },
    {
      name: "GlobalFinance",
      industry: "Finance",
      avgSalary: 125000,
      gapScore: 85,
      genderRatio: "40% F / 60% M",
    },
    {
      name: "MediHealth",
      industry: "Healthcare",
      avgSalary: 118000,
      gapScore: 90,
      genderRatio: "55% F / 45% M",
    },
    {
      name: "RetailGiant",
      industry: "Retail",
      avgSalary: 105000,
      gapScore: 78,
      genderRatio: "50% F / 50% M",
    },
    {
      name: "EduSystems",
      industry: "Education",
      avgSalary: 95000,
      gapScore: 94,
      genderRatio: "60% F / 40% M",
    },
    {
      name: "ManufactureCo",
      industry: "Manufacturing",
      avgSalary: 110000,
      gapScore: 75,
      genderRatio: "35% F / 65% M",
    },
    {
      name: "TechGiant",
      industry: "Technology",
      avgSalary: 150000,
      gapScore: 82,
      genderRatio: "38% F / 62% M",
    },
    {
      name: "StartupInc",
      industry: "Technology",
      avgSalary: 115000,
      gapScore: 89,
      genderRatio: "44% F / 56% M",
    },
  ]

  // Adjust salaries based on job title
  const salaryMultiplier =
    {
      "Software Engineer": 1,
      "Product Manager": 1.15,
      "Data Scientist": 1.05,
      "UX Designer": 0.9,
    }[jobTitle] || 0.95

  return baseCompanies.map((company) => ({
    ...company,
    avgSalary: Math.round(company.avgSalary * salaryMultiplier),
  }))
}

export default function CompanyRankings({ jobTitle }: { jobTitle: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [rankingType, setRankingType] = useState("equity")

  const companies = getCompanyData(jobTitle)

  // Sort companies based on ranking type
  const sortedCompanies = [...companies].sort((a, b) => {
    if (rankingType === "equity") {
      return b.gapScore - a.gapScore
    } else {
      return b.avgSalary - a.avgSalary
    }
  })

  // Filter companies based on search term
  const filteredCompanies = sortedCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs value={rankingType} onValueChange={setRankingType} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="equity">Best Pay Equity</TabsTrigger>
            <TabsTrigger value="salary">Highest Salary</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-right">Avg. Salary</TableHead>
              {rankingType === "equity" && <TableHead className="text-center">Equity Score</TableHead>}
              <TableHead>Gender Ratio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company, index) => (
              <TableRow key={company.name}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell className="text-right">{formatCurrency(company.avgSalary)}</TableCell>
                {rankingType === "equity" && (
                  <TableCell className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold">
                      {company.gapScore}/100
                    </div>
                  </TableCell>
                )}
                <TableCell>{company.genderRatio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          {rankingType === "equity"
            ? "Equity Score is calculated based on gender pay gap, representation, and promotion equity. Higher scores indicate better pay equity practices."
            : "Companies are ranked by average reported salary for this position. Salary data is based on anonymous submissions."}
        </p>
      </div>
    </div>
  )
}
