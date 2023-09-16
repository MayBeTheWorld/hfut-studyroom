import Nerv, { useState } from 'nervjs'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { SeatList } from '../../components/seatList'

export default function SeatSelect() {
  const [selectedSeat, setSelectedSeat] = useState<String>()
  const router = useRouter()
  const appointmentData = {
    timeId: router.params.timeId,
    date: router.params.appointmentDate
  }
  const handleSelectSeat = (seat) => {
    setSelectedSeat(seat.seatId)
  }
  const submitHandler = () => {
    Taro.navigateTo({
      url: `seatReport?seatId=${selectedSeat}`
    })
  }

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
