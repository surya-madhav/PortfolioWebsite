"use client"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { JSX, SVGProps } from "react"
import * as z from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
    message: z.string().min(1, { message: "Message is required" })
});

export default function ContactMeDialog() {
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log('Preparing to send message:', data);
    
        try {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
    
          const responseData = await response.json();
          console.log('Message sent successfully:', responseData);
    
          form.reset();
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      };
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-md bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 sm:w-fit hover:border hover:border-white px-6 py-3">Contact Me</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 justify-center">
                <DialogHeader className="justify-center sm:justify-center">
                    <DialogTitle className="text-center">Get in Touch</DialogTitle>
                    {/* <DialogDescription className="text-gray-400 text-center">Fill out the form below to send me a message.</DialogDescription> */}
                </DialogHeader>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField control={form.control} name="email" render={
                                ({ field }) => {
                                    return (
                                        <FormItem className="grid grid-cols-5 gap-6 items-center" >
                                            <FormLabel className="text-center" htmlFor="email">
                                                Email
                                            </FormLabel>
                                            <div className="col-span-4 flex flex-col items-center">
                                                <FormControl>
                                                    <Input id="email" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )
                                }
                            } />

                            <div className="grid gap-4 py-4">
                                <FormField control={form.control} name="message" render={
                                    ({ field }) => {
                                        return (
                                            <FormItem className="grid grid-cols-5 gap-6 items-center" >
                                                <FormLabel className="text-center" htmlFor="message">
                                                    Message
                                                </FormLabel>
                                                <div className="col-span-4 flex flex-col items-center">
                                                    <FormControl>
                                                        <Textarea id="message" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )
                                    }
                                } />
                            </div>
                            <div className="flex justify-center gap-4">
                                <Link className="text-gray-100 hover:text-orange-300" href="https://twitter.com/surya_madhav_" target="_blank">
                                    <TwitterIcon className="h-6 w-6" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link className="text-gray-100 hover:text-orange-300" href="https://www.linkedin.com/in/rssmv/" target="_blank">
                                    <LinkedinIcon className="h-6 w-6" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link className="text-gray-100 hover:text-orange-300" href="https://github.com/surya-madhav" target="_blank">
                                    <GithubIcon className="h-6 w-6" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </div>
                        </div>
                        <DialogFooter className="items-center justify-center sm:justify-center">
                            <Button type="submit" className="border border-orange-400 w-fit">Send Message</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}


function LinkedinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}