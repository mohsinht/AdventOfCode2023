const inputData = `INSERT DATA HERE`

interface GameSet {
  red: number
  green: number
  blue: number
}

interface GameDetails {
  id: number
  sets: Array<GameSet>
  minimumSet: GameSet
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
  const minimumSet = {
    red: 0,
    green: 0,
    blue: 0,
  }
  for (const set of sets) {
    if (set.red > minimumSet.red) {
      minimumSet.red = set.red
    }
    if (set.blue > minimumSet.blue) {
      minimumSet.blue = set.blue
    }
    if (set.green > minimumSet.green) {
      minimumSet.green = set.green
    }
  }

  return {
    id,
    sets,
    minimumSet,
  }
}

const getSumOfPowerOfMinimumSet = (input: string): number => {
  const allGameStrings = input.split('\n')

  let totalSumOfPowerOfMinimumSet = 0
  for (const gameString of allGameStrings) {
    const gameDetails = parseSingleGameDetailsFromString(gameString)
    const { red, green, blue } = gameDetails.minimumSet
    const powerOfMinimumSet = red * green * blue
    totalSumOfPowerOfMinimumSet =
      totalSumOfPowerOfMinimumSet + powerOfMinimumSet
  }
  return totalSumOfPowerOfMinimumSet
}

const totalSumOfPowerOfMinimumSet = getSumOfPowerOfMinimumSet(inputData)

console.log({
  totalSumOfPowerOfMinimumSet,
})

export {}
