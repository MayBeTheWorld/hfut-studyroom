import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Nav from '../../components/nav'
import { AssignmentStatus } from './components/assignment_status'
import { Assignment } from './components/assignment'
import { Footer } from '../../components/footer'
import logo from '../../static/logo.png'
import { getAppName, getBanners, getTimeList } from '../../api/api'
import { BASE_URL } from '../../api/http'

export default function Index() {
  const [banner, setBanner] = useState()
  const [title, setTitle] = useState('')
  useEffect(() => {
    getBanners().then((res) => {
      console.log('banners')
      console.log(res.data)
      setBanner(res.data.data.picture)
    })
    getAppName().then((res) => {
      console.log('appName')
      console.log(res.data)
      setTitle(res.data.data)
    })
  }, [])

  return (
    <View className="container mx-auto">
      <View className="px-4">
        <Nav>
          <View className="flex flex-col mt-3">
            <Image className="h-7 w-40" src={logo} mode="aspectFill" />
            <Text className="text-xl mt-2">{title}</Text>
          </View>
        </Nav>
        <View className="rounded shadow-sm">
          {banner ? (
            <Image
              style="width: 100%;height: 125px;"
              src={BASE_URL + '/' + banner}
              mode="aspectFill"
              className="card mt-2"
            />
          ) : (
            <></>
          )}
        </View>
        <AssignmentStatus />
        <Assignment />
        <Footer />
      </View>
    </View>
  )
}
