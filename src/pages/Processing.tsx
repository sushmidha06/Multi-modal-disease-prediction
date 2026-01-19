import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  FileSearch, 
  FileType, 
  Database, 
  Brain, 
  CheckCircle2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const processingSteps = [
  {
    id: 1,
    icon: FileSearch,
    title: "Extracting Data",
    description: "Using OCR to extract text from your medical report",
    duration: 2000,
  },
  {
    id: 2,
    icon: FileType,
    title: "Identifying Report Type",
    description: "Analyzing document structure and report category",
    duration: 1500,
  },
  {
    id: 3,
    icon: Database,
    title: "Preprocessing Data",
    description: "Cleaning and normalizing medical parameters",
    duration: 2000,
  },
  {
    id: 4,
    icon: Brain,
    title: "ML Prediction",
    description: "Running disease prediction models",
    duration: 2500,
  },
];

export default function Processing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i);
        
        // Animate progress during this step
        const stepDuration = processingSteps[i].duration;
        const startProgress = (i / processingSteps.length) * 100;
        const endProgress = ((i + 1) / processingSteps.length) * 100;
        const progressIncrement = (endProgress - startProgress) / (stepDuration / 50);
        
        let currentProgress = startProgress;
        const progressInterval = setInterval(() => {
          currentProgress += progressIncrement;
          if (currentProgress >= endProgress) {
            currentProgress = endProgress;
            clearInterval(progressInterval);
          }
          setOverallProgress(currentProgress);
        }, 50);

        await new Promise(resolve => setTimeout(resolve, stepDuration));
        clearInterval(progressInterval);
        setCompletedSteps(prev => [...prev, i]);
      }
      
      // Navigate to results after all steps complete
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate("/results");
    };

    processSteps();
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 py-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-ring">
              <Brain className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">
            Analyzing Your Report
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our AI is processing your medical report. This usually takes about 30 seconds.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="healthcare-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          {processingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index && !isCompleted;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "healthcare-card p-5 transition-all duration-300",
                  isCompleted && "border-secondary/50 bg-secondary/5",
                  isCurrent && "border-primary/50 bg-primary/5 scale-[1.02]",
                  isPending && "opacity-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                    isCompleted && "bg-secondary text-secondary-foreground",
                    isCurrent && "gradient-primary text-primary-foreground",
                    isPending && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : isCurrent ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn(
                        "font-semibold font-heading",
                        isCompleted && "text-secondary",
                        isCurrent && "text-primary"
                      )}>
                        {step.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-xs text-secondary font-medium px-2 py-1 rounded-full bg-secondary/10">
                          Complete
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10 animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Step Progress Bar */}
                {isCurrent && (
                  <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary animate-shimmer" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="healthcare-card p-5 bg-accent/30 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Did you know?</span> Our ML models are trained on over 
            100,000 medical reports with 98%+ accuracy.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
