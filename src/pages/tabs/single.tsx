import { useEffect, useState } from "react";

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
import { useForm } from "react-hook-form";
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

export function SingleTab({
  novel,
  volume,
}: {
  novel: string;
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

  // Reset volume when novel changes

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    window.ipcRenderer.send("process-data", {
      ...values,
      novel,
      volume,
    });
  }

  useEffect(() => {
    window.ipcRenderer.on(
      "data-processed-response",
      (
        _,
        response: {
          status: string;
          id: string;
        }
      ) => {
        if (response && response.status === "success") {
          form.reset();
        } else {
          console.error(
            "Tab 1: Error processing data in Tab 2:",
            response ? response : "Unknown error"
          );
          // Handle the error as needed (e.g., retry, skip)
        }
      }
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 ">
        <Card className="p-6 flex-1 flex-col flex">
          <CardHeader>
            {/* <CardTitle>Chapter Content</CardTitle> */}
            {isLoading && <span className="text-xs">Sending Chapter...</span>}
          </CardHeader>
          <CardContent className="flex flex-col flex-1 gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">
              Post Chapter
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
