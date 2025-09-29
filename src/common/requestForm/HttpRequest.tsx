import axios, { type AxiosResponse } from "axios"

const mapConfigs = new Map<string, Object>()
const mapProxyToConfigs = () => {
  mapConfigs.set("/api", {
    baseUrl: 'https://nno3q5ecp6.execute-api.us-west-2.amazonaws.com/Stage',
    allowAbsoluteUrls: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

const getConfig = async (proxy: string = "/api") => {
  if (mapConfigs.size === 0) await mapProxyToConfigs()
  return mapConfigs.get(proxy)
}

export const httpPost = async (url: string, params?: any, data?: any): Promise<AxiosResponse<any, any, {}>> => {
  const config = { ...(await getConfig(url)), params }
  return await axios({ ...config, url, method: "post", data })
}

export const httpGet = async (url: string, params?: any): Promise<AxiosResponse<any, any, {}>> => {
  const config = { ...(await getConfig(url)), params }
  return await axios({ ...config, url, method: "get"})
} 