import React from 'react'
import { render, screen, fireEvent, renderHook,queryAllByType } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';
import {View } from "react-native";

import ProfileScreen from '../screens/ProfileScreen';
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
    const { getByPlaceholderText, getByText, getByTestId,queryAllByTestId } = render(<ProfileScreen />);
    expect(getByTestId('scrollView'));

    const children = queryAllByTestId("scrollViewChild");
    expect(children.length).toBeGreaterThan(4);
    expect(children.length).toBeLessThan(20);

    expect(getByText(`Name:`)).toBeDefined();
    expect(getByText(`Age:`)).toBeDefined();
    expect(getByText(`Gender:`)).toBeDefined();

    
});

