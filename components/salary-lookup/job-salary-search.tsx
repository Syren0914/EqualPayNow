"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JobTitleCombobox } from "@/components/ui/JobTitleCombobox"
import { LocationCombobox } from "@/components/ui/LocationCombobox"

export default function JobSalarySearch({
  job,
  location,
  onJobChange,
  onLocationChange,
}: {
  job: string
  location: string
  onJobChange: (val: string) => void
  onLocationChange: (val: string) => void
}) {
  const [searching, setSearching] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    setTimeout(() => setSearching(false), 500) // Fake loading state
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="job-title" className="sr-only">
          Job Title
        </Label>
        <JobTitleCombobox value={job} onChange={onJobChange} />
      </div>
      <div className="flex-1">
        <Label htmlFor="location" className="sr-only">
          Location
        </Label>
        <LocationCombobox value={location} onChange={onLocationChange} />
      </div>
      <Button type="submit" disabled={searching}>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  )
}
