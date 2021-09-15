import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';

type Props = {
    children?: JSX.Element;
};

const Main = styled.main`
    margin: 32px auto 16px;
    max-width: 700px;
    padding: 0 20px;
`;

export default function index({children}: Props) {
    return (
        <>
            <Navbar />
            <Main>
                {children}
            </Main>
        </>
    )
}
