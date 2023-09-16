import Nerv from 'nervjs'
import { View } from '@tarojs/components'
import { getGlobalData } from '../global'

import './nav.scss'

export default function Nav({ children }) {
  return (
    <View
      className="nav-bar"
      style={{ marginTop: getGlobalData('navBarMarginTop') }}
    >
      {children}
    </View>
  )
}
