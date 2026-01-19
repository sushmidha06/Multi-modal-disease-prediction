import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Printer, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Activity,
  Pill,
  Apple,
  Dumbbell,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const extractedParameters = [
  { name: "Fasting Blood Glucose", value: "142 mg/dL", reference: "70-100 mg/dL", status: "high" },
  { name: "HbA1c (Glycated Hemoglobin)", value: "6.8%", reference: "< 5.7%", status: "high" },
  { name: "Total Cholesterol", value: "210 mg/dL", reference: "< 200 mg/dL", status: "medium" },
  { name: "LDL Cholesterol", value: "135 mg/dL", reference: "< 100 mg/dL", status: "high" },
  { name: "HDL Cholesterol", value: "45 mg/dL", reference: "> 40 mg/dL", status: "normal" },
  { name: "Triglycerides", value: "165 mg/dL", reference: "< 150 mg/dL", status: "medium" },
  { name: "Creatinine", value: "0.9 mg/dL", reference: "0.7-1.3 mg/dL", status: "normal" },
  { name: "Blood Urea Nitrogen", value: "15 mg/dL", reference: "7-20 mg/dL", status: "normal" },
];

const recommendations = [
  {
    icon: Apple,
    title: "Dietary Changes",
    items: [
      "Reduce sugar and refined carbohydrate intake",
      "Increase fiber-rich foods (vegetables, whole grains)",
      "Choose lean proteins and healthy fats",
      "Limit processed foods and sugary drinks"
    ]
  },
  {
    icon: Dumbbell,
    title: "Lifestyle Modifications",
    items: [
      "Aim for 150 minutes of moderate exercise per week",
      "Maintain a healthy body weight (BMI < 25)",
      "Get 7-8 hours of quality sleep",
      "Manage stress through relaxation techniques"
    ]
  },
  {
    icon: Stethoscope,
    title: "Medical Follow-up",
    items: [
      "Schedule appointment with endocrinologist",
      "Regular blood glucose monitoring",
      "Annual eye and kidney function tests",
      "Blood pressure checks every 3 months"
    ]
  }
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "normal":
      return "text-risk-low";
    case "medium":
      return "text-risk-medium";
    case "high":
      return "text-risk-high";
    default:
      return "text-muted-foreground";
  }
};

export default function DetailedReport() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/results")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">
                Detailed Medical Report
              </h1>
              <p className="text-muted-foreground text-sm">
                Complete analysis and recommendations
              </p>
            </div>
          </div>
          <div className="flex gap-2 ml-12 md:ml-0">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="healthcare" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Report Summary */}
        <div className="healthcare-card p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-heading mb-2">Analysis Summary</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Based on the analysis of your blood test report dated January 18, 2026, our AI model has detected 
                elevated blood glucose levels and HbA1c values that indicate a <strong>Medium Risk</strong> for 
                Type 2 Diabetes. The cholesterol profile also shows slight elevation that warrants attention. 
                Early intervention through lifestyle modifications can significantly improve these markers.
              </p>
            </div>
          </div>
        </div>

        {/* Extracted Parameters */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading">Extracted Medical Parameters</h2>
          <div className="healthcare-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-sm font-semibold">Parameter</th>
                    <th className="text-left p-4 text-sm font-semibold">Your Value</th>
                    <th className="text-left p-4 text-sm font-semibold">Reference Range</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedParameters.map((param, i) => (
                    <tr 
                      key={i}
                      className={cn(
                        "border-b border-border/50 hover:bg-muted/30 transition-colors",
                        i === extractedParameters.length - 1 && "border-b-0"
                      )}
                    >
                      <td className="p-4 text-sm font-medium">{param.name}</td>
                      <td className={cn("p-4 text-sm font-semibold", getStatusStyle(param.status))}>
                        {param.value}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{param.reference}</td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border capitalize",
                          param.status === "normal" && "risk-low",
                          param.status === "medium" && "risk-medium",
                          param.status === "high" && "risk-high"
                        )}>
                          {param.status === "normal" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {param.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Health Recommendations
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="healthcare-card p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                    <rec.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold font-heading">{rec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="healthcare" 
            size="lg" 
            className="flex-1"
          >
            Schedule Doctor Consultation
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => navigate("/history")}
          >
            View All Reports
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="healthcare-card p-4 bg-accent/30 border-primary/10">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Important:</strong> This report is generated by AI for informational 
              purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult with a 
              qualified healthcare provider before making any medical decisions.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
