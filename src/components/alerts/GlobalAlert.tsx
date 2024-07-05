import { useAppDispatch, useAppSelector } from '@/app/hooksStore.ts';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { closeAlert } from '@/features/alert/alertSlice.ts';

const GlobalAlert: React.FC = () => {
    const {
        type,
        show,
        message,
        code,
    } = useAppSelector(state => state.alert);
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (show) {
            switch (type) {
                case 'success':
                    break;
                case 'error':
                    toast.error(ToastContent({ message, code }), {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Bounce,
                    });
                    break;
                case 'info':
                    break;
                case 'warning':
                    break;
                default:
                    break;
            }
        }
        
        return () => {
            dispatch(closeAlert(false));
        };
        
    }, [show]);
    
    
    return (
        <ToastContainer stacked />
    );
};

export const ToastContent = ({ message, code }: { message: string, code: string }) => {
    
    return <div className="msg-container">
        <p className="msg-title">{code}</p>
        <p className="msg-description">{message}</p>
    </div>;
};

export default GlobalAlert;