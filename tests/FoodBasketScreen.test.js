import React from 'react'
import { render, screen, fireEvent, renderHook } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';

import FoodBasketScreen from '../screens/FoodBasketScreen';
import { DeviceEventEmitter } from 'react-native';
import { saveMeal, createPreset } from '../utils/saver';
import { getAuth } from 'firebase/auth'

jest.mock("../utils/saver");
jest.mock("firebase/auth")

getAuth.mockReturnValue(JSON.parse(
    `{"currentUser":{"email": "sa@gmail.com"}}`
))
const basketString = `[{"foodObject": {"Calories": 1326, "Carbohydrate": 10, "Description": "CHEESE,CARAWAY", "Fiber": 0, "Monounsaturated Fat": 29, "Polyunsaturated Fats": 2, "Protein": 88, "Saturated Fat": 65, "Sugar": 0}, "weight": 100}, {"foodObject": {"Calories": 226, "Carbohydrate": 14, "Description": "MILK,GOAT,FLUID,W/ ADDED VITAMIN D", "Fiber": 0, "Monounsaturated Fat": 3, "Polyunsaturated Fats": 0, "Protein": 11, "Saturated Fat": 8, "Sugar": 14}, "weight": 150}]`
const basketObject = JSON.parse(`[{"foodObject": {"Calories": 1326, "Carbohydrate": 10, "Description": "CHEESE,CARAWAY", "Fiber": 0, "Monounsaturated Fat": 29, "Polyunsaturated Fats": 2, "Protein": 88, "Saturated Fat": 65, "Sugar": 0}, "weight": 100}, {"foodObject": {"Calories": 226, "Carbohydrate": 14, "Description": "MILK,GOAT,FLUID,W/ ADDED VITAMIN D", "Fiber": 0, "Monounsaturated Fat": 3, "Polyunsaturated Fats": 0, "Protein": 11, "Saturated Fat": 8, "Sugar": 14}, "weight": 150}]`)

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
        pop: jest.fn(),
      }),
    };
});
// =====================================================================
afterEach(()=>{
    jest.clearAllMocks();
})

it('Test remove button', () => {
    route={
        params:{
            currentBasket: basketObject,
        },
    }

    render(<FoodBasketScreen
        route={route}
    />);

    let foodList = screen.getByTestId("basketList");
    let foodListLength = foodList.children.length;

    const removeButton = screen.getByTestId(basketObject[0].foodObject.Description + "button");
    fireEvent.press(removeButton);

    foodList = screen.getByTestId("basketList");
    expect(foodList.children.length).toBe(foodListLength - 1);
});

it("test call to saveMeal", ()=>{
    route={
        params:{
            currentBasket: basketObject,
        },
    }

    render(<FoodBasketScreen
        route={ route }
    />);
    
    const saveButton = screen.getByTestId("saveButton");
    fireEvent.press(saveButton);

    expect(saveMeal).toHaveBeenCalledTimes(1);
    expect(saveMeal).toHaveBeenCalledWith(basketObject, "sa@gmail.com", false)
})

it("test call to save presets", ()=>{
    route={
        params:{
            currentBasket: basketObject,
        },
    }

    render(<FoodBasketScreen
        route={ route }
    />);
    
    fireEvent.changeText(screen.getByTestId("nameBar"), "random preset name")
    const saveButton = screen.getByTestId("savePresetButton");
    fireEvent.press(saveButton);

    expect(createPreset).toHaveBeenCalledTimes(1);
    expect(createPreset).toHaveBeenCalledWith(basketObject, "random preset name")
})



