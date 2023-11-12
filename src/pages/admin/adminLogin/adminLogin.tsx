import Nerv from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import { adminLogin } from '../../../api/api'
import { AdminProps } from '../../../api/Iapi'
import { BASE_URL } from '../../../api/http'

export default function Login() {
  const handleLogin = (e) => {
    Taro.showLoading({
      title: '登录中'
    })
    // 管理员使用属性与登录属性不同
    console.log('管理员登录')
    adminLogin(e.detail.value as AdminProps).then((res) => {
      Taro.hideLoading()
      if (res.data.code === 0) {
        Taro.reLaunch({
          url: '/pages/admin/adminIndex/adminIndex'
        })
      } else {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  return (
    <View
      className="container mx-auto bg-cover"
      style={{
        backgroundImage: `url(${BASE_URL}/res/study_room/c92fad14-af44-4d11-91b8-f7dcf3fc8b0b.png)`
      }}
    >
      <View className="px-12 flex flex-col h-screen">
        <View className="flex flex-col justify-center h-full">
          <View className="flex flex-col">
            <Text className="text-3xl font-bold">登录</Text>
            <Text className="font-medium">管理员账号</Text>
          </View>
          <Form onSubmit={handleLogin}>
            <View className="mt-8 flex flex-col justify-center">
              <View>
                <Input
                  className="input"
                  name="username"
                  placeholder="请输入账号"
                ></Input>
              </View>
              <View className="mt-4">
                <Input
                  className="input"
                  name="password"
                  password
                  placeholder="请输入密码"
                ></Input>
              </View>
            </View>
            <Button
              className="text-white text-sm px-4 py-2 w-full mt-4 rounded-full"
              style={{ backgroundColor: '#359089' }}
              formType="submit"
            >
              登录
            </Button>
          </Form>
        </View>
      </View>
    </View>
  )
}
