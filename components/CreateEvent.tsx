'use client';

import React from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateEventForm } from '../utils/actions';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createEvent,eventStatus,hallStatus } from '../utils/types';


/**
 * This are the required Params:
    1. Hall Name//
    2. Status
    3. Date 
    4. Event Name //
    5. Time Slot
    6. Club Name //
 */


const CreateEvent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    let Router = useRouter();

    // Here {data} struct will be destructured -> Stored in DB
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: createEvent) => await CreateEventForm(data),
        onSuccess: (data) => {
            if (!data || typeof data === 'string') {
                toast.error("Something went wrong!!!");
                return;
            }
            toast.success("Event Created Successfully 🎉");
            Router.push('/EventsListing');
        },
        onError: () => {
            toast.error("Error while creating the event");
        }
    })

    const onSubmit = (data: {
        HallName: string;
        ClubName: string;
        EventName: string;
        Date: string;
        TimeSlot: string;
        EventStatus: string;
        HallStatus:string
    }) => {
        const formatted: createEvent = {
            hallname: data.HallName,
            clubname: data.ClubName,
            eventname: data.EventName,
            date: data.Date,
            time: data.TimeSlot,
            eventstatus:data.EventStatus,
            hallstatus:data.HallStatus
        };

        console.log("Formatted values being sent to mutation:", formatted);
        mutate(formatted);
    };
    return (
        <div>

            {/* Here we will create a simple form to Create the Events */}
            {/* Here in forms -> Implement the Validation */}
            <div className='m-12 p-16'>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                    {/* Hall Name */}
                    <select
                        className="select select-bordered w-full bg-base-300 border-gray-600"
                        {...register("HallName", { required: true })}
                    >
                        <option value="" disabled>
                            Select Hall
                        </option>
                        <option value="Sudha Murthy Hall">Sudha Murthy Hall</option>
                        <option value="Drawing Hall">Drawing Hall</option>
                        <option value="Hall 101">Hall 101</option>
                        <option value="Hall 102">Hall 102</option>
                    </select>
                    {errors.HallName && <span>This field is required</span>}


                    {/* Club Name */}
                    <select
                        className="select select-bordered w-full bg-base-300 border-gray-600"
                        {...register("ClubName", { required: true })}
                    >
                        <option value="" disabled>
                            Select Club Name
                        </option>
                        <option value="Web Dev CLub">Web Dev CLub</option>
                        <option value="CP Club">CP Club</option>
                        <option value="Robotics Club">Robotics Club1</option>
                        <option value="LND Club">LND Club</option>
                        <option value="ECell Club">ECell Club</option>
                    </select>
                    {errors.ClubName && <span className='text-red-400'>This field is required</span>}

                    {/* Event Name */}
                    <input
                        type="text"
                        placeholder="Enter Event Name"
                        className="input bg-base-300 border-gray-600"
                        {...register("EventName", { required: true })}
                    />
                    {errors.EventName && <span className='text-red-400'>This field is required</span>}

                    {/* Date */}
                    <input
                        type="text"
                        placeholder="Enter Date of Event"
                        className="input bg-base-300 border-gray-600"
                        {...register("Date", { required: true })}
                    />
                    {errors.Date && <span className='text-red-400'>This field is required</span>}

                    {/* Time Slot */}
                    <input
                        type="text"
                        placeholder="Enter Time Slot of Event"
                        className="input bg-base-300 border-gray-600"
                        {...register("TimeSlot", { required: true })}
                    />
                    {errors.TimeSlot && <span className='text-red-400'>This field is required</span>}


                    <button
                        type="submit" className='btn btn-sm btn-success'
                        disabled={isPending}
                    >
                        {isPending ? "Loading..." : "Create event"}
                    </button>
                </form>

            </div>

        </div>
    )
}

export { CreateEvent };