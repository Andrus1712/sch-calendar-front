export interface ISchedule {
    id?: bigint | null,
    title: string,
    description: string | null,
    startTime: string | null,
    endTime: string | null,
    status: string,
    scheduleTypeId: number | null,
    scheduleTypeDescription: string | null
}