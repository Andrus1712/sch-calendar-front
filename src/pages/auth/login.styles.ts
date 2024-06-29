import styled, { keyframes } from 'styled-components';
import { color } from '@/assets/styles/colors.ts';
import { v } from '@/assets/styles/variables.ts';

export const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
`;

export const Form = styled.form`
    background-color: ${color.white};
    margin: 0 auto;
    width: 100%;
    max-width: 414px;
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);
    -webkit-box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);
    -moz-box-shadow: 0 1px 10px -5px rgba(126, 126, 126, 0.51);
`;

export const Input = styled.input`
    max-width: 100%;
    padding: 11px 13px;
    background: #f9f9fa;
    color: #000;
    opacity: 0.8;
    margin-bottom: 0.9rem;
    border-radius: 4px;
    outline: 0;
    border: 1px solid rgba(245, 245, 245, 0.7);
    font-size: 14px;
    transition: all 0.3s ease-out;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);

    &:focus,
    &:hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
    }
`;

const jump = keyframes`
    from {
        transform: translateY(0)
    }
    to {
        transform: translateY(-3px)
    }
`;

export const Button = styled.button<{ disabled?: boolean }>`
    max-width: 100%;
    padding: 11px 13px;
    color: rgb(253, 249, 243);
    font-weight: 600;
    text-transform: uppercase;
    background: ${color.primary};
    border: none;
    border-radius: 3px;
    outline: 0;
    cursor: pointer;
    margin-top: 0.6rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;

    &:hover {
        background: ${color.secondary};
        animation: ${jump} 0.2s ease-out forwards;
    }

    &:disabled {
        background: ${color.disabled};
        cursor: not-allowed;
        box-shadow: none;

        &:hover {
            background: ${color.disabled};
            animation: none;
        }
    }
`;

export const InputLabel = styled.label`
    width: 100%;
    text-align: left;
    font-weight: 100;
    font-size: 14px;
`;

export const Title = styled.span`
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    margin: ${v.xxlSpacing} 0 ${v.xxlSpacing} 0;
`;