import { Plus } from "lucide-react";
import { useEffect } from "react";

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Novel {
  value: string;
  label: string;
}

interface Volume {
  value: string;
  label: string;
}

const chapterSchema = z.object({
  novel: z.string().min(1, {
    message: "Novel is required",
  }),
  volume: z.string().min(1, {
    message: "Volume is required",
  }),
  chapterNumber: z.string().min(1, {
    message: "Chapter number is required",
  }),
  chapterTitle: z.string().min(1, {
    message: "Chapter title is required",
  }),
  chapterContent: z.string().min(1, {
    message: "Chapter content is required",
  }),
  postOnOtherWebsite: z.boolean(),
});

export function SingleTab({
  novels,
  novelSelected,
  volumes,
}: {
  novels: Novel[];
  volumes: Volume[];
  novelSelected: (value: string) => void;
}) {
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
  });

  // Reset volume when novel changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'novel') {
        form.setValue('volume', '');
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof chapterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 flex-1 flex-col flex">
          <CardContent className="flex flex-col flex-1 gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="novel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Novel Selection</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        novelSelected(value);
                        field.onChange(value);
                      }}
                      disabled={novels.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger id="novel" className="w-full">
                          <SelectValue placeholder="Select a novel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {novels.map((novel) => (
                          <SelectItem key={novel.value} value={novel.value}>
                            {novel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the novel for this chapter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Volume Selection</FormLabel>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-1" /> New Volume
                      </Button>
                    </div>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={volumes.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger id="volume" className="w-full">
                          <SelectValue placeholder="Select a volume" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {volumes.map((volume) => (
                          <SelectItem key={volume.value} value={volume.value}>
                            {volume.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="chapterNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 1"
                        {...field}
                      />
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
                      <Input
                        placeholder="Enter chapter title"
                        {...field}
                      />
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
                  name="chapterContent"
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
                    <FormLabel>
                      Post on the other website
                    </FormLabel>
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