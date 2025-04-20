import { motion } from "motion/react";
import React from "react";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { Label } from "../ui/label";

const UploadSection = React.memo(
  ({
    onFileUpload,
    disabled,
    hasChapters,
  }: {
    onFileUpload: () => void;
    disabled: boolean;
    hasChapters: boolean;
  }) => {
    // Added aria-disabled for accessibility
    const commonButtonProps = {
      onClick: disabled ? undefined : onFileUpload,
      disabled: disabled,
      "aria-disabled": disabled,
    };

    return (
      <motion.div
        layout // Animate layout changes (e.g., switch between button and dropzone)
        key={hasChapters ? "button-view" : "dropzone-view"} // More descriptive key
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }} // Slightly adjusted animation
      >
        {hasChapters ? (
          <Button
            {...commonButtonProps}
            variant="outline"
            className="w-full flex flex-col items-center justify-center h-24" // Adjusted style for consistency
            size="lg" // Keep size large if intended
          >
            <Upload className="h-8 w-8 mb-1" />{" "}
            {/* Adjusted icon size/margin */}
            <span className="text-sm font-medium">
              Upload More Files (ZIP or Single)
            </span>
          </Button>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="chapter-upload-area">Upload Chapters</Label>
            <div
              id="chapter-upload-area"
              role="button" // Make it behave like a button for screen readers
              tabIndex={disabled ? -1 : 0} // Make it focusable when enabled
              className={`border-2 border-dashed rounded-lg p-8 text-center border-border transition-colors duration-200 ${
                disabled
                  ? "opacity-50 cursor-not-allowed bg-muted/50"
                  : "cursor-pointer hover:border-primary hover:bg-muted/30"
              }`}
              onClick={commonButtonProps.onClick}
              onKeyDown={(e) => {
                // Allow activation with Enter/Space
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onFileUpload();
                }
              }}
              aria-label="Upload chapter files"
              aria-disabled={disabled}
            >
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                {" "}
                {/* Prevent inner elements from capturing click */}
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {disabled ? "Processing..." : "Click or Drag Files Here"}
                </span>
                <span className="text-xs text-muted-foreground">
                  ZIP file for multiple chapters, or a single DOCX/TXT/HTML file
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }
);
UploadSection.displayName = "UploadSection"; // Add display name for easier debugging

export default UploadSection;
