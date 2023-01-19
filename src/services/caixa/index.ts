export interface LatestLotteryResponse {
  contest: number
  drawn: string[]
}

export const getLatestLottery = async (): Promise<LatestLotteryResponse> => {
  const response = await fetch(
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
  )
  const result = await response.json()

  return {
    contest: result.numero as number,
    drawn: result.listaDezenas as string[]
  }
}
