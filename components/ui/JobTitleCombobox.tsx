"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Analyst",
  "Customer Support",
  "Sales Associate",
  "Project Coordinator",
  "HR Specialist",
  "Financial Analyst",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Business Analyst"
]

export function JobTitleCombobox({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [query, setQuery] = useState(value || "")
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = jobTitles.filter((title) =>
    title.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <Input
        placeholder="Start typing your job..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onChange(e.target.value)
          setShowDropdown(true)
        }}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-10 bg-white border mt-1 rounded shadow w-full max-h-60 overflow-y-auto">
          {filtered.map((title) => (
            <div
              key={title}
              className="px-4 py-2 cursor-pointer hover:bg-muted"
              onMouseDown={() => {
                setQuery(title)
                onChange(title)
                setShowDropdown(false)
              }}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
