import NovelVolumeSelector from "@/components/NovelVolumeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const MultipleTab = lazy(() => import("./tabs/multiple"));
const SingleTab = lazy(() => import("./tabs/single"));

interface Novel {
  cat: string;
  series: string;
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

export default function ChapterPostPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [volumes, setVolumes] = useState<Volume[] | null>(null);
  const [novel, setNovel] = useState<Novel | null>(null);
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
      toast.loading("Loading volumes...", {
        dismissible: true,
        id: "volume-loading",
      });
      window.ipcRenderer
        .invoke("get-novels-volumes", novel.cat)
        .then(setVolumes)
        .catch(() => {
          toast.error("Failed to load volumes.");
        })
        .finally(() => {
          setIsLoading(false);
          toast.dismiss("volume-loading");
        });
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
          volumes={volumes ?? []}
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
