import Editor from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const chapterSchema = z.object({
  chapterNumber: z.string().min(1, {
    message: "Chapter number is required",
  }),
  chapterTitle: z.string().min(1, {
    message: "Chapter title is required",
  }),
  content: z.string().min(1, {
    message: "Chapter content is required",
  }),
  postOnOtherWebsite: z.boolean(),
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
};

type NovelData = {
  cat: string;
  series: string;
  text: string;
};

type chapterPostData = {
  id: string;
  volume: string;
  series: string;
  cat: string;
  chapterNumber: string;
  chapterTitle: string;
  content: string;
  postOnOtherWebsite: boolean;
};

export default function SingleTab({
  novel,
  volume,
}: {
  novel: NovelData | null;
  volume: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      chapterNumber: "1",
      postOnOtherWebsite: true,
      content: "",
      chapterTitle: "",
    },
  });
  function extractTextFromAllElements(htmlString: string): string[] {
    const textContent: string[] = [];
    const elementRegex = /<([a-zA-Z0-9]+)[^>]*>([^<]*?)<\/\1>/g;
    let match;

    while ((match = elementRegex.exec(htmlString)) !== null) {
      const innerText = match[2].trim(); // The text content within the tags

      if (innerText) {
        textContent.push(innerText);
      }
    }

    return textContent;
  }

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    if (novel === null) {
      toast.error("Please select a novel.");
      return;
    }

    const { cat, series } = novel;

    setIsLoading(true);
    toast.loading("Posting chapter...");

    const paragraphs = extractTextFromAllElements(values.content);
    const contentString = paragraphs.join("\n\n");
    const chapterData: chapterPostData = {
      id: crypto.randomUUID(),
      volume,
      series,
      cat,
      chapterNumber: values.chapterNumber,
      chapterTitle: values.chapterTitle,
      content: contentString,
      postOnOtherWebsite: values.postOnOtherWebsite,
    };
    try {
      const res = await window.ipcRenderer.invoke("post-chapter", chapterData);

      if (res) {
        toast.success("Chapter posted successfully!");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to post chapter");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1">
        <motion.div
          className="flex-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card
            className="p-6 flex-1 flex-col flex aria-disabled:border-ctp-green"
            aria-disabled={isLoading}
          >
            <CardContent className="flex flex-col flex-1 gap-5">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={itemVariants}
              >
                <FormField
                  control={form.control}
                  name="chapterNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chapterTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chapter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="flex flex-col gap-4 flex-1">
                  <CardHeader>
                    <CardTitle>Chapter Content</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Editor
                              content={field.value}
                              onChange={(content) => field.onChange(content)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="postOnOtherWebsite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Post on the other website</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            </CardContent>
            <CardFooter>
              <motion.div
                className="w-full md:w-auto"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Posting..." : "Post Chapter"}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
    </Form>
  );
}
