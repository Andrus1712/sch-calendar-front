import { Button, Datepicker, Label, Modal, Select, Textarea, TextInput } from 'flowbite-react';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUpdateScheduleMutation } from '@/features/schedule/scheduleApi.ts';

interface ModalProps {
    openModal: boolean,
    currentEvent: ISchedule,
    
    deleteEvent(deleteItem: boolean): void,
    
    setOpenModal(openModal: boolean): void
}


const InfoEventModal = ({ openModal, setOpenModal, currentEvent, deleteEvent }: ModalProps) => {
    const [modeEdit, setModeEdit] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState<string>(format(new Date(), 'HH:mm:ss'));
    const [endTime, setEndTime] = useState<string>(format(new Date(), 'HH:mm:ss'));
    const [date, setDate] = useState<Date | null>(new Date());
    const [typeSchedule, setTypeSchedule] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    
    const [updateSchedule] = useUpdateScheduleMutation();
    
    useEffect(() => {
        if (currentEvent) {
            setTitle(currentEvent.title);
            setDescription(currentEvent.description ?? '');
            setStartTime(format(currentEvent.startTime ?? '', 'HH:mm:ss'));
            setEndTime(format(currentEvent.endTime ?? '', 'HH:mm:ss'));
            setDate(new Date(currentEvent.startTime ?? ''));
            setTypeSchedule(currentEvent.scheduleTypeId ?? 0);
            setStatus(currentEvent.status);
        }
        
        return () => {
            setTitle('');
            setDescription('');
            setStartTime('');
            setEndTime('');
            setDate(new Date(''));
            setTypeSchedule(0);
            setStatus('');
        };
    }, [currentEvent]);
    
    const handleEditEvent = (isModeEdit: boolean) => {
        setModeEdit(isModeEdit);
    };
    
    const handleChange = (date: Date) => {
        setDate(date);
    };
    
    const sendEditEvent = async () => {
        if (currentEvent.id) {
            let dateFormat;
            if (date) {
                dateFormat = format(date.toLocaleDateString(), 'y-MM-dd');
                const editedData: ISchedule = {
                    title,
                    description,
                    startTime: `${dateFormat} ${startTime}`,
                    endTime: `${dateFormat} ${endTime}`,
                    status: 'PENDING',
                    scheduleTypeId: 1,
                    scheduleTypeDescription: '',
                };
                await updateSchedule({
                    id: currentEvent.id,
                    data: editedData,
                }).unwrap();
                setModeEdit(false);
                setOpenModal(false);
            }
            
        }
    };
    
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Información del evento</Modal.Header>
            <Modal.Body>
                {modeEdit ?
                    <div className="space-y-6 flex flex-row gap-4 align-top">
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <Label htmlFor="tittle" value="Nombre" className="text-gray-500" />
                                <TextInput id="title" name="title" placeholder="Titulo del evento" value={title}
                                           onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Descripción" className="text-gray-500" />
                                <Textarea id="description" name="description"
                                          placeholder="Escribe una descripcion del evento..."
                                          rows={4} value={description}
                                          onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Fecha" className="text-gray-500" />
                                <Datepicker
                                    id="start-date"
                                    onSelectedDateChanged={handleChange}
                                    minDate={new Date()}
                                    value={date?.toLocaleDateString()}
                                />
                                
                                <div className="mb-2">
                                    <label htmlFor="start-time"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                        time:</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 24 24">
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
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 24 24">
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
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <Label htmlFor="tittle" value="Tipo" className="text-gray-500" />
                                <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.scheduleTypeDescription}</h3>
                                <Select id="countries" required value={typeSchedule}
                                        onChange={(e) => setTypeSchedule(Number(e.target.value))}>
                                    <option>Tipo 1</option>
                                    <option>Tipo 2</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Estado" className="text-gray-500" />
                                <Select id="status" required value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                    <option value={'ASIGGNED'}>ASIGGNED</option>
                                    <option value={'PENDING'}>PENDING</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="space-y-6 flex flex-row gap-1 align-top">
                        <div className="flex flex-col flex-auto gap-4">
                            <div>
                                <Label htmlFor="tittle" value="Nombre" className="text-gray-500" />
                                <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.title}</h3>
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Descripción" className="text-gray-500" />
                                <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.description}</h3>
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Fecha" className="text-gray-500" />
                                <div className="flex flex-row gap-2">
                                    <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.startTime}</h3>
                                    <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">-</h3>
                                    <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.endTime}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-auto gap-4">
                            <div>
                                <Label htmlFor="tittle" value="Tipo" className="text-gray-500" />
                                <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.scheduleTypeDescription}</h3>
                            </div>
                            <div>
                                <Label htmlFor="tittle" value="Estado" className="text-gray-500" />
                                <h3 className="text-md font-normal text-gray-800 dark:text-gray-400">{currentEvent.status}</h3>
                            </div>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                {modeEdit ?
                    <>
                        <Button size="sm" color="info" onClick={() => sendEditEvent()}><FaPencil
                            className="mr-2" />Guardar</Button>
                        <Button size="sm" color="failure" onClick={() => handleEditEvent(false)}><FaTrash
                            className="mr-2" />Cancelar</Button>
                    </>
                    : <>
                        <Button size="sm" color="info" onClick={() => handleEditEvent(true)}><FaPencil
                            className="mr-2" />Editar</Button>
                        <Button size="sm" color="failure" onClick={() => deleteEvent(true)}><FaTrash className="mr-2" />Eliminar</Button>
                        <Button size="sm" color="light" onClick={() => setOpenModal(false)}>Cerrar</Button>
                    </>
                }
            </Modal.Footer>
        </Modal>)
        ;
};

export default InfoEventModal;
