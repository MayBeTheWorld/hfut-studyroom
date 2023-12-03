import { RequestTask } from '@tarojs/taro'
import { get, post, uploadFile } from './http'
import {
  LoginProps,
  AdminProps,
  IRecentStatus,
  IStudentInfo,
  ITime,
  StudentNumber
} from './Iapi'

interface BaseResp<T> {
  code: Number
  msg: string
  data?: T
}

export function login(loginProps: LoginProps): RequestTask<BaseResp<Object>> {
  return post({
    url: '/login',
    data: loginProps
  })
}

// 管理员账号登录接口
export function adminLogin(
  adminProps: AdminProps
): RequestTask<BaseResp<Object>> {
  return post({
    url: '/adminLogin',
    data: adminProps
  })
}

// 学生账号重置接口
export function resetPassword(
  studentNumber: StudentNumber
): RequestTask<BaseResp<Object>> {
  return post({
    url: '/resetPassword',
    data: studentNumber
  })
}

export function getSeatsList(timeId, appointmentDate) {
  let data = {
    timeId: timeId,
    appointmentDate: appointmentDate
  }
  return get({
    url: '/student/appointment/info',
    data: data
  })
}

export function getUnfinishAssignmentStatus(): RequestTask<
  BaseResp<IRecentStatus[]>
> {
  return get({
    url: '/student/unfinished'
  })
}

export function getStudentInfo(): RequestTask<BaseResp<IStudentInfo>> {
  return get({
    url: '/student/info'
  })
}

export function getHistoryOfAssignment() {
  return get({
    url: '/student/history'
  })
}

export function pause() {
  return get({
    url: '/student/appointment/pause'
  })
}

export function back() {
  return get({
    url: '/student/appointment/back'
  })
}

export function stop(appointmentId) {
  return get({
    url: '/student/appointment/stop',
    data: {
      appointmentId: appointmentId
    }
  })
}

export function appointment(seatId, timeId, appointmentDate) {
  const data = {
    seatId: seatId,
    timeId: timeId,
    appointmentDate: appointmentDate
  }
  return get({
    url: '/student/appointment/',
    data: data
  })
}

export function getTimeList(): RequestTask<BaseResp<ITime[]>> {
  return get({
    url: '/student/appointment/available'
  })
}

export function getBanners() {
  return get({
    url: '/banner'
  })
}

export function feedback(msg, qq) {
  return post({
    url: '/student/feedback',
    data: {
      msg: msg,
      qq: qq
    }
  })
}

export function help() {
  return get({
    url: '/help'
  })
}

export function getAbout() {
  return get({
    url: '/about'
  })
}

export function getAppName() {
  return get({
    url: '/student/application/name'
  })
}

export function reportSeat(id, msg: string, src: string): Promise<any> {
  return post({
    url: `/student/report/${id}`,
    data: {
      msg: msg,
      picture: src
    }
  })
}

export function uploadReportFiles(files: File[]): Promise<any> {
  const url = '/upload'
  return uploadFile(url, files)
}
