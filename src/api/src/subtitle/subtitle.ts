/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to transform audio to subtitles.
 * 
 * @project Stefan AI 4
 */

/**
 * Imports
 */
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import ffmpeg from 'fluent-ffmpeg'
import readline from 'readline'
import fs from 'fs-extra'
import path from 'path'

/**
 * * Create __dirname 
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function audioToSubtitles(inputAudio: string, transcriptPath: string, outputSubtitlesPath: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        // Filepath to MFA dict folder
        const mfaFolder = path.join(__dirname, '../../mfa')
        const dictionaryPath = path.join(mfaFolder, 'english_us_arpa.dict')
        const acousticModelPath = path.join(mfaFolder, 'english_us_arpa')

        // Create a temp directory
        const corpusDirectory = path.join(__dirname, '../../', Date.now().toString())
        fs.existsSync(corpusDirectory) ? fs.removeSync(corpusDirectory) : null
        fs.mkdirSync(corpusDirectory, { recursive: true })

        // Create a random dir inside corpusDirectory
        const randomDir = path.join(corpusDirectory, Date.now().toString())
        fs.mkdirSync(randomDir, { recursive: true })

        if (!inputAudio.endsWith('.wav')) {
            const ffmpegProcess: boolean = await new Promise((resolve, reject) => {
                ffmpeg()
                    .input(inputAudio)
                    .output(path.join(randomDir, 'transcript.wav'))
                    .on('end', () => {
                        resolve(true)
                    })
                    .on('error', () => {
                        reject(false)
                    })
                    .run()
            })

            if (!ffmpegProcess) {
                reject(false)
            }
        } else {
            fs.copyFileSync(inputAudio, path.join(randomDir, 'transcript.wav'))
        }

        // Copy the transcript file only if it ends with .lab
        transcriptPath.endsWith('.lab') ? fs.copyFileSync(transcriptPath, path.join(randomDir, 'transcript.lab')) : reject(false)

        // Start MFA
        const process = spawnSync('mfa', ['align', '--single_speaker', randomDir, dictionaryPath, acousticModelPath, corpusDirectory])

        // Check if the process was successful
        if (process.status !== 0) {
            reject(false)
        }

        // Read the output file
        let outputFile = path.join(corpusDirectory, 'transcript.TextGrid')

        // Filter the output file
        const timings: Array<Timing> = await parseTextGrid(outputFile) as Array<Timing>

        timings.forEach((timing: Timing) => {
            const minTime = formatTime(timing.xmin)
            const maxTime = formatTime(timing.xmax)
            const text = timing.text

            const subtitle = createSubtitle(minTime, maxTime, text)

            fs.appendFileSync(outputSubtitlesPath, '\n' + subtitle)
        })

        // Remove the temp directory
        fs.removeSync(corpusDirectory)

        resolve(true)
    })
}

/**
 * * Format seconds into .ass time
 * @param time
 */
function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(1, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toFixed(2).padStart(5, '0')}`
}

/**
 * Create Advanced SubStation Alpha format subtitles
 * Includes a pop in animation
 * @param startTime
 * @param endTime
 * @param text
 */
function createSubtitle(startTime: string, endTime: string, text: string) {
    return `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,{\\t(0,100,\\fscx105\\fscy105)\\t(100,200,\\fscx100\\fscy100)}${text}`
}

async function parseTextGrid(filePath: string): Promise<Array<object>> {
    const fileStream = fs.createReadStream(filePath)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let itemIndex = 0

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const intervals: any[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentInterval: any = {}

    for await (const line of rl) {
        if (line.includes('item [1]:')) {
            itemIndex = 1
        } else if (line.includes('item [2]:')) {
            itemIndex = 2
        }

        if (itemIndex === 1) {
            // Parse the lines for item [1]
            if (line.includes('intervals')) {
                if (Object.keys(currentInterval).length > 0 && 'text' in currentInterval) {
                    intervals.push(currentInterval)
                }
                currentInterval = {}
            } else {
                const match = line.match(/(\w+) = (.+)/)
                if (match) {
                    const key = match[1]
                    const value = match[2].replace(/"/g, '')
                    currentInterval[key] = value
                }
            }
        }
    }

    // Push the last interval
    if (Object.keys(currentInterval).length > 0 && 'text' in currentInterval) {
        intervals.push(currentInterval)
    }

    return intervals
}

/**
 * Timing interface
 */
interface Timing {
    xmin: number
    xmax: number
    text: string
}