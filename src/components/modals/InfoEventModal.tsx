import { Button, Label, Modal } from 'flowbite-react';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';
import { FaPencil, FaTrash } from 'react-icons/fa6';

interface ModalProps {
    openModal: boolean,
    currentEvent: ISchedule,
    
    setOpenModal(openModal: boolean): void
}


const InfoEventModal = ({ openModal, setOpenModal, currentEvent }: ModalProps) => {
    // const [openModal, setOpenModal] = useState(true);
    
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Información del evento</Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" color="info"><FaPencil className="mr-2" />Editar</Button>
                <Button size="sm" color="failure"><FaTrash className="mr-2" />Eliminar</Button>
                <Button size="sm" color="light" onClick={() => setOpenModal(false)}>Cerrar</Button>
            </Modal.Footer>
        </Modal>);
};

export default InfoEventModal;
