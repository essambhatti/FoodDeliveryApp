import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Link } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {
  const  [isSubmitting, setIsSubmitting] = useState(false)
  const  [form, setForm] = useState({ name: '', email: '', password: '' })


  const submit = async () => {
    if (!form.email || !form.password || !form.name) return Alert.alert('Error', 'Please fill in all fields correctly')
    setIsSubmitting(true)
    try {
      await createUser({
        email: form.email,
        password: form.password,
        name: form.name
      })

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
        placeholder='Enter Your Name' 
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label='Name'
        keyboardType='default' />
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
      title='Sign Up'
      isLoading={isSubmitting}
      onPress={submit} />
      <View className='flex  flex-row justify-center gap-2  mt-5'>
        <Text className='base-regular text-gray-100'>Already have an Account?</Text>
        <Link href="/sign-in" className='base-bold text-primary'>Sign In</Link>
      </View>
    </View>
  )
}

export default SignUp