import Routes from '@/router/routes.tsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ApplicationContextProvider } from '@/context/application.context.tsx';
import { GlobalStyle } from '@/assets/styles/global.styles.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store.ts';

function App() {
    return (
        <HelmetProvider>
            
            <GlobalStyle />
            <Helmet>
                <title>App Calendar</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ApplicationContextProvider>
                        <Routes />
                    </ApplicationContextProvider>
                </PersistGate>
            </Provider>
        </HelmetProvider>
    );
}

export default App;
