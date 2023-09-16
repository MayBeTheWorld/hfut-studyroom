import Nerv from 'nervjs'
import { View, Text, Image } from '@tarojs/components'
import newxlogo from '../static/newx-logo.png'

export function Footer() {
  return (
    <View>
      <View className="flex justify-center items-center">
        <Text className="text-gray-300">Powered by </Text>
        <Image className="h-16 w-24" src={newxlogo} mode="aspectFit" />
      </View>
      <View className="flex flex-col justify-center items-center text-gray-300">
        <Text>版权所有©{new Date().getFullYear()} 学生工作办公室</Text>
        <Text>大学生网络文化工作室研发设计</Text>
      </View>
    </View>
  )
}
