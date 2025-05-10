import Image from "next/image"

export default function SupportingOrgs() {
  const organizations = [
    { name: "UN Women", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Equal Pay International Coalition", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Women in Tech", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Global Fund for Women", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Equality Now", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {organizations.map((org) => (
        <div key={org.name} className="flex flex-col items-center">
          <Image
            src={org.logo || "/placeholder.svg"}
            alt={org.name}
            width={120}
            height={60}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <span className="text-xs text-muted-foreground mt-2">{org.name}</span>
        </div>
      ))}
    </div>
  )
}
