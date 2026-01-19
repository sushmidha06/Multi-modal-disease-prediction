import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileText, 
  History, 
  Heart, 
  Brain, 
  Stethoscope,
  Activity,
  TrendingUp,
  ArrowRight,
  Calendar,
  CheckCircle2
} from "lucide-react";

const quickActions = [
  {
    icon: Upload,
    title: "Upload Report",
    description: "Upload a new medical report for analysis",
    path: "/upload",
    color: "bg-primary",
  },
  {
    icon: FileText,
    title: "View Results",
    description: "Check your latest prediction results",
    path: "/results",
    color: "bg-secondary",
  },
  {
    icon: History,
    title: "History",
    description: "View all your past predictions",
    path: "/history",
    color: "bg-accent-foreground",
  },
];

const supportedDiseases = [
  { name: "Diabetes", icon: Activity, accuracy: "97%" },
  { name: "Heart Disease", icon: Heart, accuracy: "95%" },
  { name: "Liver Disease", icon: Stethoscope, accuracy: "94%" },
  { name: "Kidney Disease", icon: Brain, accuracy: "96%" },
];

const recentActivity = [
  { date: "Jan 15, 2026", type: "Blood Test", status: "Completed", risk: "Low" },
  { date: "Jan 10, 2026", type: "ECG Report", status: "Completed", risk: "Medium" },
  { date: "Jan 5, 2026", type: "Liver Panel", status: "Completed", risk: "Low" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20 lg:pb-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              Good morning, <span className="text-gradient">Sarah</span> 👋
            </h1>
            <p className="text-muted-foreground">
              Track your health predictions and monitor your wellness journey.
            </p>
          </div>
          <Button 
            variant="healthcare" 
            size="lg"
            onClick={() => navigate("/upload")}
            className="w-full md:w-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New Report
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Reports Analyzed", value: "12", icon: FileText, trend: "+2 this month" },
            { label: "Predictions Made", value: "15", icon: Brain, trend: "98% accuracy" },
            { label: "Low Risk Results", value: "10", icon: CheckCircle2, trend: "83% of total" },
            { label: "Days Active", value: "45", icon: Calendar, trend: "Keep it up!" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="healthcare-card p-5 space-y-3"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <p className="text-xs text-secondary font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="healthcare-card p-6 text-left group"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${action.color} mb-4`}>
                  <action.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold font-heading mb-1 flex items-center gap-2">
                  {action.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Supported Diseases */}
          <div className="healthcare-card p-6">
            <h2 className="text-lg font-semibold font-heading mb-4">Supported Diseases</h2>
            <div className="space-y-3">
              {supportedDiseases.map((disease, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <disease.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{disease.name}</span>
                  </div>
                  <span className="text-sm text-secondary font-semibold">{disease.accuracy}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              + More diseases coming soon
            </p>
          </div>

          {/* Recent Activity */}
          <div className="healthcare-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold font-heading">Recent Activity</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/history")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      activity.risk === "Low" ? "risk-low" : "risk-medium"
                    }`}>
                      {activity.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Tips Banner */}
        <div className="healthcare-card p-6 gradient-primary text-primary-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold font-heading">💡 Health Tip of the Day</h3>
              <p className="text-primary-foreground/90 text-sm max-w-xl">
                Regular health checkups can help detect potential health issues before they become serious. 
                Upload your medical reports regularly for continuous monitoring.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 shrink-0"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
