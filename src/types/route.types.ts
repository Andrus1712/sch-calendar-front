export const PUBLIC_ROUTES = {
    LOGIN: { path: 'login', component: 'loginView' },
    HOME: { path: 'home', component: 'homeView' },
};

export const PRIVATE_ROUTES = {
    PRIVATE: { path: 'app', component: 'app' },
    DASHBOARD: {
        INDEX: {
            path: 'dashboard',
            permission: 'view.dashboard',
        },
    },
    CUSTOMERS: {
        INDEX: {
            path: 'customers',
            permission: 'view.customers',
        }
    }
};
