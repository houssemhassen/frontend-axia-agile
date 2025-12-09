
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, DollarSign, FileText, Settings, Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: ["5 users", "Basic analytics", "Email support"],
      description: "Perfect for small teams getting started"
    },
    {
      name: "Pro",
      price: "$29.99",
      features: ["20 users", "Advanced analytics", "24/7 support", "Custom features"],
      description: "For growing teams with advanced needs",
      recommended: true
    },
    {
      name: "Enterprise",
      price: "$99.99",
      features: ["Unlimited users", "Enterprise-grade analytics", "Dedicated support", "Custom features", "Advanced security"],
      description: "Full-featured plan for large organizations"
    }
  ];

  const invoices = [
    { id: "INV-001", date: "2023-05-01", amount: "$29.99", status: "Paid" },
    { id: "INV-002", date: "2023-06-01", amount: "$29.99", status: "Paid" },
    { id: "INV-003", date: "2023-07-01", amount: "$29.99", status: "Paid" },
    { id: "INV-004", date: "2023-08-01", amount: "$29.99", status: "Pending" }
  ];

  const handleUpgrade = (plan: string) => {
    toast.success(`Upgraded to ${plan} plan`, {
      description: "Your billing plan has been updated"
    });
  };

  return (
    <DashboardLayout role="billingAdmin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription and payment methods</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">Pro Plan</p>
                    <p className="text-muted-foreground">Next billing date: September 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">$29.99/month</p>
                    <p className="text-muted-foreground">20 users included</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel Subscription</Button>
                <Button>Change Plan</Button>
              </CardFooter>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,249.99</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-muted-foreground">+6 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">-2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Same as last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="plans" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.recommended ? "border-primary" : ""}>
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                      <span className="bg-primary text-primary-foreground text-xs py-1 px-2 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-primary"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleUpgrade(plan.name)}
                      variant={plan.recommended ? "default" : "outline"}
                    >
                      {plan.recommended ? "Upgrade to Pro" : `Choose ${plan.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="mr-4 h-6 w-6" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="mr-4 h-6 w-6" />
                      <div>
                        <p className="font-medium">Mastercard ending in 5678</p>
                        <p className="text-sm text-muted-foreground">Expires 08/2025</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted p-4 font-medium">
                    <div>Invoice</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-5 p-4 border-t">
                      <div>{invoice.id}</div>
                      <div>{invoice.date}</div>
                      <div>{invoice.amount}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
