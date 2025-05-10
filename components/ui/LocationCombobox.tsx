"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

const locations = [
  "California, US",
  "New York, US",
  "Texas, US",
  "Washington, US",
  "Ontario, CA",
  "Quebec, CA",
  "London, UK",
  "Berlin, DE",
  "Paris, FR",
  "Tokyo, JP",
  "Sydney, AU",
  "Melbourne, AU"
]

export function LocationCombobox({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [query, setQuery] = useState(value || "")
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = locations.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
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
        placeholder="Start typing location..."
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
          {filtered.map((loc) => (
            <div
              key={loc}
              className="px-4 py-2 cursor-pointer hover:bg-muted"
              onMouseDown={() => {
                setQuery(loc)
                onChange(loc)
                setShowDropdown(false)
              }}
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
