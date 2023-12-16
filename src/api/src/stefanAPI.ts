/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 12.12.2023
 * @description Source File that will have the role to make the modules work together.
 * 
 * @project Stefan AI 4
 */

/**
 * Type File
 */
import { IStefanAPI } from '../out/stefanAPI'

/**
 * ? Stefan API - Functions
 */
import asyncWait from './functions/asyncWait.js'

/**
 * ? Stefan API - Video
 */
import concatenate from './video/concat.js'
import trimVideo from './video/trim.js'
import removeAudio from './video/removeAudio.js'
import addAudio from './video/addAudio.js'

/**
 * ? Stefan API - Audio
 */
import concat from './audio/concat.js'
import trim from './audio/trim.js'

/**
 * ? Stefan API - Subtitles
 */
import audioToSubtitles from './subtitle/subtitle.js'

const StefanAPI: IStefanAPI = {
    Video: {
        async concat(inputFiles: readonly string[], outputFile: string, transition: { name: string, duration: number }) {
            return await concatenate(inputFiles, outputFile, transition)
        },

        async trim(input: string, output: string, start: number, end: number) {
            return await trimVideo(input, output, start, end)
        },

        async removeAudio(input: string, output: string) {
            return await removeAudio(input, output)
        },

        async addAudio(input: string, audio: string, output: string) {
            return await addAudio(input, audio, output)
        }
    },

    Audio: {
        async concat(inputAudios: string[], outputAudio: string) {
            return await concat(inputAudios, outputAudio)
        },

        async trim(input: string, output: string, start: number, end: number) {
            return await trim(input, output, start, end)
        }
    },

    Subtitles: {
        async audioToSubtitles(inputAudio: string, transcriptPath: string, outputSubtitlesPath: string) {
            return await audioToSubtitles(inputAudio, transcriptPath, outputSubtitlesPath)
        },

        async SSMLParser(input: string) {
            return `<p><s>${input}</s></p>`
        }
    },

    Functions: {
        async asyncWait(ms: number) { await asyncWait(ms) }
    }
}

export default StefanAPI