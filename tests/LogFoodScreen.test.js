import React from 'react'
import { render, screen, fireEvent, renderHook } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';
import { useNavigation } from '@react-navigation/native';

import LogFoodScreen from '../screens/LogFoodScreen'
import { createStackNavigator } from '@react-navigation/stack';


// credit https://spin.atomicobject.com/2021/02/24/react-navigation-5-unit-testing-components/
// Workaround to prevent the render function from throwing an exception, as components depend on having a 
// navigation prop in order to make use of the useNavigation() function
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
  

it('Test search function', () => {

    const { getByPlaceholderText, getByText, getByTestId } = render(<LogFoodScreen />);

    fireEvent.changeText(getByTestId("foodSearchBar"), "endive");
    fireEvent.press(getByTestId("foodSearch"));

    results = getByTestId("foodResultList");
    // there should be exactly 1 result for searching endive
    expect(results.children.length).toBe(1);
});

it('Test search function with gibberish', () => {

    const { getByPlaceholderText, getByText, getByTestId } = render(<LogFoodScreen />);

    fireEvent.changeText(getByTestId("foodSearchBar"), "garegajhujyr5hya");
    fireEvent.press(getByTestId("foodSearch"));

    results = getByTestId("foodResultList");
    // no results for gibberish
    expect(results.children.length).toBe(0);
});