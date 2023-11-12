import Nerv from 'nervjs'
import { Textarea } from '@tarojs/components'

export default function WrappedTextarea({ onInput, placeholder }) {
  return (
    <Textarea
      className="input flex-grow"
      style={{ height: '280px', width: 'auto' }}
      placeholder={placeholder}
      onInput={(e) => onInput(e)}
    ></Textarea>
  )
}
