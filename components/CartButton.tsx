import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { images } from '../constants';


const CartButton = () => {
    const totalItems = 10;

  return (
    <TouchableOpacity className='card-btn' onPress={() => {}}>
      <Image source={images.bag} className='size-7 bg-dark-100 rounded-full p-2'  resizeMode="contain" />
      {totalItems > 0 ?
        <View className='cart-badge'>
            <Text className='text-white small-bold'>{totalItems}</Text>
        </View>
    : null}
    </TouchableOpacity>
  )
}

export default CartButton