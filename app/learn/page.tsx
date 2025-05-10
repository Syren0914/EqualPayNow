import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, FileText, Globe, Users } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Learn About Pay Transparency</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Educational resources to help you understand pay inequality and advocate for change.
        </p>
      </div>

      <Tabs defaultValue="why" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="why">Why It Matters</TabsTrigger>
          <TabsTrigger value="negotiation" id="negotiation">
            Negotiation
          </TabsTrigger>
          <TabsTrigger value="laws" id="laws">
            Laws
          </TabsTrigger>
          <TabsTrigger value="advocacy" id="advocacy">
            Advocacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="why" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Pay Transparency Matters</h2>
              <div className="space-y-4">
                <p>
                  Pay transparency is more than just knowing what others earn—it's about creating a fair workplace where
                  everyone has equal opportunity to succeed.
                </p>
                <p>
                  When salaries are kept secret, pay discrimination can thrive undetected. Studies show that women earn
                  82 cents for every dollar earned by men, and the gap is even wider for women of color.
                </p>
                <p>
                  Transparency helps identify these disparities and creates accountability for employers to address
                  them.
                </p>
              </div>
            </div>
            <div className="bg-muted p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Key Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1">
                    <span className="text-lg font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Women earn 82¢ for every $1 earned by men</p>
                    <p className="text-sm text-muted-foreground">
                      This gap widens to 63¢ for Black women and 55¢ for Hispanic women
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1">
                    <span className="text-lg font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">$900,000+ lifetime earnings loss</p>
                    <p className="text-sm text-muted-foreground">
                      The average woman loses over $900,000 in lifetime earnings due to the pay gap
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1">
                    <span className="text-lg font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Companies with pay transparency have 13% smaller gender pay gaps</p>
                    <p className="text-sm text-muted-foreground">
                      Transparency creates accountability and drives change
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>The Benefits of Pay Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">For Employees</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Better negotiating power</li>
                    <li>Reduced pay discrimination</li>
                    <li>Increased job satisfaction</li>
                    <li>Greater trust in employers</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">For Companies</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Attract diverse talent</li>
                    <li>Improve employee retention</li>
                    <li>Build stronger company culture</li>
                    <li>Enhance brand reputation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">For Society</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Reduced economic inequality</li>
                    <li>Narrowed gender and racial pay gaps</li>
                    <li>More equitable workplaces</li>
                    <li>Economic growth through fair compensation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negotiation" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Salary Negotiation Guide</CardTitle>
              <CardDescription>Practical tips to help you negotiate fair compensation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Before the Negotiation</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Research industry standards</p>
                        <p className="text-sm text-muted-foreground">
                          Use our dashboard data, Glassdoor, PayScale, and industry reports to understand the market
                          rate for your role.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Document your achievements</p>
                        <p className="text-sm text-muted-foreground">
                          Prepare specific examples of your contributions, projects completed, and value added.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Set a target range</p>
                        <p className="text-sm text-muted-foreground">
                          Determine your ideal salary, your minimum acceptable offer, and your starting ask (10-20%
                          above market).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium">During the Negotiation</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Start higher than your target</p>
                        <p className="text-sm text-muted-foreground">
                          Begin with a number higher than your ideal salary to leave room for negotiation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Focus on value, not need</p>
                        <p className="text-sm text-muted-foreground">
                          Emphasize the value you bring to the company, not your personal financial needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Consider the total package</p>
                        <p className="text-sm text-muted-foreground">
                          Negotiate benefits, bonuses, equity, flexible work arrangements, and professional development
                          opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Sample Negotiation Script</h4>
                  <p className="text-sm italic mb-2">
                    "Thank you for the offer. Based on my research of similar roles in the industry and the value I'll
                    bring with my experience in [specific skills], I was expecting a salary in the range of $X-$Y. Is
                    there room to discuss this further?"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Remember to be confident but collaborative, and always express appreciation for the offer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="laws" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Pay Transparency Laws by Country</CardTitle>
              <CardDescription>Understanding legal frameworks that support equal pay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">United States</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Equal Pay Act (1963)</p>
                        <p className="text-sm text-muted-foreground">
                          Prohibits wage discrimination based on sex for equal work.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">State-Specific Laws</p>
                        <p className="text-sm text-muted-foreground">
                          California, Colorado, New York, and Washington require salary ranges in job postings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium">European Union</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">EU Pay Transparency Directive (2023)</p>
                        <p className="text-sm text-muted-foreground">
                          Requires companies to report gender pay gaps and provide salary information in job listings.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Country-Specific Laws</p>
                        <p className="text-sm text-muted-foreground">
                          Iceland, Germany, and France have strong pay transparency and reporting requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium">United Kingdom</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Equality Act (2010)</p>
                        <p className="text-sm text-muted-foreground">
                          Provides legal framework for equal pay for equal work.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Gender Pay Gap Reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Companies with 250+ employees must publish gender pay gap data annually.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Know Your Rights</h4>
                  <p className="text-sm text-muted-foreground">
                    In many jurisdictions, it's illegal for employers to prohibit employees from discussing their
                    salaries. The National Labor Relations Act in the US protects most employees' right to discuss
                    wages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advocacy" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Advocacy Resources</CardTitle>
              <CardDescription>Organizations and resources to help drive change</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-medium">Organizations Working for Pay Equity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Organization logo"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Equal Pay International Coalition</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Global initiative to achieve equal pay for work of equal value.
                        </p>
                        <Link
                          href="https://www.equalpayinternationalcoalition.org/"
                          className="text-xs text-primary hover:underline"
                          target="_blank"
                        >
                          Visit Website
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Organization logo"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">National Women's Law Center</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Advocates for gender justice in courts, public policy, and society.
                        </p>
                        <Link href="https://nwlc.org/" className="text-xs text-primary hover:underline" target="_blank">
                          Visit Website
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Organization logo"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Equal Rights Advocates</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Fighting for gender justice in workplaces and schools.
                        </p>
                        <Link
                          href="https://www.equalrights.org/"
                          className="text-xs text-primary hover:underline"
                          target="_blank"
                        >
                          Visit Website
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-medium">How to Take Action</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Share Your Salary Data</p>
                        <p className="text-sm text-muted-foreground">
                          Contribute to transparency by submitting your anonymous salary information.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Start Conversations</p>
                        <p className="text-sm text-muted-foreground">
                          Discuss pay transparency with colleagues and management in a constructive way.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Advocate for Policy Changes</p>
                        <p className="text-sm text-muted-foreground">
                          Support legislation that promotes pay transparency and equity.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-1">
                        <span className="text-sm font-bold text-primary">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Support Organizations</p>
                        <p className="text-sm text-muted-foreground">
                          Donate to or volunteer with organizations working for pay equity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                <h3 className="text-xl font-medium mb-4">Downloadable Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center" asChild>
                    <Link href="#">
                      <BookOpen className="h-6 w-6 mb-2" />
                      <span className="font-medium">Pay Equity Guide</span>
                      <span className="text-xs text-muted-foreground mt-1">PDF, 2.4MB</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center" asChild>
                    <Link href="#">
                      <FileText className="h-6 w-6 mb-2" />
                      <span className="font-medium">Negotiation Templates</span>
                      <span className="text-xs text-muted-foreground mt-1">DOCX, 1.1MB</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center" asChild>
                    <Link href="#">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="font-medium">Workplace Toolkit</span>
                      <span className="text-xs text-muted-foreground mt-1">PDF, 3.8MB</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of others in the movement for pay equity by sharing your anonymous salary data.
        </p>
        <Button size="lg" className="rounded-2xl px-6 py-6" asChild>
          <Link href="/submit">
            Submit Your Salary <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
