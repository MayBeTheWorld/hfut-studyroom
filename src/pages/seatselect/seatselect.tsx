import Nerv, { useState } from 'nervjs'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { SeatList } from '../../components/seatList'
import { appointment } from '../../api/api'

export default function SeatSelect() {
  const [selectedSeat, setSelectedSeat] = useState<String>()
  const router = useRouter()
  const appointmentData = {
    timeId: router.params.timeId,
    date: router.params.appointmentDate
  }
  const handleSelectSeat = (seat) => {
    if (seat.state !== 0) return
    setSelectedSeat(seat.seatId)
  }
  const submitHandler = () =>
    appointment(
      selectedSeat,
      appointmentData.timeId,
      appointmentData.date
    ).then((res) => {
      if (res.data.code === 0) {
        Taro.showModal({
          title: '提示',
          content: '预约成功，请按时使用',
          showCancel: false,
          success: function () {
            Taro.navigateBack()
          }
        })
      } else {
        Taro.showToast({
          title: res.data.msg,
          duration: 2000,
          icon: 'none'
        })
      }
    })

  return (
    <View className="container">
      <SeatList
        handleSelectSeat={handleSelectSeat}
        selectedSeat={selectedSeat}
        submitHandler={submitHandler}
        appointmentData={appointmentData}
      />
    </View>
  )
}
