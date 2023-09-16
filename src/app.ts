import { Component } from 'nervjs'
import Taro from '@tarojs/taro'
import 'windi.css'
import { setGlobalData } from './global'
import './app.scss'

class App extends Component {
  componentDidMount() {
    Taro.getSystemInfo({}).then((res) => {
      setGlobalData('navBarMarginTop', res.statusBarHeight || 0)
    })
  }

  onLaunch() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '小程序已更新，请重启以应用新版本',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
