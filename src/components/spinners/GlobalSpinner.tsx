import { Spinner } from 'flowbite-react';
import { SpinnerOverlay } from '@/assets/styles/components/spinners/SpinnerGobal.styles.ts';
import { RootState } from '@/app/store.ts';
import { useSelector } from 'react-redux';

const GlobalSpinner = () => {
    const isFetching = useSelector((state: RootState) => {
        const queries = state.splitApi.queries;
        return Object.values(queries).some(query => query?.status === 'pending');
    });
    
    return isFetching ?
        <SpinnerOverlay>
            <Spinner aria-label="Default status example" size={'lg'} />;
        </SpinnerOverlay>
        : null;
};

export default GlobalSpinner;