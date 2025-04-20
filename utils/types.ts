
export enum eventStatus{
    Active = "Active",
    Upcoming = "Upcoming",
    Ended = "Ended",
}

export enum hallStatus{
    Available = "Available",
    Booked = "Booked",
    NotAvailable = "NotAvailable"
}

export interface createEvent {
    hallname: string;
    clubname: string;
    eventname: string;
    date: string;
    time: string;
    eventstatus?: string;
    hallstatus:string;
}