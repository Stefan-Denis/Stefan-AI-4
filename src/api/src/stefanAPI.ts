import { IStefanAPI } from '../out/stefanAPI'

/**
 * ? Stefan API - Functions
 */
import asyncWait from './functions/asyncWait'

/**
 * ? Stefan API - Video
 */

/**
 * ? Stefan API - Audio
 */

/**
 * ? Stefan API - Subtitles
 */

const StefanAPI: IStefanAPI = {
    Video: {
        getVideoInfo() {

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