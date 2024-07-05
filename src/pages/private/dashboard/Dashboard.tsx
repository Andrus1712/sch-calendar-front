import { SDashboard } from '@/assets/styles/pages/private/dashboard/dashboard.styles.ts';
import FCalendar from '@/components/calendar/FCalendar.tsx';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { setMessage } from '@/features/alert/alertSlice.ts';

const Dashboard = () => {
    const dispatch = useDispatch();
    return (
        <SDashboard>
            <Button onClick={() => dispatch(setMessage({
                message: 'Hola',
                type: 'error',
                details: '',
                timestamp: '',
                code: '',
                show: true,
            }))}>Lunch</Button>
            
            {/*<Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Nuevo evento</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-4">
                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="small" value="Titulo" />
                                    </div>
                                    <TextInput id="tittle" type="text" sizing="md" value={title}
                                               onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="small" value="Description" />
                                    </div>
                                    <Textarea id="comment" placeholder="Leave a comment..." required rows={4}
                                              value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="countries" value="Select your country" />
                                    </div>
                                    <Select id="countries" required>
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>France</option>
                                        <option>Germany</option>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="datetimer" value="Fecha" />
                                    </div>
                                    {startTime}
                                    <Datepicker value={`${new Date()}`}
                                                onChange={(e) => setStartTime(e.target.value)} />
                                </div>
                            </div>
                            
                            
                            <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                                   placeholder="Start Time" />
                            <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                                   placeholder="End Time" />
                            <input type="text" value={statusSchedule} onChange={(e) => setStatus(e.target.value)}
                                   placeholder="Status" />
                            
                            <button type="submit" disabled={createScheduleIsLoading}>Create Schedule</button>
                            
                            {createScheduleIsError && (
                                <p>Error: {getErrorErrorMessage(createScheduleError)}</p>
                            )}
                            {createScheduleIsLoading && <p>Creating Schedule...</p>}
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>*/}
            <FCalendar />
        </SDashboard>
    );
};

export default Dashboard;