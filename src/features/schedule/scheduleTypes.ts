export interface ISchedule {
    id?: number,
    title: string,
    description: string | null,
    startTime: string | null,
    endTime: string | null,
    status: string,
    scheduleTypeId: number | null,
    scheduleTypeDescription: string | null
}