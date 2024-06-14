import { Navigate, Route, Routes } from 'react-router-dom';

export interface Props {
    children: JSX.Element[] | JSX.Element;
}

const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<>Not found</>} />
            <Route path="/" element={<Navigate to={`/app/dashboard`} />}></Route>
        </Routes>
    );
};

RoutesWithNotFound.propTypes = {};

export default RoutesWithNotFound;