"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TransactionType } from '@/lib/types'
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleOff, PlusSquare } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { FormField,FormLabel,FormItem,FormControl,FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

interface Props{
    type: TransactionType;

}

function CreateCategoryDialogue({type}:Props) {

    const [open, setOpen] =useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues:{
            type,
        }
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button
                variant={"ghost"}
                className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'
            >
                <PlusSquare className='mr-2 h-4 w-4'/>
                Create new
            </Button>
        </DialogTrigger>
        <DialogContent >
            <DialogHeader>
                <DialogTitle>
                    Create <span className={cn(
                        "m-1",
                        type === "income" ? "text-emerald-500" : "text-red-500"
                    )}>
                        {type}
                    </span>
                    category
                </DialogTitle>
                <DialogDescription>
                    Categories are used to group your transactions
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form className='space-y-8 '>

                <FormField
                        control={form.control}
                        name='name'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input defaultValue={""}{...field}/>
                                </FormControl>
                                <FormDescription>
                                    Transaction description (optional)
                                </FormDescription>
                            </FormItem>
                        )}
                />

                    <FormField
                        control={form.control}
                        name='icon'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Icon
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className='h-[100px] w-full'>
                                                {form.watch("icon")?(
                                                    <div className='flex flex-col items-center gap-2'>
                                                    <span className="text-5xl" role='img'>{field.value}</span>
                                                <p className='text-xs text-muted-foreground'>Click to change </p>
                                                </div>
                                                ) : (
                                                <div className='flex flex-col items-center gap-2'>
                                                    <CircleOff className='h-[48px] w-[48px]'/>
                                                <p className='text-xs text-muted-foreground'>Click to select </p>
                                                </div>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-full'>
                                            <Picker data={data}/>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormDescription>
                                    This is how your category will appear in the app
                                </FormDescription>
                            </FormItem>
                        )}
                    />


                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateCategoryDialogue
