import { Plus } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { NovelSelector } from "./novel-select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Novel {
  cat: string;
  series: string;
  text: string;
}

interface Volume {
  value: string;
  label: string;
}

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
    selectedNovel: Novel | null;
    selectedVolume: string;
    onNovelChange: (value: Novel | null) => void;
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
          <NovelSelector
            options={novels}
            value={selectedNovel}
            onValueChange={onNovelChange}
            placeholder="Select a novel"
            disabled={isLoading}
          />
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

export default NovelVolumeSelector;
