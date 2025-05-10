"use client"
import Link from "next/link"
import { ArrowRight, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import NetworkAnimation from "@/components/network-animation"
import PreviewChart from "@/components/preview-chart"
import SupportingOrgs from "@/components/supporting-orgs"
import CountUp from "react-countup"
import { useEffect, useState } from "react"


export default function Home() {
    const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/summary`)
        const json = await res.json()
        setSummary(json)
      } catch (error) {
        console.error("Failed to fetch summary:", error)
      }
    }

    fetchSummary()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50 py-16 md:py-24">
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s Make Pay Transparent. <span className="text-primary">Together.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Join the movement for wage equity by anonymously sharing and exploring salary insights by gender, ethnicity,
            and location.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-2xl px-6 py-6" asChild>
              <Link href="/submit">
                Submit Salary <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-6 py-6" asChild>
              <Link href="/dashboard">
                View Inequality Data <BarChart3 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-20">
          <NetworkAnimation />
        </div>
      </section>

      {/* Preview Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Current average gender pay gap:{" "}
                {summary?.genderGap != null ? (
                  <span className="text-rose-500">
                    <CountUp end={parseFloat(summary.genderGap) * 100} duration={1.2} decimals={2} />%
                  </span>
                ) : (
                  <span className="text-muted-foreground">8%</span>
                )}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our data shows that women still earn significantly less than men across most industries. Help us gather
                more data to drive change.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">10,000+ Anonymous Submissions</h3>
                    <p className="text-sm text-muted-foreground">From professionals across 50+ countries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Data Analysis</h3>
                    <p className="text-sm text-muted-foreground">Visualize trends across industries and demographics</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <PreviewChart />
            </div>
          </div>
        </div>
      </section>
      </div>

    

      {/* How It Works Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How EqualPayNow Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Submit Anonymously</h3>
              <p className="text-muted-foreground">
                Share your salary data completely anonymously. We never collect personal identifiers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Explore Data</h3>
              <p className="text-muted-foreground">
                Visualize pay gaps across industries, locations, genders, and ethnicities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Drive Change</h3>
              <p className="text-muted-foreground">
                Use our resources to advocate for fair pay and negotiate better compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Organizations */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl font-medium text-center mb-12">Supported By</h2>
          <SupportingOrgs />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to make a difference?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every submission helps create a more transparent workplace. Join thousands of others in the movement for pay
            equity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-2xl px-6 py-6" asChild>
              <Link href="/submit">
                Submit Your Salary <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-6 py-6" asChild>
              <Link href="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
