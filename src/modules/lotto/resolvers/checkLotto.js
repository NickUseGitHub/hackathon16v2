import get from 'lodash/get'
import recentLotto from './recentLotto'

const prizeTypes = {
  prize1: 'รางวัลที่ 1',
  prize2: 'รางวัลที่ 2',
  prize3: 'รางวัลที่ 3',
  prize4: 'รางวัลที่ 4',
  prize5: 'รางวัลที่ 5',
  prize1Close: 'รางวัลใกล้เคียงรางวัลที่ 1',
  prizeLast2: 'รางวัลเลขท้าย 2 ตัว',
  prizeLast3: 'รางวัลเลขท้าย 3 ตัว',
  prizeFirst3: 'รางวัลเลขทหน้า 3 ตัว',
  specialPrizeGroup: '',
}

export default async function checkLotto(_, { lottoInput }) {
  const inquiryNumber = get(lottoInput, 'number')
  const result = await recentLotto()
  const prizeResult = get(result, 'prizeResult') || []
  const checkedPrizeKey = Object.keys(prizeResult).reduce(
    function checkEachPrize(winPrize, priceKey) {
      if (winPrize) return winPrize

      const currentPrizes = get(prizeResult, `${priceKey}.results`) || []
      if (currentPrizes.indexOf(inquiryNumber) === -1) return null

      return priceKey
    },
    null,
  )

  if (!checkedPrizeKey) return null

  const winningPrize = prizeResult[checkedPrizeKey]

  return {
    title: result.title,
    type: prizeTypes[checkedPrizeKey],
    prize: winningPrize,
  }
}
