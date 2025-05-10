import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SalaryForm from "@/components/salary-form"


export default function SubmitPage() {

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Submit Your Salary Anonymously</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your contribution helps create transparency and drives change. All submissions are 100% anonymous.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Salary Information</CardTitle>
            <CardDescription>We never store names or emails. Data is 100% anonymous.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalaryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
