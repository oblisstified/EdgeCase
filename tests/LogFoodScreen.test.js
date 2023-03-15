import React from 'react'
import { render, screen, fireEvent, renderHook } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';

import LogFoodScreen from '../screens/LogFoodScreen'


// credit https://spin.atomicobject.com/2021/02/24/react-navigation-5-unit-testing-components/
// Workaround to prevent the render function from throwing an exception, as components depend on having a 
// navigation prop in order to make use of the useNavigation() function
// =====================================================================
jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
      }),
    };
});
// =====================================================================




it('Test search function', () => {

    const { getAllByText, getByTestId } = render(<LogFoodScreen />);

    fireEvent.changeText(getByTestId("foodSearchBar"), "endive");
    fireEvent.press(getByTestId("foodSearch"));

    const result = getAllByText(new RegExp('^'+"endive"+'.*', 'i'))
    // there should be exactly 1 result for searching endive
    expect(result.length).toBe(1);
});

it('Test search function with gibberish', () => {

    const { getByText, getByTestId } = render(<LogFoodScreen />);

    fireEvent.changeText(getByTestId("foodSearchBar"), "haerhartha");
    fireEvent.press(getByTestId("foodSearch"));

    let errorMessage;

    try {
      getByText(new RegExp('^'+"haerhartha"+'.*', 'i'))
    } catch (e) {
      errorMessage = e.message
    } 
    
    expect(errorMessage).toEqual("Unable to find an element with text: /^haerhartha.*/i");
});



