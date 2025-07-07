import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Link } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
  const  [isSubmitting, setIsSubmitting] = useState(false)
  const  [form, setForm] = useState({ email: '', password: '' })


  const submit = async () => {
    if (!form.email || !form.password) return Alert.alert('Error', 'Please fill in all fields correctly')
    setIsSubmitting(true)
    try {
      // Call app write sign in function here
       Alert.alert('Success', 'You have signed in successfully')
      router.push('/')
    }catch (error : any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    } 
  }



  return (
    <View className='gap-10 rounded-lg p-5 mt-5'>
     <CustomInput
        placeholder='Enter Your Email' 
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label='Email'
        keyboardType='email-address' />
      <CustomInput
        placeholder='Enter Your Password' 
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label='Password'
        secureTextEntry={true}
        keyboardType='default'
      />
      <CustomButton 
      title='Sign In'
      isLoading={isSubmitting}
      onPress={submit} />
      <View className='flex  flex-row justify-center gap-2  mt-5'>
        <Text className='base-regular text-gray-100'>Don't have an account?</Text>
        <Link href="/sign-up" className='base-bold text-primary'>Sign Up</Link>
      </View>
    </View>
  )
}

export default SignIn