import { Activity, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export function Header({ isAuthenticated = false, userName = "John Doe" }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-heading text-foreground">MediPredict</span>
            <span className="text-[10px] text-muted-foreground -mt-1">Multi-Disease Platform</span>
          </div>
        </div>

        {!isAuthPage && (
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive" />
                </Button>
                <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">Patient</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate("/login")}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="healthcare" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
