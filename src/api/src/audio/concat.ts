/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to concatenate multiple audio files.
 * 
 * @project Stefan AI 4
 */

/**
 * Imports
 */
import ffmpeg from 'fluent-ffmpeg'

export default function concat(inputAudios: string[], outputAudio: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input('concat:' + inputAudios.join('|'))
            .output(outputAudio)
            .on('end', () => {
                resolve(true)
            })
            .on('error', () => {
                reject(false)
            })
            .run()
    })
}