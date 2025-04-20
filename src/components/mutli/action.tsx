import { AnimatePresence, motion } from "framer-motion";
import { Plus, Upload, X } from "lucide-react";

interface UploadActionProps {
  addNew: () => void;
  onCancel: () => void;
  onPost: () => void;
  posting?: boolean;
  progress: number;
  hasChapters: boolean;
}

export default function ActionButtons({
  addNew,
  onCancel,
  onPost,
  progress,
  hasChapters,
  posting = false,
}: UploadActionProps) {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence mode="wait">
        {!posting ? (
          <div className="flex flex-col gap-4" key="not-uploading">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPost}
              disabled={!hasChapters}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                hasChapters
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Upload className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addNew}
              className="w-14 h-14 rounded-full bg-ctp-crust flex items-center justify-center shadow-lg border border-input"
            >
              <Plus className="h-6 w-6" />
            </motion.button>
          </div>
        ) : (
          <div className="relative" key="uploading">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCancel}
                className="w-14 h-14 rounded-full  flex items-center justify-center shadow-lg border border-input z-10 relative"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Circular progress indicator */}
              <svg className=" w-14 mt-5 -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-primary"
                  strokeWidth="8"
                  strokeDasharray="289.02652413026095"
                  strokeDashoffset={
                    289.02652413026095 - (289.02652413026095 * progress) / 100
                  }
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  initial={{ strokeDashoffset: 289.02652413026095 }}
                  animate={{
                    strokeDashoffset:
                      289.02652413026095 -
                      (289.02652413026095 * progress) / 100,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
