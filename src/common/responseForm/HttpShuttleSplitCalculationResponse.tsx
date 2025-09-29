export type ShuttleSplitCalculationData = {
  data: ShuttleSplitCalculationCost
}

export type ShuttleSplitCalculationCost = {
  cost: Map<string, number>
}

export class HttpShuttleSplitCalculationResponse {
  data?: ShuttleSplitCalculationData
  constructor(data?: ShuttleSplitCalculationData){
    this.data = data
  }
  public getCost = (): Map<string, number> | undefined=> {
    return this.data?.data.cost
  }
  public getData = (): ShuttleSplitCalculationCost | undefined => {
    return this.data?.data
  }
}