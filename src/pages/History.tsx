import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar,
  ChevronRight,
  Download,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

const historyData = [
  {
    id: "1",
    date: "January 18, 2026",
    reportType: "Blood Test Report",
    disease: "Type 2 Diabetes",
    riskLevel: "Medium",
    accuracy: 94.7,
  },
  {
    id: "2",
    date: "January 10, 2026",
    reportType: "ECG Report",
    disease: "Arrhythmia",
    riskLevel: "Low",
    accuracy: 91.2,
  },
  {
    id: "3",
    date: "January 5, 2026",
    reportType: "Liver Function Test",
    disease: "Fatty Liver",
    riskLevel: "Low",
    accuracy: 88.5,
  },
  {
    id: "4",
    date: "December 28, 2025",
    reportType: "Kidney Function Test",
    disease: "Normal",
    riskLevel: "Low",
    accuracy: 96.1,
  },
  {
    id: "5",
    date: "December 15, 2025",
    reportType: "Blood Test Report",
    disease: "Anemia",
    riskLevel: "Medium",
    accuracy: 89.8,
  },
  {
    id: "6",
    date: "December 1, 2025",
    reportType: "Thyroid Panel",
    disease: "Hypothyroidism",
    riskLevel: "High",
    accuracy: 92.3,
  },
];

const getRiskStyles = (level: string) => {
  switch (level) {
    case "Low":
      return "risk-low";
    case "Medium":
      return "risk-medium";
    case "High":
      return "risk-high";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = historyData.filter(
    item =>
      item.reportType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.disease.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              Prediction History
            </h1>
            <p className="text-muted-foreground">
              View and manage your past medical report analyses
            </p>
          </div>
          <Button variant="healthcare" onClick={() => navigate("/upload")}>
            Upload New Report
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by report type or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Reports", value: historyData.length },
            { label: "Low Risk", value: historyData.filter(h => h.riskLevel === "Low").length },
            { label: "Avg. Accuracy", value: `${(historyData.reduce((acc, h) => acc + h.accuracy, 0) / historyData.length).toFixed(1)}%` },
          ].map((stat, i) => (
            <div key={i} className="healthcare-card p-4 text-center">
              <p className="text-2xl font-bold font-heading text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* History List - Desktop Table */}
        <div className="hidden md:block healthcare-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-semibold">Date</th>
                  <th className="text-left p-4 text-sm font-semibold">Report Type</th>
                  <th className="text-left p-4 text-sm font-semibold">Prediction</th>
                  <th className="text-left p-4 text-sm font-semibold">Risk Level</th>
                  <th className="text-left p-4 text-sm font-semibold">Accuracy</th>
                  <th className="text-right p-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, i) => (
                  <tr 
                    key={item.id}
                    className={cn(
                      "border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer",
                      i === filteredHistory.length - 1 && "border-b-0"
                    )}
                    onClick={() => navigate("/results")}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{item.reportType}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{item.disease}</td>
                    <td className="p-4">
                      <span className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full border",
                        getRiskStyles(item.riskLevel)
                      )}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full gradient-primary rounded-full"
                            style={{ width: `${item.accuracy}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{item.accuracy}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* History List - Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredHistory.map((item) => (
            <div 
              key={item.id}
              className="healthcare-card p-4 cursor-pointer"
              onClick={() => navigate("/results")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.reportType}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-full border",
                  getRiskStyles(item.riskLevel)
                )}>
                  {item.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Prediction</p>
                  <p className="font-medium">{item.disease}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="font-medium text-primary">{item.accuracy}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="healthcare-card p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold font-heading mb-2">No reports found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Try adjusting your search or upload a new report.
            </p>
            <Button variant="healthcare" onClick={() => navigate("/upload")}>
              Upload Report
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
