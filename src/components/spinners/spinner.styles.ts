// Define la animación
import styled, { keyframes } from 'styled-components';
import { color } from '@/assets/styles/colors.ts';
import { v } from '@/assets/styles/variables.ts';

export const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// Define el componente con estilos
export const Loader = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid ${color.primary};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${v.mdSpacing};
`;