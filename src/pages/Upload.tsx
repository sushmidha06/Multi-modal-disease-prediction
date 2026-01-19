import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  File, 
  X, 
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";

const supportedFormats = [
  { icon: FileText, format: "PDF", description: "Medical reports, lab results" },
  { icon: Image, format: "JPG/PNG", description: "Scanned documents, X-rays" },
  { icon: File, format: "DICOM", description: "Medical imaging files" },
];

export default function Upload() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate("/processing");
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold font-heading">
            Upload Medical Report
          </h1>
          <p className="text-muted-foreground">
            Upload your medical report for AI-powered disease prediction analysis.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`healthcare-card p-8 border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? "border-primary bg-accent/50 scale-[1.02]" 
              : uploadedFile 
                ? "border-secondary bg-secondary/5" 
                : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`h-20 w-20 rounded-2xl flex items-center justify-center transition-all ${
                  isDragging ? "gradient-primary scale-110" : "bg-accent"
                }`}>
                  <UploadIcon className={`h-10 w-10 ${isDragging ? "text-primary-foreground" : "text-primary"}`} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold font-heading">
                  {isDragging ? "Drop your file here" : "Drag and drop your file"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  or click to browse from your computer
                </p>
              </div>
              <label htmlFor="file-upload">
                <Button variant="healthcare" className="cursor-pointer" asChild>
                  <span>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.dicom"
                onChange={handleFileSelect}
              />
              <p className="text-xs text-muted-foreground">
                Maximum file size: 25MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-secondary flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <button
                    onClick={removeFile}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-destructive" />
                  </button>
                </div>
              </div>
              <Button 
                variant="healthcare" 
                size="lg" 
                className="w-full"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <>
                    Analyze Report
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Supported Formats */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading">Supported Formats</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {supportedFormats.map((format, i) => (
              <div 
                key={i}
                className="healthcare-card p-4 text-center space-y-2"
              >
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
                    <format.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="font-semibold">{format.format}</p>
                <p className="text-xs text-muted-foreground">{format.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="healthcare-card p-6 bg-accent/30">
          <div className="flex gap-4">
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold font-heading">Upload Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure the document is clear and readable</li>
                <li>• All pages should be properly scanned</li>
                <li>• Patient information should be visible</li>
                <li>• Upload recent reports for accurate predictions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
