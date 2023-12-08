import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomePageScreen from '@screens/HomePageScreen';
import {it} from '@jest/globals';

it('search for a product when the product name is entered', () => {
  const {getByPlaceholder} = render(<HomePageScreen />);
  fireEvent.changeText(getByPlaceholder('Search'), 'Bentley Focus');
  expect(getAllByText('Bentley Focus')).toHaveLength(1);
});
