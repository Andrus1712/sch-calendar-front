import styled from 'styled-components';
import { v } from '@/assets/styles/variables.ts';

export const SLayout = styled.div`
    max-height: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    display: flex;
`;

export const SMain = styled.main`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

export const SMainContent = styled.div`
    padding: calc(${v.smSpacing} * 2);
    height: 100%;
    flex: 1;
    width: 100%;
`;