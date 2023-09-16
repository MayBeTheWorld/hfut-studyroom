import Nerv, { useState, useEffect } from 'nervjs'
import { View, Text } from '@tarojs/components'
import { help } from '../../../api/api'

export default function Help() {
  const [helps, setHelps] = useState([])
  useEffect(() => {
    help().then((res) => {
      if (res.data.code === 0) {
        setHelps(res.data.data)
      }
    })
  }, [])
  return (
    <View className="container">
      <View className="p-4">
        {helps.map((item) => (
          <View className="card mb-4 px-4 py-2" key={item.id}>
            <Text className="block mb-2 text-sm">问：{item.problem}</Text>
            <Text className="text-sm" selectable>
              答：
            </Text>
            {item.answer.split('\n').map((ph) => (
              <Text key="ph" className="text-sm block" selectable>
                {ph}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
