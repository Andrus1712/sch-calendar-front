import styled from 'styled-components';
import { v } from '@/assets/styles/variables.ts';
import { color } from '@/assets/styles/colors.ts';

export const SHeader = styled.header`
    display: flex;
    height: ${v.headerHeight};
    background: ${color.white};
    padding: ${v.smSpacing};
    width: 100%;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;

    box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);
    -webkit-box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);
    -moz-box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);

    #switch-menu {
        width: 35px;
        height: 35px;
    }

    button {
        width: 100%;
        height: 100%;
        padding: ${v.smSpacing};
        background: transparent;
        border: none;
        border-radius: 50px;
    }

    button:hover {
        background: #d9d9d9;
    }
`;