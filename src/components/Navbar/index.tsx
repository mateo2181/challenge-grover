import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    justify-content: center;
    padding: 12px;
    background-color: black;
`;

const Title = styled.h1`
    color: white;
    font-size: 24px;
    a {
        text-decoration: none;
        color: white;
    }
`;

export default function Navbar() {
    return (
        <Header>
            <Title> <Link to='/'>&quot;The New York Times&quot; article search application </Link></Title>
        </Header>
    )
}
