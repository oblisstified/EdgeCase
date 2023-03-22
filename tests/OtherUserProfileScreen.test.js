import React from 'react'
import { render, screen, fireEvent, renderHook,queryAllByType } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';
import {View } from "react-native";

import OtherUserProfileScreen from '../screens/OtherUserProfileScreen';
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


it('Test components are rendered', () => {
    const { getByPlaceholderText, getByText, getByTestId,queryAllByTestId } =render(<OtherUserProfileScreen route={{ params: { email: 'test@example.com' } }} />);
    expect(getByText(`Name`)).toBeDefined();
    expect(getByText(`Posts`)).toBeDefined();
    expect(getByText(`Friends`)).toBeDefined();





    
});

