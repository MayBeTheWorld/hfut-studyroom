import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Image, Form, Input, Button } from '@tarojs/components'
import { resetPassword } from '../../../api/api'
import { StudentNumber } from '../../../api/Iapi'
import Nav from '../../../components/nav'
import { Footer } from '../../../components/footer'
import logo from '../../../static/logo.png'
import { getBanners } from '../../../api/api'
import { BASE_URL } from '../../../api/http'

export default function Admin() {
  const [banner, setBanner] = useState()
  useEffect(() => {
    getBanners().then((res) => {
      setBanner(res.data.data.picture)
    })
  }, [])
  const handleReset = (e) => {
    console.log(e.detail.value)
    Taro.showLoading({
      title: '重置中'
    })
    resetPassword(e.detail.value as StudentNumber).then((res) => {
      console.log('happen3')
      console.log(res)
      Taro.hideLoading()
      if (res.data.code === 0) {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    Taro.hideLoading()
  }

  return (
    <View className="container mx-auto">
      <View className="px-4">
        <Nav>
          <View className="flex flex-col mt-3">
            <Image className="h-7 w-40" src={logo} mode="aspectFill" />
            <Text className="text-xl mt-2">管理员账号</Text>
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
        <Form onSubmit={handleReset}>
          <View className="card mt-4 p-4">
            <Text className="text-xl">重置密码</Text>
            <View className="bg-white">
              <View className="space-y-8">
                <View>
                  <Input
                    className="input"
                    name="studentId"
                    placeholder="请输入学号"
                  ></Input>
                </View>
                <View className="mt-4">
                  <Button className="button" formType="submit">
                    下一步
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Form>
        <Footer />
      </View>
    </View>
  )
}
