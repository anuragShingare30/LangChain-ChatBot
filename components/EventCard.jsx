import React from 'react'



/**
 @dev Important params we required for DB model are:
    1. Hall Name
    2. Status
    3. Date 
    4. Event Name
    5. Time Slot
    6. Club Name
 */

const EventCard = ({ hallName,clubName,eventName,date,time,eventStatus,hallStatus }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-sm border">
            <div className="card-body">
            {/* <figure className='mb-5'>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" 
                    width="150px"
                    height="150px"
                />
            </figure> */}
                <h1 className="card-title text-lg">
                    {eventName}
                    <div className="badge badge-success">{eventStatus}</div>
                    <div className="badge badge-warning">InQueue</div>
                </h1>
                <p className='text-white'>{clubName}</p>
                <div className="card-actions justify-end mt-2">
                    <div className="badge badge-outline">{date}</div>
                    <div className="badge badge-outline">{time}</div>
                    <div className="badge badge-outline">{hallName}</div>
                </div>
            </div>
        </div>
    )
}

export { EventCard }
