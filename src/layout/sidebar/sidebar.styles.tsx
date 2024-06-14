import styled from 'styled-components';
import { color, v } from '@/assets/styles/variables.ts';
import isPropValid from '@emotion/is-prop-valid';
import { breakpoints } from '@/assets/styles/screenSize.ts';

interface SidebarProps {
    isOpen: boolean;
}

export const SidebarContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isOpen',
})<SidebarProps>`
    width: ${({ isOpen }) => isOpen ? v.sidebarWidth : v.sidebarWidthClose};
    background: ${color.primary};
    transition: transform 1s ease, width 1s ease;
    overflow: hidden;
    color: whitesmoke;
    height: 100%;
    display: flex;
    flex-direction: column;

    box-shadow: 6px 2px 19px -1px rgba(126, 126, 126, 0.51);
    -webkit-box-shadow: 6px 2px 19px -1px rgba(126, 126, 126, 0.51);
    -moz-box-shadow: 6px 2px 19px -1px rgba(126, 126, 126, 0.51);

    .nav-icon {
        min-width: 50px;
        font-size: 35px;
    }

    @media (max-width: ${breakpoints.tabletMedium}) {
        position: absolute;
        z-index: 1000;
        width: ${v.sidebarWidth};
        transform: ${({ isOpen }) => !isOpen ? 'translate(-100%)' : null};
        transition: all 1s;
        align-content: center;

        #close-icon-mobile {
            display: block;
        }
    }

    @media (min-width: ${breakpoints.desktopLarge}) {
        position: relative;
        width: ${({ isOpen }) => isOpen ? v.sidebarWidth : v.sidebarWidthClose};

        #close-icon-mobile {
            display: none;
        }
    }

    #close-icon-mobile {
        position: absolute;
        right: 10px;
        border: 2px yellow solid;
        margin-bottom: ${v.mdSpacing};
        height: 30px;
        width: 30px;

        button {
            margin: auto;
            width: 100%;
            height: 100%;
        }
    }

    header {
        // height: ${v.headerHeight};
        display: flex;
        align-items: center;
        margin-bottom: ${v.lgSpacing};
        background: #22228a;
        width: 100%;
        padding: ${v.smSpacing};
        overflow: hidden;

        #logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            flex: ${({ isOpen }) => isOpen ? null : 1};
            width: ${({ isOpen }) => isOpen ? null : '100%'};
            transition: all 2s ease;
        }

        h3 {
            //margin: auto;
            opacity: ${({ isOpen }) => isOpen ? 1 : 0};
            transition: all 1s ease;
            white-space: nowrap;
            width: ${({ isOpen }) => isOpen ? null : 0};

        }
    }
`;


export const SItemsNav = styled.nav.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isOpen',
})<SidebarProps>`
    padding: ${v.smSpacing};
    overflow-y: visible;
    overflow-x: hidden;

    scrollbar-color: darkgrey gray;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 5px;
        border: 1px solid black;
    }

    .nav-icon {
        min-width: 50px;
        font-size: 25px;
    }

    ul {
        width: 100%;
        //border: 2px yellow solid;
        padding-left: 0;
    }

    li {
        list-style: none;
        display: flex;
        margin-bottom: ${v.mdSpacing};
        width: 100%;
        align-items: center;

        .nav-link {
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: ${v.mdSpacing};
            background-color: ${color.primary};
            color: ${color.textPrimary};
        }

        span {
            /*margin-left: ${({ isOpen }) => isOpen ? v.mdSpacing : 'auto'};*/
            opacity: ${({ isOpen }) => isOpen ? 1 : 0};
            transition: all 1s ease;
            white-space: nowrap;
            width: ${({ isOpen }) => isOpen ? null : 0};
        }

        a:hover {
            background-color: ${color.hover};
            color: ${color.textHover};
        }
    }
`;

export const SFooterNav = styled.nav`
    height: 100px;
`;