import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, *:before, *:after {
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        height: 100%;
        width: 100vw;
    }

    .fc { /* the calendar root */
        max-width: 100%;
        margin: 0 auto;
    }

`