import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'

const _layout = () => {
 const isAuthenticated = false; // Replace with actual authentication logic

    if (!isAuthenticated) return  <Redirect href='/sign-in' />
    return  <Slot />
}

export default _layout