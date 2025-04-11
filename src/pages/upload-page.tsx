import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultipleTab } from "./tabs/multiple";
import { SingleTab } from "./tabs/single";
import { useEffect, useState } from "react";

interface Novel {
  value: string;
  label: string;
}

interface Volume {
  value: string;
  label: string;
}

export default function ChapterPostPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ window.ipcRenderer:", window.ipcRenderer);
    if (window.ipcRenderer) {
      window.ipcRenderer.on("novels-data", (_, data) => {
        window.ipcRenderer.send("console-log", "Novels data received");
        setNovels(data);
      });
      window.ipcRenderer.on("novels-volumes", (_, data) => {
        console.log("🚀 ~ window.ipcRenderer.on ~ data:", data);
        window.ipcRenderer.send("console-log", "Volumes data received");
        setVolumes(data);
      });
    } else {
      console.error(
        "[React App] window is not available. Preload script might have failed."
      );
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 p-4">
      <h1 className="text-3xl font-bold mb-6">Post Chapter</h1>

      <Tabs defaultValue="single" className="w-full flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single Chapter</TabsTrigger>
          <TabsTrigger value="multiple">Multiple Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="flex-1 flex">
          <SingleTab
            novels={novels}
            volumes={volumes}
            novelSelected={(value) => {
              console.log("Novel selected");
              window.ipcRenderer.send("novel-selected", value);
            }}
          />
        </TabsContent>

        <TabsContent value="multiple">
          <MultipleTab
            novels={novels}
            volumes={volumes}
            novelSelected={(value) => {
              console.log("Novel selected");
              window.ipcRenderer.send("novel-selected", value);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
