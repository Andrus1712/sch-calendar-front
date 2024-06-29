import { AlertContent, AlertWrapper, Icon } from '@/assets/styles/components/alerts/alert.styles.ts';

interface AlertProps {
    message: string;
}


const ErrorAlert = ({ message }: AlertProps) => {
    return (
        <AlertWrapper role="alert" type="danger">
            <Icon aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </Icon>
            <AlertContent>
                {message}
            </AlertContent>
        </AlertWrapper>
    );
};

export default ErrorAlert;