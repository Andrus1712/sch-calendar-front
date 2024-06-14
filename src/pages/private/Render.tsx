import { lazy, Suspense } from 'react';

const privates = {
    dashboard: lazy(() => import(`./dashboard/Dashboard`)),
    users: lazy(() => import(`./users/Users`)),
};

type ObjectKey = keyof typeof privates;

interface Props {
    name: string;
}

const Render = (props: Props) => {
    const nameComponet = props.name as ObjectKey;
    const DynamicComponent = privates[nameComponet];
    return <Suspense fallback={<div>Loading...</div>}>{<DynamicComponent />}</Suspense>;
};
export default Render;

