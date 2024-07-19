'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface PropsModal {
    isOpen: boolean,
    title: string,
    message: string,
    confirmText: string,
    cancelText: string,
    
    onConfirm(): void,
    
    onClose(): void,
}

const PopupModal = ({ isOpen, onClose, message, confirmText, cancelText, onConfirm }: PropsModal) => {
    return (
        <Modal show={isOpen} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {message}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            {cancelText}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PopupModal;
