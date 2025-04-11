import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/Tiptap";

interface Novel {
  value: string;
  label: string;
}

interface Volume {
  value: string;
  label: string;
}

export function SingleTab({
  novels,
  novelSelected,
  volumes,
}: {
  novels: Novel[];
  volumes: Volume[];
  novelSelected: (value: string) => void;
}) {
  const [selectedNovel, setSelectedNovel] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [postOnOtherWebsite, setPostOnOtherWebsite] = useState(true);

  const handleNovelChange = (value: string) => {
    console.log("🚀 ~ handleNovelChange ~ value:", value);
    novelSelected(value);
    setSelectedNovel(value);
    setSelectedVolume("");
  };

  const handleSingleChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      novel: selectedNovel,
      volume: selectedVolume,
      chapterNumber,
      chapterTitle,
      chapterContent,
      postOnOtherWebsite,
    });
    // Handle submission logic here
  };

  return (
    <form onSubmit={handleSingleChapterSubmit} className="space-y-6 flex-1 flex">
      <Card className="p-6 flex-1 flex-col flex">
        <CardContent className="flex flex-col flex-1 gap-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="novel">Novel Selection</Label>
              <Select
                value={selectedNovel}
                onValueChange={handleNovelChange}
                disabled={novels.length === 0}
              >
                <SelectTrigger id="novel" className="w-full">
                  <SelectValue placeholder="Select a novel" />
                </SelectTrigger>
                <SelectContent>
                  {novels.map((novel) => (
                    <SelectItem key={novel.value} value={novel.value}>
                      {novel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="volume">Volume Selection</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!selectedNovel}
                >
                  <Plus className="h-4 w-4 mr-1" /> New Volume
                </Button>
              </div>
              <Select
                value={selectedVolume}
                onValueChange={setSelectedVolume}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="chapterNumber">Chapter Number</Label>
              <Input
                id="chapterNumber"
                type="number"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                placeholder="e.g., 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapterTitle">Chapter Title</Label>
              <Input
                id="chapterTitle"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Enter chapter title"
              />
            </div>
          </div>

          <Card className="flex flex-col gap-4 flex-1 ">
            <CardHeader>
              <CardTitle>Chapter Content</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <Editor content={chapterContent} onChange={setChapterContent} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="post-other-website"
                checked={postOnOtherWebsite}
                onCheckedChange={(checked) =>
                  setPostOnOtherWebsite(checked as boolean)
                }
              />
              <Label htmlFor="post-other-website">
                Post on the other website
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto">
            Post Chapter
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
