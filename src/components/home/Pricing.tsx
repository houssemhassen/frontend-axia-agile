import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0 DT",
      period: "per user/month",
      description: "Perfect for small teams getting started with agile",
      features: [
        "Up to 10 team members",
        "5 projects",
        "Basic kanban boards",
        "Email support",
        "Basic reporting"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "99 DT",
      period: "per user/month", 
      description: "Advanced features for growing agile teams",
      features: [
        "Up to 50 team members",
        "Unlimited projects",
        "Advanced kanban & scrum boards",
        "Priority support",
        "Advanced analytics",
        "Time tracking",
        "Custom workflows"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "399 DT",
      period: "per user/month",
      description: "Full-scale solution for large organizations",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "All features included",
        "24/7 dedicated support",
        "Advanced security",
        "Single sign-on (SSO)",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose the perfect plan for your team
          </h2>
          <p className="text-muted-foreground">
            Start free and scale as you grow. All plans include core agile features
            with increasing levels of customization and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} hover:shadow-lg transition-shadow`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;