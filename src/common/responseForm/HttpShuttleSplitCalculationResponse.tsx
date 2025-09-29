export type ShuttleSplitCalculationData = {
  data: ShuttleSplitCalculationCost
}

export type ShuttleSplitCalculationCost = {
  cost: Record<string, any>
}

export class HttpShuttleSplitCalculationResponse {
  data?: ShuttleSplitCalculationData
  constructor(data?: ShuttleSplitCalculationData){
    this.data = data
  }
  public getCost = (): object | undefined => {
    return this.data?.data.cost
  }
  public getData = (): ShuttleSplitCalculationCost | undefined => {
    return this.data?.data
  }
}