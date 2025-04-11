import { Plus, Upload } from "lucide-react";
import { useState } from "react";

import Editor from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface File {
  id: string;
  content: string;
  chapterNumber: string;
  chapterTitle: string;
}

interface Novel {
  value: string;
  label: string;
}

interface Volume {
  value: string;
  label: string;
}

export function MultipleTab({
  novels,
  novelSelected,
  volumes,
}: {
  novels: Novel[];
  volumes: Volume[];
  novelSelected: (value: string) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const [openChapterContent, setOpenChapterContent] = useState<string | null>(
    null
  );

  const [selectedNovel, setSelectedNovel] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");

  const handleNovelChange = (value: string) => {
    novelSelected(value);
    setSelectedNovel(value);
    setSelectedVolume("");
  };

  const handleFileChange = async () => {
    // console.log("🚀 ~ handleMultipleChaptersSubmit ~ e:", e);
    const filePath = await window.ipcRenderer.invoke("open-file-dialog");
    if (filePath) {
      const htmlContent = await window.ipcRenderer.invoke(
        "read-and-convert-file",
        filePath
      );
      console.log("🚀 ~ handleFileChange ~ htmlContent:", htmlContent);
      return;
      setSelectedFile((prev) => [
        ...(prev || []),
        {
          id: crypto.randomUUID(),
          content: htmlContent,
          chapterTitle: "",
          chapterNumber: "",
        },
      ]);
    }
  };

  const handleMultipleChaptersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const filePath = await ipcRenderer.invoke("open-file-dialog");
    // if (filePath) {
    //   const htmlContent = await ipcRenderer.invoke(
    //     "read-and-convert-file",
    //     filePath
    //   );
    //   console.log(htmlContent);
    // }
    // Handle submission logic here
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleMultipleChaptersSubmit} className="space-y-6">
        <div className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Chapters</Label>
            <div className="border-2 border-dashed  rounded-lg p-8 text-center border-border">
              <div
                className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
                onClick={handleFileChange}
              >
                <Upload className="h-10 w-10 " />
                <span className="text-sm font-medium">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs ">
                  ZIP file for multiple chapters or single file for one chapter
                </span>
              </div>
            </div>
          </div>

          <div>
            {selectedFile &&
              selectedFile.map((file) => (
                <div key={file.id} className="p-4 rounded-lg">
                  <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="chapterNumber">Chapter Number</Label>
                        <Input
                          id="chapterNumber"
                          type="number"
                          value={
                            selectedFile &&
                            selectedFile.find((file) => file.id === file.id)
                              ?.chapterNumber
                          }
                          onChange={(e) => {
                            setSelectedFile(
                              (prev) =>
                                prev &&
                                prev.map((file) => {
                                  if (file.id === file.id) {
                                    file.chapterNumber = e.target.value;
                                  }
                                  return file;
                                })
                            );
                          }}
                          placeholder="e.g., 1"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chapterTitle">Chapter Title</Label>
                        <Input
                          id="chapterTitle"
                          value={
                            selectedFile &&
                            selectedFile.find((file) => file.id === file.id)
                              ?.chapterTitle
                          }
                          onChange={(e) => {
                            setSelectedFile(
                              (prev) =>
                                prev &&
                                prev.map((file) => {
                                  if (file.id === file.id) {
                                    file.chapterTitle = e.target.value;
                                  }
                                  return file;
                                })
                            );
                          }}
                          placeholder="Enter chapter title"
                        />
                      </div>
                    </div>
                    <CardContent className="flex flex-col flex-1">
                      {openChapterContent && openChapterContent === file.id && (
                        <Editor
                          content={file.content}
                          onChange={(value) => {
                            setSelectedFile(
                              (prev) =>
                                prev &&
                                prev.map((file) => {
                                  if (file.id === file.id) {
                                    file.content = value;
                                  }
                                  return file;
                                })
                            );
                          }}
                          editorClassName="max-h-44 overflow-clip"
                        />
                      )}
                    </CardContent>
                    <CardFooter>
                      {openChapterContent === file.id ? (
                        <Button
                          type="button"
                          onClick={() => {
                            setOpenChapterContent(null);
                          }}
                        >
                          Close
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setOpenChapterContent(file.id);
                          }}
                        >
                          open chapter content
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Upload and Process
        </Button>
      </form>
    </Card>
  );
}
