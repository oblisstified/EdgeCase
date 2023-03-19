import React from 'react'
import { render, screen, fireEvent, renderHook,queryAllByType,waitFor, } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';
import {View, Text } from "react-native";



import FriendsScreen from '../screens/FriendsScreen';
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
const sampleData = [
     'friend1@example.com' ,
    'friend2@example.com' ,
    'friend3@example.com'
  ];


  it('Test components are rendered', async () => {


    const { getByText, findAllByTestId,queryAllByTestId } = render(<FriendsScreen friendsList={sampleData} />);
    expect(getByText('friends:')).toBeDefined();
    const flatListComponent = await findAllByTestId('flatlist');
    expect(flatListComponent.length).toBe(1);
    const flatlistChild = await findAllByTestId('flatlistChild');
    expect(flatlistChild.length).toBe(sampleData.length);//doesnt work?
  });
  
  
  


