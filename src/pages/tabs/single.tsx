import { useState } from "react";

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
import { toast } from "sonner";

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

export default function SingleTab({
  novel,
  volume,
}: {
  novel: string;
  volume: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  function getTwoNumbersFromString(
    inputValue: string
  ): [string | null, string | null] {
    const parts = inputValue.split("-");
    if (parts.length === 2) {
      const num1 = parts[0];
      const num2 = parts[1];
      return [
        isNaN(Number(num1)) ? null : num1,
        isNaN(Number(num2)) ? null : num2,
      ];
    }
    return [null, null];
  }
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      chapterNumber: "1",
      postOnOtherWebsite: true,
      content: "",
      chapterTitle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    const [cat, series] = getTwoNumbersFromString(novel);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    toast.loading("Posting chapter...");
    const res = await window.ipcRenderer.invoke("post-chapter", {
      id: crypto.randomUUID(),
      novel,
      volume,
      series,
      cat,
      chapterNumber: values.chapterNumber,
      chapterTitle: values.chapterTitle,
      content: values.content,
      postOnOtherWebsite: values.postOnOtherWebsite,
    });
    if (res) {
      setIsLoading(false);
      toast.success("Chapter posted successfully!");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1">
        <Card
          className="p-6 flex-1 flex-col flex aria-disabled:border-ctp-green"
          aria-disabled={isLoading}
        >
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
