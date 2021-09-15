import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
    width: 100%;
    font-weight: 700;
    font-size: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 16px 16px;
    margin-top: 16px;
    font-size: 16px;
    border-radius: 4px;
    box-sizing: border-box;
    border-width: 1px;
`;

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputSearch({value, onChange}: Props) {
    return (
        <div>
            <Label> Type search query term in here: </Label>
            <Input aria-label="search-articles" defaultValue={value} name="search" type="text" onChange={onChange} placeholder="Type to search articles..."/>
        </div>
    )
}
