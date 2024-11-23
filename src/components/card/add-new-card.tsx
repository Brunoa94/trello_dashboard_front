"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import Service from "@/core/service";
import { CreateCard } from "@/models/create-card";

interface Props {}

const AddNewCard = (props: Props) => {
  const priorities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
  const storyTypes = ["BUGFIX", "DESIGN", "DEVELOPMENT", "QA", "SPIKE"];
  const avatars = ["Bruno", "John", "Anna", "Magui", "Will", "Tom"];
  const statuses = ["TO_DO", "IN_PROGRESS", "IN_TESTING", "DONE"];
  const formSchema = z.object({
    title: z.string().min(2).max(100),
    priority: z.string(),
    story_type: z.string(),
    avatar: z.string(),
    status: z.string(),
    created_date: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: "",
      story_type: "",
      avatar: "",
      status: "",
      created_date: new Date().toISOString(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const service = new Service();
    const createCard: CreateCard = values;

    await service.createCard(createCard);
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-10">
      <div className="w-[calc(50%)] px-8 py-8 flex flex-col items-center bg-white rounded-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the responsible" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {avatars.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0) + priority.slice(1).toLowerCase()}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="story_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the story type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {storyTypes.map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority.toUpperCase()}
                        >
                          {priority.charAt(0) + priority.slice(1).toLowerCase()}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the story type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority.toUpperCase()}
                        >
                          {`${
                            priority.charAt(0) + priority.slice(1).toLowerCase()
                          }`.replace("_", " ")}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-sky-700 hover:shadow-xl hover:bg-sky-700"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewCard;
