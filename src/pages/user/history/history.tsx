import Nerv, { useState, useEffect } from 'nervjs'
import { View, Text } from '@tarojs/components'
import { getHistoryOfAssignment } from '../../../api/api'

export default function History() {
  const [assignmentList, setAssignmentList] = useState([])
  useEffect(() => {
    getHistoryOfAssignment().then((res) => {
      if (res.data.code === 0) {
        setAssignmentList(res.data.data.data)
      }
    })
  }, [])
  return assignmentList.length > 0 ? (
    <View className="container mx-auto">
      <View className="p-4">
        {assignmentList.map((item) => (
          <View
            key={item.appointmentId}
            className="card p-4 flex flex-col mb-2 text-sm"
          >
            <View className="flex justify-between">
              <Text>#{item.appointmentId}</Text>
              <Text className="text-base">{item.startTime}</Text>
            </View>
            <View className="flex justify-between">
              <Text>第{item.floor}层自习室</Text>
              <Text className="text-xs">{item.num} 号</Text>
            </View>
            <View className="flex justify-between">
              <Text>学习时间</Text>
              <Text>{item.learnTime} min</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <></>
  )
}
