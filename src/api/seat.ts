import { post, uploadFile } from './http'

export function reportSeat(id: number, msg: string, src: string): Promise<any> {
  const url = `/student/report/${id}`

  return post({
    url,
    data: {
      msg,
      picture: src
    }
  })
}

export function uploadReportFiles(files: File[]): Promise<any> {
  const url = '/upload'
  return uploadFile(url, files)
}
