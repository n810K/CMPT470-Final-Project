const placementValueSetup = (userCount: number) => {
  var placementValueList: number[] = []

  if (userCount % 2 == 1) {
    for (var i = 0; i < Math.floor(userCount / 2); i++) {
      placementValueList.push(1.5 / (i + 1))
    }
    placementValueList.push(0)
    for (var i = Math.floor(userCount / 2); i > 0; i--) {
      placementValueList.push(-1.5 / (i + 1))
    }

    return placementValueList
  }
  for (var i = 0; i < userCount / 2; i++) {
    placementValueList.push(1.5 / (i + 1))
  }
  placementValueList.push(0)
  for (var i = userCount / 2 - 1; i > 0; i--) {
    placementValueList.push(-1.5 / (i + 1))
  }
  return placementValueList
}

const denominator = (userEloList: number[]) => {
  var denominatorSum: number = 0
  for (var i = 0; i < userEloList.length; i++) {
    denominatorSum += Math.pow(10, userEloList[i] / 400)
  }
  return denominatorSum
}

const eloCalculation = (
  matchPlace: number,
  initialElo: number,
  playerEloList: number[]
) => {
  var expectedNumerator: number = Math.pow(10, initialElo / 400)
  var expectedDenominator: number = denominator(playerEloList)
  var expectedScore: number = expectedNumerator / expectedDenominator
  var newElo: number = Math.round(
    initialElo + 32 * (matchPlace - expectedScore)
  )
  return newElo
}

const eloUpdate = (
  user: string,
  matchPlace: number,
  initialElo: number,
  playerEloList: number[]
) => {
  if (playerEloList.length === 1) {
    return initialElo
  }
  var placementSpread = placementValueSetup(playerEloList.length)
  var placementValue: number = placementSpread[matchPlace - 1]
  var updatedElo: number = eloCalculation(
    placementValue,
    initialElo,
    playerEloList
  )
  return updatedElo
}

export default eloUpdate
