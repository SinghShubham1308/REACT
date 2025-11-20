import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Lock, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface LoginFormProps {
  onLogin: () => void;
  onClose: () => void;
}

export function LoginForm({ onLogin, onClose }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 3. Mock logic (setTimeout) ko real API call se replace karein
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

      // Aapke AuthenticationController ke endpoint par call karein
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`, // Endpoint check karein
        credentials
      );

      // 4. Token ko response se nikaalein (backend par depend karta hai)
      if (response.data && response.data.token) {
        // 5. Token ko localStorage mein save karein
        localStorage.setItem("authToken", response.data.token);

        toast.success("Login successful!");
        onLogin(); // App.tsx ko batayein ki login ho gaya
      } else {
        toast.error("Login failed: Invalid response from server.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false); // Loading state hamesha false karein
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            {/* <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Demo credentials:</p>
              <p>Username: <code className="text-xs bg-accent px-2 py-1 rounded">admin</code></p>
              <p>Password: <code className="text-xs bg-accent px-2 py-1 rounded">admin123</code></p>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
