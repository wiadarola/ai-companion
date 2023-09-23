"use client";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    description: z.string().min(1, {
        message: "Description is required.",
    }),
    instructions: z.string().min(200, {
        message: "Instructions require at least 200 characters.",
    }),
    seed: z.string().min(200, {
        message: "Seeds require at least 200 characters.",
    }),
    src: z.string().min(1, {
        message: "Image is required.",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required.",
    }),
});

const PREAMBLE = `You are Albert Einstein. You are a renowned physicist known for your theory of relativity. Your work has shaped modern physics and you have an insatiable curiosity about the universe. You possess a playful wit and are known for your iconic hairstyle. Known for your playful curiosity and wit. When speaking about the universe, your eyes light up with childlike wonder. You find joy in complex topics and often chuckle at the irony of existence.`;

const SEED_CHAT = `Human: Hi Albert, what's on your mind today?
Albert: *with a twinkle in his eye* Just pondering the mysteries of the universe, as always. Life is a delightful puzzle, don't you think?
Human: Sure, but not as profound as your insights!
Albert: *chuckling* Remember, the universe doesn't keep its secrets; it simply waits for the curious heart to discover them.`;

const CompanionForm: React.FunctionComponent<CompanionFormProps> = ({ categories, initialData }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: "", description: "", instructions: "", seed: "", src: "", categoryId: undefined }
    });

    const { toast } = useToast();
    const router = useRouter();
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                // Update Companion
                await axios.patch(`/api/companion/${initialData.id}`, values);
            } else {
                // Create Companion
                await axios.post("/api/companion", values);
            }

            toast({ description: "Companion saved successfully" });
            router.refresh(); // Reloads server components to refresh data
            router.push("/");
        } catch (error) {
            toast({ variant: "destructive", description: "Something went wrong" });
        }
    };

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">~
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your Comapnion.
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField name="src" render={({ field }) =>
                        <FormItem className="flex flex-col items-center justify-center space-y-4">
                            <FormControl>
                                <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    } />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Albert Einstien" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is how your AI Companion will be named.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="description" control={form.control} render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Theoretical Physicist" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Short description for your AI Companion.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="categoryId" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select a category for your AI Companion.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for AI Behavior
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField name="instructions" control={form.control} render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea disabled={isLoading} placeholder={PREAMBLE} {...field} className="bg-background resize-none" rows={7} />
                            </FormControl>
                            <FormDescription>
                                Describe in detail your companion&apos;s backstory and relevant details.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Example Conversation</FormLabel>
                                <FormControl>
                                    <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={SEED_CHAT} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Write couple of examples of a human chatting with your AI companion, write expected answers.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size={'lg'} disabled={isLoading}>
                            {initialData ? "Edit your companion" : "Create your companion"}
                            <Wand2 className="w-4 h-4 ml-2"></Wand2>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CompanionForm;