import { createWorker } from 'tesseract.js'

export const handleGame = async (
  file: string,
  drawn: string[]
): Promise<Game[]> => {
  const worker = await createWorker()
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  await worker.setParameters({ tessedit_char_whitelist: '0123456789' })

  const {
    data: { text }
  } = await worker.recognize(file)

  const output = text
    .replaceAll(' ', '')
    .split('\n')
    .map((s) => s.match(/.{1,2}/g))
    .filter((game): game is RegExpMatchArray => game != null)

  const games: Game[] = []

  for (let i = 0; i < output.length; i++) {
    const game = output[i]
    const plays = game.map((n) => ({
      guess: n,
      drawn: drawn.includes(n)
    }))

    games.push({
      prefix: String.fromCharCode(i + 65),
      plays: plays
    })
  }

  return games
}

export type Game = {
  prefix: string
  plays: Play[]
}

type Play = {
  guess: string
  drawn: boolean
}
