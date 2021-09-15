import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import InputSearch from '.';

test('call onChange prop when type the input', () => {
    const onChangeFn = jest.fn();
    const { getByLabelText  } = render(<InputSearch value="" onChange={onChangeFn} />);
    const input = getByLabelText('search-articles') as HTMLInputElement;
    fireEvent.change(input, { target: { value: `sports` } });
    expect(input.value).toBe('sports');
    expect(onChangeFn).toHaveBeenCalled();
})
