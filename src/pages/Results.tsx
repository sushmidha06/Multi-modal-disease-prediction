import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Download,
  Share2,
  ArrowRight,
  TrendingUp,
  Activity,
  Heart,
  Droplets
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock prediction result
const predictionResult = {
  disease: "Type 2 Diabetes",
  riskLevel: "Medium" as "Low" | "Medium" | "High",
  accuracy: 94.7,
  confidence: 89,
  analyzedAt: "January 18, 2026 at 10:32 AM",
  reportType: "Blood Test Report",
};

const keyIndicators = [
  { label: "Blood Glucose", value: "142 mg/dL", status: "high", normal: "70-100 mg/dL", icon: Droplets },
  { label: "HbA1c", value: "6.8%", status: "high", normal: "< 5.7%", icon: Activity },
  { label: "Cholesterol", value: "210 mg/dL", status: "medium", normal: "< 200 mg/dL", icon: Heart },
  { label: "Blood Pressure", value: "128/82", status: "normal", normal: "< 120/80", icon: TrendingUp },
];

const getRiskStyles = (level: string) => {
  switch (level) {
    case "Low":
      return { bg: "bg-[hsl(var(--risk-low)/0.1)]", text: "text-risk-low", border: "border-[hsl(var(--risk-low)/0.3)]" };
    case "Medium":
      return { bg: "bg-[hsl(var(--risk-medium)/0.1)]", text: "text-risk-medium", border: "border-[hsl(var(--risk-medium)/0.3)]" };
    case "High":
      return { bg: "bg-[hsl(var(--risk-high)/0.1)]", text: "text-risk-high", border: "border-[hsl(var(--risk-high)/0.3)]" };
    default:
      return { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "normal":
      return "bg-[hsl(var(--risk-low)/0.1)] text-risk-low border-[hsl(var(--risk-low)/0.3)]";
    case "medium":
      return "bg-[hsl(var(--risk-medium)/0.1)] text-risk-medium border-[hsl(var(--risk-medium)/0.3)]";
    case "high":
      return "bg-[hsl(var(--risk-high)/0.1)] text-risk-high border-[hsl(var(--risk-high)/0.3)]";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function Results() {
  const navigate = useNavigate();
  const riskStyles = getRiskStyles(predictionResult.riskLevel);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              Prediction Results
            </h1>
            <p className="text-muted-foreground text-sm">
              Analyzed on {predictionResult.analyzedAt}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="healthcare-card p-6 md:p-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Risk Indicator */}
            <div className={cn(
              "flex flex-col items-center justify-center p-6 rounded-2xl border-2",
              riskStyles.bg,
              riskStyles.border
            )}>
              {predictionResult.riskLevel === "High" ? (
                <AlertTriangle className={cn("h-12 w-12 mb-2", riskStyles.text)} />
              ) : (
                <CheckCircle2 className={cn("h-12 w-12 mb-2", riskStyles.text)} />
              )}
              <span className={cn("text-2xl font-bold", riskStyles.text)}>
                {predictionResult.riskLevel}
              </span>
              <span className="text-sm text-muted-foreground">Risk Level</span>
            </div>

            {/* Disease Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Predicted Condition</p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
                  {predictionResult.disease}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary rounded-full"
                        style={{ width: `${predictionResult.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{predictionResult.accuracy}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Model Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-secondary rounded-full"
                        style={{ width: `${predictionResult.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{predictionResult.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Indicators */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading">Key Health Indicators</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {keyIndicators.map((indicator, i) => (
              <div 
                key={i}
                className="healthcare-card p-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                      <indicator.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{indicator.label}</p>
                      <p className="text-xl font-bold font-heading">{indicator.value}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full border capitalize",
                    getStatusStyles(indicator.status)
                  )}>
                    {indicator.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Normal range: {indicator.normal}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Button 
            variant="healthcare" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/detailed-report")}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Detailed Report
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/upload")}
          >
            Upload Another Report
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="healthcare-card p-4 bg-accent/30">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> This prediction is for informational purposes only and should not replace 
            professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
