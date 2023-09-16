import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { getSeatsList } from '../api/api'

const seatColors = {
  '0': '#ebecee',
  '1': '#3f85e0',
  '2': '#aa3731',
  '3': '#ef9d50'
}

const samples = [
  ['#ebebeb', '空闲'],
  ['#000000', '选中'],
  ['#3e82eb', '已被预订'],
  ['#aa3731', '暂时离开'],
  ['#ef9d50', '你的预订']
]

export function SeatList({
  handleSelectSeat,
  selectedSeat,
  submitHandler,
  appointmentData
}) {
  const [seatsInfo, setseatsInfo] = useState()
  useEffect(() => {
    getSeatsList(appointmentData.timeId, appointmentData.date).then((res) => {
      if (res.data.code === 0) {
        let data = res.data.data.data
        data.forEach((d) => {
          let cols = []
          for (let i = 1; i <= d.cols; i++) {
            cols.push(d.data.filter((seat) => seat.col === i))
          }
          d.data = cols
        })
        setseatsInfo(data)
        // setseatsInfo(res.data.data)
      } else {
        Taro.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function () {
            Taro.navigateBack()
          }
        })
      }
    })
  }, [])

  const handleSubmit = () => {
    if (selectedSeat === undefined) {
      Taro.showModal({
        title: '提示',
        content: '未选中座位',
        showCancel: false
      })
      return
    }
    submitHandler()
  }

  return (
    <>
      <View className="flex justify-center p-4 bg-white">
        {samples.map((sample) => (
          <View className="flex items-center mx-1" key={sample[1]}>
            <View
              className="h-2 w-2 mx-1 rounded-full"
              style={{ backgroundColor: sample[0] }}
            ></View>
            <Text className="text-xs">{sample[1]}</Text>
          </View>
        ))}
      </View>
      {seatsInfo && (
        <View className="p-2">
          {seatsInfo.map((layer) => (
            <View className="container flex flex-col mt-4" key={layer.floorNum}>
              <View>
                <Text className="text-lg my-2">第{layer.floorNum}层自习室</Text>
              </View>
              <View className="flex flex-wrap rounded shadow-lg p-4">
                {layer.data.map((col) => (
                  <View
                    className="flex flex-col"
                    style={{ width: `${100 / layer.data.length}%` }}
                    key={col[0].seatId}
                  >
                    {col.map((seat) => (
                      <View
                        className="flex flex-col justify-center items-center mx-5 my-2"
                        key={seat.seatId}
                        onClick={() => handleSelectSeat(seat)}
                      >
                        {selectedSeat === seat.seatId ? (
                          <View
                            className="h-6 w-6 rounded-t"
                            style={{ backgroundColor: '#000000' }}
                          ></View>
                        ) : (
                          <View
                            className="h-6 w-6 rounded-t"
                            style={{ backgroundColor: seatColors[seat.state] }}
                          ></View>
                        )}
                        <Text className="text-xs text-gray-400 mt-1">
                          {seat.num}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          ))}
          <View className="my-4 px-4">
            <Button className="button" onClick={handleSubmit}>
              确认
            </Button>
          </View>
        </View>
      )}
    </>
  )
}
