import axios, { type AxiosResponse } from "axios"

const getConfig = (url: string) => {
  return {
    url,
    baseURL: "https://nno3q5ecp6.execute-api.us-west-2.amazonaws.com/Stage/api",
    allowAbsoluteUrls: false,
    headers: {
      "Content-Type": "application/json",
    }
  }
}

export const httpPost = (url: string, params?: any, data?: any): Promise<AxiosResponse<any, any, {}>> => {
  const config = getConfig(url)
  return axios({ ...config, params, method: "post", data })
}

export const httpGet = (url: string, params?: any): Promise<AxiosResponse<any, any, {}>> => {
  const config = getConfig(url)
  return axios({ ...config, params, method: "get" })
} 