import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Brain, 
  Shield, 
  Heart, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Upload,
  FileSearch,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning models trained on millions of medical records for accurate predictions."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "HIPAA-compliant platform with end-to-end encryption to protect your sensitive health data."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get disease predictions within seconds after uploading your medical reports."
  },
  {
    icon: Heart,
    title: "Multi-Disease Detection",
    description: "Screen for diabetes, heart disease, liver conditions, kidney disorders, and more."
  },
];

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Report",
    description: "Simply upload your medical report in PDF, JPG, or PNG format."
  },
  {
    icon: FileSearch,
    step: "02",
    title: "AI Analysis",
    description: "Our ML models extract and analyze your medical parameters."
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Results",
    description: "Receive detailed predictions with risk levels and recommendations."
  },
];

const stats = [
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Reports Analyzed" },
  { value: "10+", label: "Diseases Detected" },
  { value: "24/7", label: "Availability" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container relative px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-sm font-medium text-accent-foreground">
              <Activity className="h-4 w-4 text-primary" />
              AI-Powered Healthcare Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Predict Diseases Early with{" "}
              <span className="text-gradient">Machine Learning</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your medical reports and get instant AI-powered predictions for multiple diseases. 
              Early detection saves lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="healthcare" 
                size="xl"
                onClick={() => navigate("/signup")}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-4">
              {["No credit card required", "HIPAA Compliant", "Free trial"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold font-heading text-gradient">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Get disease predictions in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="healthcare-card p-8 text-center h-full">
                  <div className="text-5xl font-bold text-primary/10 font-heading mb-4">
                    {step.step}
                  </div>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary mb-4">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Why Choose MediPredict?
            </h2>
            <p className="text-muted-foreground text-lg">
              Advanced technology meets healthcare excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="healthcare-card p-6 space-y-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-heading">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="healthcare-card p-8 md:p-16 gradient-primary text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust MediPredict for early disease detection. 
              Start your health monitoring journey today.
            </p>
            <Button 
              size="xl"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold font-heading">MediPredict</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 MediPredict. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
