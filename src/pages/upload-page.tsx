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
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon, Plus } from "lucide-react";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

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

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.3 },
  },
};

const NovelVolumeSelector = React.memo(
  ({
    novels,
    volumes,
    selectedNovel,
    selectedVolume,
    onNovelChange,
    onVolumeChange,
    isLoading,
  }: {
    novels: Novel[];
    volumes: Volume[];
    selectedNovel: string;
    selectedVolume: string;
    onNovelChange: (value: string) => void;
    onVolumeChange: (value: string) => void;
    isLoading: boolean;
  }) => {
    // Use ref to track if component has already animated
    const hasAnimated = useRef(false);

    // Use custom variants that only animate on first render
    const containerVariants = {
      initial: hasAnimated.current
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    };

    // After the component mounts, mark it as animated
    useEffect(() => {
      hasAnimated.current = true;
    }, []);

    return (
      <motion.div
        key="novel-volume-selector"
        className="flex flex-col gap-5 pb-5"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <div className="space-y-2">
          <Label htmlFor="novel">Novel Selection</Label>
          <Select
            value={selectedNovel}
            onValueChange={onNovelChange}
            disabled={novels.length === 0 || isLoading}
          >
            <SelectTrigger id="novel" className="w-full">
              <SelectValue
                placeholder={isLoading ? "Loading novels..." : "Select a novel"}
              />
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="button" size="sm" variant="outline" disabled>
                <Plus className="h-4 w-4 mr-1" /> New Volume
              </Button>
            </motion.div>
          </div>
          <Select
            value={selectedVolume}
            onValueChange={onVolumeChange}
            disabled={!selectedNovel || volumes.length === 0 || isLoading}
          >
            <SelectTrigger id="volume" className="w-full">
              <SelectValue
                placeholder={
                  !selectedNovel
                    ? "Select a novel first"
                    : isLoading
                    ? "Loading volumes..."
                    : "Select a volume"
                }
              />
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
      </motion.div>
    );
  },
  // Custom comparison function for memo to prevent unnecessary re-renders
  (prevProps, nextProps) => {
    return (
      prevProps.selectedNovel === nextProps.selectedNovel &&
      prevProps.selectedVolume === nextProps.selectedVolume &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.novels.length === nextProps.novels.length &&
      prevProps.volumes.length === nextProps.volumes.length
    );
  }
);

// Give the component a display name for better debugging
NovelVolumeSelector.displayName = "NovelVolumeSelector";

export default function ChapterPostPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [novel, setNovel] = useState("");
  const [volume, setVolume] = useState("");
  const [activeTab, setActiveTab] = useState("single");
  const [isLoading, setIsLoading] = useState(true);

  // Use ref to track initial render state
  const isFirstRender = useRef(true);

  useEffect(() => {
    async function fetchNovels() {
      try {
        const data = await window.ipcRenderer.invoke("get-novels-data");
        setNovels(data);
      } finally {
        setIsLoading(false);
        isFirstRender.current = false;
      }
    }

    fetchNovels();
  }, []);

  useEffect(() => {
    if (novel && novel !== null) {
      setIsLoading(true);
      window.ipcRenderer
        .invoke("get-novels-volumes", novel)
        .then(setVolumes)
        .finally(() => setIsLoading(false));
    }
  }, [novel]);

  return (
    <motion.div
      className="flex flex-col flex-1 p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
        Post Chapter
      </motion.h1>

      <div className="space-y-6 divide-y divide-border flex-1 flex flex-col">
        {/* NovelVolumeSelector moved outside of animations and properly memoized */}
        <NovelVolumeSelector
          novels={novels}
          volumes={volumes}
          selectedNovel={novel}
          selectedVolume={volume}
          onNovelChange={(value) => {
            setNovel(value);
            setVolume("");
            window.ipcRenderer.send("novel-selected", value);
          }}
          onVolumeChange={setVolume}
          isLoading={isLoading}
        />

        <Suspense
          fallback={
            <motion.div
              className="min-h-[400px] flex flex-col items-center justify-center flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoaderCircleIcon className="animate-spin h-10 w-10 text-primary" />
              <motion.p
                className="mt-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading editor...
              </motion.p>
            </motion.div>
          }
        >
          <Tabs
            defaultValue="single"
            className="w-full flex-1 pt-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <motion.div
              variants={isFirstRender.current ? itemVariants : {}}
              initial={isFirstRender.current ? "initial" : false}
              animate={isFirstRender.current ? "animate" : false}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="single">Single Chapter</TabsTrigger>
                <TabsTrigger value="multiple">Multiple Chapters</TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="sync">
              <TabsContent
                key="single-tab"
                value="single"
                className="flex-1 flex"
              >
                <motion.div
                  key="single-tab"
                  className="flex flex-1 flex-col"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <SingleTab novel={novel} volume={volume} />
                </motion.div>
              </TabsContent>

              <TabsContent value="multiple" key="multiple-tab">
                <motion.div
                  key="multiple-tab"
                  className="flex flex-1 flex-col"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <MultipleTab novel={novel} volume={volume} />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </Suspense>
      </div>
    </motion.div>
  );
}
