import { useGetAllClientsQuery } from '@/features/client/clientApi.ts';
import { Button } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

function Clients() {
    
    const { data, isError, error, isLoading } = useGetAllClientsQuery({});
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    if (isError) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }
    
    if (isLoading) {
        return <h3>Loading</h3>;
    }
    
    return (
        <div>
            <Button
                onClick={() => navigate(`${pathname}/new`, {
                    state: { id: 7, color: 'green' },
                })}
                color="gray">
                <HiUserCircle className="mr-3 h-4 w-4" />
                New
            </Button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Clients;
