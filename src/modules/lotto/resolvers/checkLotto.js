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

function checkWinPrice({ currentPrizes, inquiryNumber, prizeType }) {
  switch (prizeType) {
    case 'prize1':
    case 'prize2':
    case 'prize3':
    case 'prize4':
    case 'prize5':
    case 'prize1Close':
      return currentPrizes.indexOf(inquiryNumber) !== -1
    case 'prizeLast2':
      return currentPrizes.indexOf(inquiryNumber.toString().slice(4, 6)) !== -1
    case 'prizeLast3':
      return currentPrizes.indexOf(inquiryNumber.toString().slice(3, 6)) !== -1
    case 'prizeFirst3':
      return currentPrizes.indexOf(inquiryNumber.toString().slice(0, 3)) !== -1
  }

  return false
}

export default async function checkLotto(_, { lottoInput }) {
  const inquiryNumber = get(lottoInput, 'number')
  const result = await recentLotto()
  const prizeResult = get(result, 'prizeResult') || []
  const checkedPrizeKey = Object.keys(prizeResult).reduce(
    function checkEachPrize(winPrize, prizeType) {
      if (winPrize) return winPrize

      const currentPrizes = get(prizeResult, `${prizeType}.results`) || []

      return checkWinPrice({ currentPrizes, inquiryNumber, prizeType }) === true
        ? prizeType
        : null
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
