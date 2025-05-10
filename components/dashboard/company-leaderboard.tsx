"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CompanyLeaderboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industry, setIndustry] = useState("all")

  // Sample company data
  const companies = [
    {
      name: "Acme Tech",
      industry: "Technology",
      gapScore: 94,
      avgSalary: "$120,000",
      genderRatio: "45% F / 55% M",
      transparencyScore: "A",
    },
    {
      name: "Global Finance",
      industry: "Finance",
      gapScore: 82,
      avgSalary: "$135,000",
      genderRatio: "38% F / 62% M",
      transparencyScore: "B",
    },
    {
      name: "MediCorp",
      industry: "Healthcare",
      gapScore: 91,
      avgSalary: "$95,000",
      genderRatio: "62% F / 38% M",
      transparencyScore: "A",
    },
    {
      name: "EduSystems",
      industry: "Education",
      gapScore: 89,
      avgSalary: "$75,000",
      genderRatio: "58% F / 42% M",
      transparencyScore: "B+",
    },
    {
      name: "RetailGiant",
      industry: "Retail",
      gapScore: 76,
      avgSalary: "$65,000",
      genderRatio: "52% F / 48% M",
      transparencyScore: "C",
    },
    {
      name: "TechInnovate",
      industry: "Technology",
      gapScore: 88,
      avgSalary: "$118,000",
      genderRatio: "42% F / 58% M",
      transparencyScore: "B+",
    },
    {
      name: "ManufacturePro",
      ndustry: "Manufacturing",
      gapScore: 72,
      avgSalary: "$80,000",
      genderRatio: "35% F / 65% M",
      transparencyScore: "C+",
    },
  ]

  // Filter companies based on search term and industry
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industry === "all" || company.industry.toLowerCase() === industry.toLowerCase()
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Transparency Leaderboard</CardTitle>
          <CardDescription>
            Companies ranked by user-submitted pay equity data and transparency practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead className="text-center">Equity Score</TableHead>
                  <TableHead>Avg. Salary</TableHead>
                  <TableHead>Gender Ratio</TableHead>
                  <TableHead className="text-center">Transparency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.name}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold">
                        {company.gapScore}/100
                      </div>
                    </TableCell>
                    <TableCell>{company.avgSalary}</TableCell>
                    <TableCell>{company.genderRatio}</TableCell>
                    <TableCell className="text-center">
                      <div
                        className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-semibold
                        ${
                          company.transparencyScore === "A"
                            ? "bg-green-100 text-green-700"
                            : company.transparencyScore === "B+" || company.transparencyScore === "B"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {company.transparencyScore}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Equity Score is calculated based on gender pay gap, representation, and promotion equity. Higher scores
              indicate better pay equity practices.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
