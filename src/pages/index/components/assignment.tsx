import Nerv, { useEffect, useState, useCallback } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Button, Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { getTimeList } from '../../../api/api'
import { ITime } from '../../../api/Iapi'

export function Assignment() {
  const [timeList, setTimeList]: [ITime[], Function] = useState([])
  const [date, setDate] = useState()
  const [time, setTime] = useState(0)
  useEffect(() => {
    getTimeList().then((res) => {
      if (res.data.code === 0) {
        setTimeList(res.data.data)
        setDate(res.data.data[0].date)
      }
    })
  }, [])

  const handleDateChange = (e) => {
    setTime(0)
    setDate(timeList[Number(e.detail.value)].date)
  }

  const currTimeList = useCallback(() => {
    return timeList.filter((t) => t.date === date)[0]
  }, [timeList, date])
  return timeList.length > 0 ? (
    <View className="card mt-4 p-4">
      <Text className="text-xl">预订座位</Text>
      <View className="bg-white">
        <View className="space-y-8">
          <Picker
            range={timeList.map((d) => d.date)}
            onChange={(e) => handleDateChange(e)}
            value={date}
          >
            <AtList hasBorder={false}>
              <AtListItem
                iconInfo={{ size: 18, value: 'calendar' }}
                extraText={date}
              />
            </AtList>
          </Picker>
          <Picker
            range={currTimeList().times.map(
              (t) => `${t.startTime} - ${t.endTime}`
            )}
            onChange={(e) => setTime(e.detail.value)}
            value={time}
          >
            <AtList>
              <AtListItem
                iconInfo={{ size: 18, value: 'clock' }}
                extraText={`${currTimeList().times[time].startTime} - ${
                  currTimeList().times[time].endTime
                }`}
              />
            </AtList>
          </Picker>
          <View className="mt-4">
            <Button
              className="button"
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/seatselect/seatselect?timeId=${
                    currTimeList().times[time].id
                  }&appointmentDate=${date}`
                })
              }
            >
              下一步
            </Button>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <></>
  )
}
