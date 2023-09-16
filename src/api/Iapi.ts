export interface LoginProps {
  studentId: string
  password: string
}

export interface IStudentInfo {
  buildId: Number
  id: Number
  major: String
  name: String
  sex: String
  state: Number
  studentId: Number
  appointmentNumber: Number
  homeId: Number
}

export interface IRecentStatus {
  appointmentId: number
  buildId: Number
  col: Number
  endTime: String
  floor: Number
  num: Number
  row: Number
  seatId: Number
  startTime: String
  state: 0 | 1 | 2
  timeId: number
}

export interface ITime {
  date: string
  times: {
    id: Number
    startTime: string
    endTime: Number
    available: boolean
  }
}
