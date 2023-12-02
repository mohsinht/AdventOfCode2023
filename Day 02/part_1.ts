const inputData = `INSERT DATA HERE`

interface GameSet {
  red: number
  green: number
  blue: number
}

interface GameDetails {
  id: number
  sets: Array<GameSet>
}

const getCubeNumberFromSetString = (
  set: string,
  color: 'red' | 'green' | 'blue',
): number => {
  const cubes = set.split(', ').filter(c => c.includes(color))[0]
  if (cubes) {
    return parseInt(cubes.split(` ${color}`)[0])
  }
  return 0
}

const parseSingleGameDetailsFromString = (input: string): GameDetails => {
  const id = parseInt(input.split(':')[0].split(' ')[1])

  const allSetsString = input.split(': ')[1].split('; ')

  const sets: Array<GameSet> = []
  for (const setString of allSetsString) {
    sets.push({
      red: getCubeNumberFromSetString(setString, 'red'),
      green: getCubeNumberFromSetString(setString, 'green'),
      blue: getCubeNumberFromSetString(setString, 'blue'),
    })
  }

  return {
    id,
    sets,
  }
}

const isGamePossible = (game: GameDetails): boolean => {
  for (const set of game.sets) {
    if (set.red > 12) {
      return false
    }
    if (set.green > 13) {
      return false
    }
    if (set.blue > 14) {
      return false
    }
  }
  return true
}

const getSumOfPossibleIds = (input: string): number => {
  const allGameStrings = input.split('\n')

  let totalSumOfIds = 0
  for (const gameString of allGameStrings) {
    const gameDetails = parseSingleGameDetailsFromString(gameString)
    if (isGamePossible(gameDetails)) {
      totalSumOfIds = totalSumOfIds + gameDetails.id
    }
  }
  return totalSumOfIds
}

const totalSumOfPossibleGameIds = getSumOfPossibleIds(inputData)

console.log({
  totalSumOfPossibleGameIds,
})

export {}
