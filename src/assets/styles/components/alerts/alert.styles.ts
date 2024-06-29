import styled from 'styled-components';
import { v } from '@/assets/styles/variables.ts';

interface PropsAlert {
    type?: 'success' | 'warning' | 'danger';
}

const getColor = (type?: 'success' | 'warning' | 'danger') => {
    switch (type) {
        case 'success':
            return 'green';
        case 'warning':
            return 'yellow';
        case 'danger':
            return '#fdf2f2';
        default:
            return 'gray';
    }
};
const getTextColor = (type?: 'success' | 'warning' | 'danger') => {
    switch (type) {
        case 'success':
            return 'green';
        case 'warning':
            return 'yellow';
        case 'danger':
            return '#b91c1c';
        default:
            return 'gray';
    }
};

export const AlertWrapper = styled.div<PropsAlert>`
    display: flex;
    align-items: center;
    text-align: left;
    font-weight: 100;
    font-size: 14px;
    padding: ${v.smSpacing};
    margin-bottom: ${v.mdSpacing};
    border-radius: ${v.borderRadius};
    background: ${props => getColor(props.type)};
    color: ${props => getTextColor(props.type)};
`;

export const Icon = styled.svg`
    flex-shrink: 0;
    display: inline;
    width: 1rem;
    height: 1rem;
    margin-right: 0.75rem; /* me-3, en rtl debería ser ml-3 */
    fill: currentColor;
`;

export const AlertContent = styled.div`
    display: flex;
    flex-direction: column;
`;