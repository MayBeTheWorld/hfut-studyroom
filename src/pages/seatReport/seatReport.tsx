import Nerv, { useState } from 'nervjs'
import Taro, { useRouter } from '@tarojs/taro'
import { Button, View, Text } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { reportSeat, uploadReportFiles } from '../../api/api'
import WrappedTextarea from '../../components/textarea'

const UPLOAD_IMAGE_MAX_SIZE = 1024 * 1024 * 2

export default function SeatReport() {
  const router = useRouter()
  const seatId = router.params.seatId
  const [reportMsg, setReportMsg] = useState('')
  const [files, setFiles] = useState([])

  function onSubmitReport(): void {
    if (reportMsg.length === 0 || reportMsg === '') {
      Taro.showModal({
        title: '提示',
        content: '举报内容不能为空！',
        showCancel: false
      })
      return
    }
    if (!files.length) {
      Taro.showModal({
        title: '提示',
        content: '至少上传一张图片！',
        showCancel: false
      })
      return
    }
    report()
  }

  async function report(): Promise<void> {
    let res = await uploadReportFiles(files).catch((e) => {
      Taro.showModal({
        title: '错误',
        content: e
      })
    })
    const file = JSON.parse(res.data).data
    reportSeat(seatId, reportMsg, file).then((resp) => {
      if (resp.data.code === 0) {
        Taro.showModal({
          title: '提示',
          content: '举报成功！',
          showCancel: false
        }).then(() => Taro.navigateBack({ delta: 2 }))
      } else {
        Taro.showModal({
          title: '错误',
          content: resp.data.msg
        })
      }
    })
  }

  return (
    <View className="w-screen h-screen">
      <View className="p-4 flex flex-col">
        <View className="flex justify-between items-center">
          <Text className="text-lg">监督对象座位ID：{seatId}</Text>
        </View>
        <WrappedTextarea
          placeholder="请描述你要举报的问题"
          onInput={(e) => setReportMsg(e.detail.value)}
        />
        <View className="at-article__info" style="margin-top: 20px">
          请选择1张图片(图片最大只能为{UPLOAD_IMAGE_MAX_SIZE / (1024 * 1024)}MB)
        </View>
        <AtImagePicker
          length={3}
          count={1}
          files={files}
          onChange={(callFiles) => {
            setFiles(
              callFiles.map((file) => {
                if (file.file.size <= UPLOAD_IMAGE_MAX_SIZE) {
                  return file
                }
                Taro.showModal({
                  title: '提示',
                  content: `图片最大只能为${
                    UPLOAD_IMAGE_MAX_SIZE / (1024 * 1024)
                  }MB`,
                  showCancel: false
                }).then((r) => {
                  Taro.navigateBack()
                })
              })
            )
          }}
        />
        <Button className="button mt-2" onClick={onSubmitReport}>
          举报
        </Button>
      </View>
    </View>
  )
}
