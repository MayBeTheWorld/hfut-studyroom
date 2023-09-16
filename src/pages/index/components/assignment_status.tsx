import Nerv, { useState } from 'nervjs'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import {
  pause,
  back,
  getUnfinishAssignmentStatus,
  stop
} from '../../../api/api'
import { IRecentStatus } from '../../../api/Iapi'

export function AssignmentStatus() {
  const [currStatus, setRecentStatus]: [IRecentStatus[], Function] =
    useState<IRecentStatus>()
  const [show, setShow]: [Boolean, Function] = useState(false)
  const updateStatus = () => {
    getUnfinishAssignmentStatus()
      .then((res) => {
        if (res.data.code === 0 && res.data.data && res.data.data.length > 0) {
          setRecentStatus(res.data.data)
          setShow(true)
        } else {
          setShow(false)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useDidShow(() => {
    updateStatus()
  })

  const handleSeat = (f) => {
    f().then((res) => {
      if (res.data.code === 0) {
        Taro.showToast({
          title: res.data.msg,
          duration: 2000
        })
        updateStatus()
      } else {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  const handleStop = (appointmentId) => {
    stop(appointmentId).then((res) => {
      Taro.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
      updateStatus()
    })
  }

  return (
    show && (
      <View>
        {currStatus.map((item) => (
          <View
            key={item.appointmentId}
            className="card flex flex-col p-4 mt-2"
          >
            <View className="flex">
              <Text className="text-sm">预约ID：{item.appointmentId}</Text>
            </View>
            <View className="flex justify-between">
              <View className="flex flex-col">
                <Text>{item.buildId}号楼</Text>
                <Text className="text-xs">{item.num} 号</Text>
              </View>
              <View className="self-end">
                <Text className="mr-2 text-sm">
                  {item.startTime} - {item.endTime}
                </Text>
              </View>
            </View>
            <View className="flex justify-between mt-2">
              {item.state !== 0 ? (
                item.state === 1 ? (
                  <Button
                    size="mini"
                    className="button"
                    onClick={() => handleSeat(pause)}
                  >
                    暂离座位
                  </Button>
                ) : (
                  <Button
                    size="mini"
                    className=" button"
                    style={{ backgroundColor: '#ffb86c' }}
                    onClick={() => handleSeat(back)}
                  >
                    回到座位
                  </Button>
                )
              ) : (
                <></>
              )}
              <Button
                size="mini"
                className="button"
                onClick={() => handleStop(item.appointmentId)}
              >
                {item.state === 0 ? '取消预约' : '结束学习'}
              </Button>
            </View>
          </View>
        ))}
      </View>
    )
  )
}
