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
import asyncWait from './functions/asyncWait'

/**
 * ? Stefan API - Video
 */
import concatenate from './video/concat'

/**
 * ? Stefan API - Audio
 */

/**
 * ? Stefan API - Subtitles
 */

const StefanAPI: IStefanAPI = {
    Video: {
        async concat(inputFiles: readonly string[], outputFile: string, transition: { name: string, duration: number }) {
            await concatenate(inputFiles, outputFile, transition)
        }
    },

    Audio: {
        getAudioInfo() {

        }
    },

    Subtitles: {
        getSubtitlesInfo() {

        }
    },
    Functions: {
        async asyncWait(ms: number) { await asyncWait(ms) }
    }
}

export default StefanAPI