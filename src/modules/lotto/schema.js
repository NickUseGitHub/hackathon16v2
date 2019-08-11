export default `
input checkLottoInput {
  number: ID!
}

type Query {
  checkLotto(
    lottoInput: checkLottoInput!
  ): CheckedLottoPrize

  recentLotto : Lotto
}

type CheckedLottoPrize {
  title: String
  type: String
  prize: LottoPrizeGroup
}

type LottoAnnounceDate {
  issueDateOnHuman(
    autoRelative: Boolean,
    relative: Boolean,
    locale: String,
    format: String
  ): String
}

type LottoConnection {
  lottosCount: Int!
  edges: [LottoEdge]
  pageInfo: PageInfo!
}

type LottoEdge {
  cursor: String!
  node: Lotto
}

type Lotto {
  id: String!
  title: String
  issueDateOnHuman(
    autoRelative: Boolean,
    relative: Boolean,
    locale: String,
    format: String
  ): String
  keywords: [String]
  hasPrizeFirst3: Boolean
  hasSpecialPrize: Boolean
  prizeResult: LottoResult
}

type LottoResult {
  prize1: LottoPrizeGroup
  prize2: LottoPrizeGroup
  prize3: LottoPrizeGroup
  prize4: LottoPrizeGroup
  prize5: LottoPrizeGroup
  prize1Close: LottoPrizeGroup
  prizeLast2: LottoPrizeGroup
  prizeLast3: LottoPrizeGroup
  prizeFirst3: LottoPrizeGroup
  specialPrizeGroup: LottoSpecialPrize
}

type LottoSpecialPrize {
  prizeGroup1: LottoPrizeGroup
  prizeGroup2: LottoPrizeGroup
}

type LottoPrizeGroup {
  amount: Int!
  value: String!
  results: [String]
}
`
