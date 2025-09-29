export type ShuttleSplitCalculationProps = {
  rentalCost: number
  shuttleAmount: number
  shuttlePrice: number
}
export type ShuttleSplitCalculationWeighted = ShuttleSplitCalculationProps & {
  players: string[]
}

export type ShuttleSplitCalculationEqually = ShuttleSplitCalculationProps & {
  numberOfPlayers: number;
};


export class HttpShuttleSplitCalculationRequestForm {
  rentalCost: number
  shuttleAmount: number
  shuttlePrice: number
  constructor(props: ShuttleSplitCalculationProps){
    this.rentalCost = props.rentalCost
    this.shuttleAmount = props.shuttleAmount
    this.shuttlePrice = props.shuttlePrice
  }
}

export class ShuttleSplitCalculationWeightedRequestForm extends HttpShuttleSplitCalculationRequestForm {
  players: string[]
  constructor(props: ShuttleSplitCalculationWeighted) {
    super(props)
    this.players = props.players
  }
}

export class ShuttleSplitCalculationEquallyRequestForm extends HttpShuttleSplitCalculationRequestForm {
  numberOfPlayers: number
  constructor(props: ShuttleSplitCalculationEqually) {
    super(props)
    this.numberOfPlayers = props.numberOfPlayers
  }
}