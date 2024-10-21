import { useDeleteClientMutation, useGetAllClientsQuery } from '@/features/client/clientApi.ts';
import { Button, Card, Modal, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiUserCircle } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { IClient } from '@/features/client/clientTypes.ts';
import DataTable from 'react-data-table-component';
import { useEffect, useMemo, useState } from 'react';

const FilterComponent = ({ filterText, onFilter, onClear }: {
    filterText: string,
    onFilter: (arg0: string) => void,
    onClear: () => void
}) => (
    <div className={'flex'}>
        <TextInput
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => onFilter(e.target.value)}
        />
        <Button type="button" onClick={onClear}>X</Button>
    </div>
);

function Clients() {
    
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filteredItems, setFilteredItems] = useState<IClient[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [current, setCurrent] = useState<IClient | null>();
    const [deleteClient, response] = useDeleteClientMutation();
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const { data, isError, error, isLoading, isSuccess } = useGetAllClientsQuery({});
    
    useEffect(() => {
        if (isSuccess) {
            const { data: dataServer } = data;
            setFilteredItems(dataServer?.filter((item: IClient) => item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())));
        }
    }, [data, filterText]);
    
    const handleOpenDeleteModal = (client: IClient) => {
        setOpenModal(true);
        setCurrent(client);
    };
    
    const handleDelete = () => {
        current && deleteClient(current.id).unwrap().finally(() => {
            setCurrent(null);
            setOpenModal(false);
        });
        
    };
    
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        
        return (
            <div className={'flex justify-between text-center w-full'}>
                <Button
                    onClick={() => navigate(`${pathname}/new`, {
                        state: { id: 7, color: 'green' },
                    })}
                    color="success">
                    <HiUserCircle className="mr-3 h-4 w-4" />
                    New
                </Button>
                <FilterComponent onFilter={e => setFilterText(e)} onClear={handleClear}
                                 filterText={filterText} />
            </div>
        );
    }, [filterText, resetPaginationToggle]);
    
    const columns = [
        {
            name: 'Nombre',
            selector: (row: IClient) => row.firstName,
            format: (row: IClient) => `${row.firstName} ${row.lastName}`,
        },
        {
            name: 'Email',
            selector: (row: IClient) => row.email,
        },
        {
            name: 'Telefono',
            selector: (row: IClient) => row.phone,
        },
        {
            name: 'Cumpleaños',
            selector: (row: IClient) => row.birthDate,
        },
        {
            name: 'Action',
            cell: (row: IClient) => <div className={'flex gap-3'}>
                <a
                    onClick={() => navigate('' + row.id, { state: { data: row } })}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Edit
                </a>
                <a
                    onClick={() => handleOpenDeleteModal(row)}
                    className="font-medium text-red-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Delete
                </a>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
    if (isError) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }
    
    if (isLoading) {
        return <h3>Loading</h3>;
    }
    
    return (
        <>
            <Card>
                <div className={''}>
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        selectableRows
                        pagination
                        title={'Lista de Clientes'}
                        persistTableHead
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                    />
                </div>
            </Card>
            {openModal &&
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle
                                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button isProcessing={response.isLoading} color="failure"
                                        onClick={() => handleDelete()}>
                                    {'Yes, I\'m sure'}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}

export default Clients;
