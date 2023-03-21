import React from 'react'
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';
import "@testing-library/jest-dom"
import { findPresetObjects, findFoodObjects } from '../utils/searcher';
import { getAuth } from "firebase/auth";

import LogFoodScreen from '../screens/LogFoodScreen'


jest.mock("firebase/auth")
jest.mock("../utils/searcher")

findPresetObjects.mockReturnValue([]);
findFoodObjects.mockReturnValue([]);

getAuth.mockReturnValue(JSON.parse(
  `{"currentUser":{"email": "sa@gmail.com"}}`
))

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

it("test search presets calls utils", () => {
    const { getByTestId, getByText } = render(<LogFoodScreen />);
  
    const searchButton = getByTestId("searchPresetButton")
  
    act(()=>{
        fireEvent.press(searchButton);
    })
    expect(findPresetObjects).toHaveBeenCalledWith("")
    act(()=>{
        fireEvent.changeText(getByTestId("foodSearchBar"), "searchval")
    })
    act(()=>{
        fireEvent.press(searchButton);
    })
    
    expect(findPresetObjects).toHaveBeenCalledWith("searchval")
  })
  