'use server';
import React from 'react'

import { EventCard } from './EventCard';
import { DisplayAllEvent } from '../utils/actions';

const Listing = async () => {

  let events = await DisplayAllEvent();

  return (
    <div>
      <h1 className='text-2xl '>Here contains all the list</h1>

      {/* List all the events here */}
      {/* Pass all the */}
      <div className='mt-10 sm:mr-10 grid sm:grid-cols-1 lg:grid-cols-2 gap-3'>
      {events.map((event, index) => (
          <EventCard 
            key={event.id || index}
            hallName={event.hallname}
            clubName={event.clubname}
            eventName={event.eventname}
            date={event.date}
            time={event.time}
            eventStatus={event.eventstatus}
            hallStatus={event.hallstatus}
          />
        ))}
      </div>


    </div>
  )
}

export {Listing};
