import { Users, Target, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: <Target size={24} />,
      title: "Mission Driven",
      description: "We're committed to empowering teams with tools that make agile development more effective and enjoyable."
    },
    {
      icon: <Users size={24} />,
      title: "Team Focused",
      description: "Every feature is designed with real development teams in mind, solving actual problems they face daily."
    },
    {
      icon: <Zap size={24} />,
      title: "Innovation First",
      description: "We continuously evolve our platform with cutting-edge features that stay ahead of industry trends."
    },
    {
      icon: <Heart size={24} />,
      title: "Community Driven",
      description: "Our development is guided by feedback from our amazing community of agile practitioners worldwide."
    }
  ];

  const stats = [
    { label: "Active Teams", value: "10,000+" },
    { label: "Projects Delivered", value: "50,000+" },
    { label: "Countries", value: "120+" },
    { label: "User Satisfaction", value: "98%" }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Transforming how teams build software
          </h2>
          <p className="text-muted-foreground">
            Since 2020, Axia Agile has been at the forefront of agile project management,
            helping thousands of teams worldwide deliver better software faster.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  {value.icon}
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Story</h3>
            <p className="text-muted-foreground mb-6">
              Axia Agile was born from the frustration of using fragmented tools that didn't work well together.
              Our founders, experienced software engineers and product managers, envisioned a unified platform
              that would bring all aspects of agile development into one seamless experience.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to serve teams of all sizes - from startups building their first product
              to enterprise organizations managing complex portfolios. Our commitment remains the same:
              making agile development more accessible, efficient, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;