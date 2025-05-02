import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import ChapterPostPage from "./pages/upload-page";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // Initialize to null

  useEffect(() => {
    window.ipcRenderer.send("auth-check-request");

    const handleLoggedIn = () => {
      setLoggedIn(true);
      console.log("[React App] Logged in successfully.");
    };

    const handleLoggedOut = () => {
      setLoggedIn(false);
      console.log("[React App] Not logged in.");
    };

    window.ipcRenderer.on("logged-in", handleLoggedIn);
    window.ipcRenderer.on("logged-out", handleLoggedOut); // Listen for logged-out too
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {loggedIn ? (
        <ChapterPostPage />
      ) : loggedIn === null ? (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <LoginPlaceholder />
      )}
    </ThemeProvider>
  );
}

const LoginPlaceholder = () => (
  <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
    <p>Please log in in the main application window.</p>
    {/* You might want to provide more guidance here */}
  </div>
);

export default App;
