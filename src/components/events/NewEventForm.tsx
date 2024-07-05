import { Button, Datepicker, Drawer, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { HiCalendar } from 'react-icons/hi';
import { useState } from 'react';
import { format } from 'date-fns';
import { useCreateScheduleMutation } from '@/features/schedule/scheduleApi.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NewEventForm = ({ isOpen, setIsOpen }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState<string>(format(new Date(), 'HH:mm:ss'));
    const [endTime, setEndTime] = useState<string>(format(new Date(), 'HH:mm:ss'));
    
    const [date, setDate] = useState<Date | null>(new Date());
    
    const handleChange = (date: Date) => {
        setDate(date);
    };
    
    
    const [createSchedule, {
        isLoading: createScheduleIsLoading,
        isError: createScheduleIsError,
        error: createScheduleError,
    }] = useCreateScheduleMutation();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let dateFormat;
            if (date) {
                dateFormat = format(date.toLocaleDateString(), 'y-MM-dd');
                await createSchedule({
                    title,
                    description,
                    startTime: `${dateFormat} ${startTime}`,
                    endTime: `${dateFormat} ${endTime}`,
                    status: "",
                    scheduleTypeId: 1,
                }).unwrap();
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };
    
    const handleClose = () => setIsOpen(false);
    
    return (
        <Drawer open={isOpen} onClose={handleClose} backdrop={true} position={'right'}>
            <Drawer.Header title="Nuevo evento" />
            <Drawer.Items>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="mb-6 mt-3">
                        <Label htmlFor="title" className="mb-2 block">
                            Titulo
                        </Label>
                        <TextInput id="title" name="title" placeholder="Titulo del evento" value={title}
                                   onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="description" className="mb-2 block">
                            Description
                        </Label>
                        <Textarea id="description" name="description"
                                  placeholder="Escribe una descripcion del evento..."
                                  rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="description" className="mb-2 block">
                            Tipo
                        </Label>
                        <Select id="countries" required>
                            <option>Tipo 1</option>
                            <option>Tipo 2</option>
                        </Select>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2">
                            <Label htmlFor="description" className="mb-2 block">
                                Fecha
                            </Label>
                            <Datepicker
                                id="start-date"
                                onSelectedDateChanged={handleChange}
                                minDate={new Date()}
                            />
                            <p>Selected
                                Date: {date ? date.toLocaleDateString() : 'No date selected'}</p>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="start-time"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                time:</label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                              clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="start-time"
                                       className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={startTime} onChange={(e) => setStartTime(e.target.value)}
                                       required />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="end-time"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                time:</label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                              clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="end-time"
                                       className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={endTime} onChange={(e) => setEndTime(e.target.value)}
                                       required />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" disabled={createScheduleIsLoading} className="w-full">
                        <HiCalendar className="mr-2" />
                        Crear evento
                    </Button>
                    {createScheduleIsError && (
                        <p>Error: {getErrorErrorMessage(createScheduleError)}</p>
                    )}
                    {createScheduleIsLoading && <p>Creating Schedule...</p>}
                </form>
            </Drawer.Items>
        </Drawer>
    );
};
const getErrorErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (error && 'status' in error && 'data' in error) {
        // Error de FetchBaseQueryError
        return `Status: ${error.status}, Error: ${JSON.stringify(error.data)}`;
    } else if (error && 'message' in error) {
        // Error de SerializedError
        return error.message;
    } else {
        return 'Unknown error occurred';
    }
};

export default NewEventForm;