import Nerv, { useState, useEffect } from 'nervjs'
import { View, Text, Image } from '@tarojs/components'
import { getAbout } from '../../../api/api'
import { Footer } from '../../../components/footer'
import ico from '../../../static/logo-ico.png'

export default function About() {
  const [info, setInfo] = useState('')
  useEffect(() => {
    getAbout().then((res) => {
      if (res.data.code === 0) {
        setInfo(res.data.data)
      }
    })
  }, [])
  return (
    <View className="container">
      <View className="p-4 flex flex-col h-screen">
        <View className="flex flex-col items-center mb-4">
          <Image src={ico} style="width: 128px;height: 128px;" />
          <Text className="text-sm font-medium">生活园区自习室预约系统</Text>
        </View>
        {info.split('\\n').map((ph) => (
          <View key={ph} className="card px-4 py-2">
            <Text className=" inline" selectable>
              {ph}
            </Text>
          </View>
        ))}
        <Footer />
      </View>
    </View>
  )
}
