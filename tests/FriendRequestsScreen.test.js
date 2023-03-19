
import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList } from 'react-native';

import {Directions, TextInput } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FriendRequestsScreen from '../screens/FriendRequestsScreen';
import { render, screen, fireEvent } from '@testing-library/react-native';

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

let sampleData = ["friend1@example.com"];




it('Test components are rendered', async () => {
    const {findAllByTestId} = render(<FriendRequestsScreen friendRequestsList={sampleData} />);
    expect(findAllByTestId("child").length).toBe(sampleData.length);


   
  });