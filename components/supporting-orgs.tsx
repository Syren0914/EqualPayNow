export default function SupportingOrgs() {
  const organizations = [
    "UN Women",
    "Equal Pay International Coalition",
    "Women in Tech",
    "Global Fund for Women",
    "Equality Now",
  ]

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {organizations.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center text-center"
        >
          <div className="h-28 w-28 flex items-center justify-center rounded-md bg-muted text-sm font-medium text-muted-foreground shadow-sm">
            {name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")}
          </div>
          <span className="text-xs text-muted-foreground mt-2">{name}</span>
        </div>
      ))}
    </div>
  )
}
