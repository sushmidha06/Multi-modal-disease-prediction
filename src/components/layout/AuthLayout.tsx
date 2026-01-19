import { ReactNode } from "react";
import { Header } from "./Header";
import { Activity, Shield, Heart, Brain } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-heading text-foreground">
                Advanced Disease <span className="text-gradient">Prediction</span> Platform
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Leveraging cutting-edge machine learning to analyze your medical reports and provide accurate disease predictions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Secure & Private", desc: "HIPAA compliant" },
                { icon: Heart, label: "Multi-Disease", desc: "10+ conditions" },
                { icon: Brain, label: "AI Powered", desc: "99% accuracy" },
                { icon: Activity, label: "Real-time", desc: "Instant results" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="healthcare-card p-4 flex items-start gap-3"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center">
            <div className="healthcare-card w-full max-w-md p-8 animate-fade-in">
              <div className="space-y-2 text-center mb-8">
                <h2 className="text-2xl font-bold font-heading">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
