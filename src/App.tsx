import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import ChapterPostPage from "./pages/upload-page";

function App() {
  const [logedIn, setLogedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log(
      "[React App] Component mounted. Setting up URL change listener."
    );
    window.ipcRenderer.on("loged-in", () => {
      setLogedIn(true);
      console.log("[React App] Logged in successfully.");
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {logedIn ? (
        <ChapterPostPage />
      ) : (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
