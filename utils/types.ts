
export enum eventStatus{
    Active,
    Upcoming,
    Ended,
}

export enum hallStatus{
    Available,
    Booked,
    NotAvailable
}

export interface createEvent {
    hallname: string;
    clubname: string;
    eventname: string;
    date: string;
    time: string;
    eventstatus?: eventStatus;
    hallstatus?: hallStatus;
}