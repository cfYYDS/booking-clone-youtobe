'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BedDoubleIcon } from 'lucide-react'
 
export const formSchema = z.object({
    location: z.string().min(2).max(50),
    dates:z.object({
        from:z.date(),
        to:z.date(),
    }),
    adults:z.string()
    .min(1,{
        message:'Please select at least one adult'
    })
    .max(12,{
        message:'Max 12 adults Occupancy'
    }),
    children:z.string().min(0).max(12,{
        message:'Max 12 children Occupancy'
    }),
    rooms:z.string().min(1,{
        message:'Please select at least 1 room'
    })
})
const SearchForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            location:'',
            dates:{
                from:undefined,
                to:undefined
            },
            adults:"1",
            children:"0",
            rooms:"1"
        }
    })

    function onSubmit(values:z.infer<typeof formSchema>){
        router.push(`/search?location=${values.location}&from=${values.dates.from}&to=${values.dates.to}&adults=${values.adults}&children=${values.children}&rooms=${data.rooms}`)
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
         className='flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2
          space-y-4 lg:space-y-0 rounded-lg
         '>
            <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField 
                    control={form.control}
                    name='location'
                    render={(field)=>(
                        <FormItem >
                            <FormLabel
                            className='text-white flex'
                            >Location
                            <BedDoubleIcon className='ml-2 h-4 w-4 text-white'/>
                            </FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input placeholder='London, UK' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

            </div>
        </form>
    </Form>
  )
}

export default SearchForm