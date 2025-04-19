import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircleIcon, Plus } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
// import { MultipleTab } from "./tabs/multiple";
// import { SingleTab } from "./tabs/single";

const MultipleTab = lazy(() => import("./tabs/multiple"));
const SingleTab = lazy(() => import("./tabs/single"));

interface Novel {
  value: string;
  text: string;
}

interface Volume {
  value: string;
  label: string;
}

export default function ChapterPostPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [novel, setNovel] = useState("");
  const [volume, setVolume] = useState("");

  useEffect(() => {
    window.ipcRenderer.invoke("get-novels-data").then(setNovels);
  }, []);

  useEffect(() => {
    if (novel && novel !== null) {
      window.ipcRenderer.invoke("get-novels-volumes", novel).then(setVolumes);
    }
  }, [novel]);

  function NovelVolumeSelector({
    novels,
    volumes,
    selectedNovel,
    selectedVolume,
    onNovelChange,
    onVolumeChange,
  }: {
    novels: Novel[];
    volumes: Volume[];
    selectedNovel: string;
    selectedVolume: string;
    onNovelChange: (value: string) => void;
    onVolumeChange: (value: string) => void;
  }) {
    return (
      <div className="flex flex-col gap-5 pb-5">
        <div className="space-y-2">
          <Label htmlFor="novel">Novel Selection</Label>
          <Select
            value={selectedNovel}
            onValueChange={onNovelChange}
            disabled={novels.length === 0}
          >
            <SelectTrigger id="novel" className="w-full">
              <SelectValue placeholder="Select a novel" />
            </SelectTrigger>
            <SelectContent>
              {novels.map((novel) => (
                <SelectItem key={novel.value} value={novel.value}>
                  {novel.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="volume">Volume Selection</Label>
            <Button type="button" size="sm" variant="outline" disabled>
              <Plus className="h-4 w-4 mr-1" /> New Volume
            </Button>
          </div>
          <Select
            value={selectedVolume}
            onValueChange={onVolumeChange}
            disabled={!selectedNovel || volumes.length === 0}
          >
            <SelectTrigger id="volume" className="w-full">
              <SelectValue placeholder="Select a volume" />
            </SelectTrigger>
            <SelectContent>
              {selectedNovel &&
                volumes.map((volume) => (
                  <SelectItem key={volume.value} value={volume.value}>
                    {volume.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h1 className="text-3xl font-bold mb-6">Post Chapter</h1>

      <div className="space-y-6 divide-y divide-border">
        <NovelVolumeSelector
          novels={novels}
          volumes={volumes}
          selectedNovel={novel}
          selectedVolume={volume}
          onNovelChange={(value) => {
            setNovel(value);
            window.ipcRenderer.send("novel-selected", value);
          }}
          onVolumeChange={setVolume}
        />

        <Suspense
          fallback={
            <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
              <LoaderCircleIcon className="animate-spin" />
            </div>
          }
        >
          <Tabs defaultValue="single" className="w-full flex-1">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="single">Single Chapter</TabsTrigger>
              <TabsTrigger value="multiple">Multiple Chapters</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="flex-1 flex">
              <SingleTab novel={novel} volume={volume} />
            </TabsContent>

            <TabsContent value="multiple">
              <MultipleTab novel={novel} volume={volume} />
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </div>
  );
}
