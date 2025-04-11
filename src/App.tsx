import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import UploadPage from "./pages/upload-page";

function App() {
  const [logedIn, setLogedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log(
      "[React App] Component mounted. Setting up URL change listener."
    );

    // TypeScript now knows about window.electronAPI and its methods
    if (window.ipcRenderer) {
      console.log("[React App] window.ipcRenderer is available.");

      // Listen for the "loged-in" event
      window.ipcRenderer.on("loged-in", () => {
        setLogedIn(true);
        console.log("[React App] Logged in successfully.");
      });
    } else {
      console.error(
        "[React App] window is not available. Preload script might have failed."
      );
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {logedIn ? (
        <UploadPage />
      ) : (
        <div className="flex min-h-screen items-center justify-center p-4 flex-1">
          <Loader2 className="animate-spin " />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
