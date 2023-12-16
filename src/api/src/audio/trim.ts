/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to trim audio files.
 * 
 * @project Stefan AI 4
 */

/**
 * Imports
 */
import ffmpeg from 'fluent-ffmpeg'

export default function trim(input: string, output: string, start: number, end: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(input)
            .output(output)
            .setStartTime(start)
            .setDuration(end)
            .on('end', () => {
                resolve(true)
            })
            .on('error', () => {
                reject(false)
            })
            .run()
    })
}