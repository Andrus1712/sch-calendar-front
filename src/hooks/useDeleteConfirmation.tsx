import { Button, Modal } from 'flowbite-react';

const UseDeleteConfirmation = () => {
    
    const DeleteAlert = (
        <Modal show={true} size="md" popup>
            <Modal.Header />
            <Modal.Body>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you
                        want to
                        delete this product?</h3>
                    <div className={'flex justify-center gap-4'}>
                        <Button color="failure">
                            Eliminar
                        </Button>
                        <Button color="gray">
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
    
    return { DeleteAlert };
};

export default UseDeleteConfirmation;
