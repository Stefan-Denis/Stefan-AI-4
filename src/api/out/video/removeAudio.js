/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to remove the audio from a video.
 *
 * @project Stefan AI 4
 */
/**
 * Imports
 */
import ffmpeg from 'fluent-ffmpeg';
export default function removeAudio(input, output) {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .noAudio()
            .output(output)
            .videoCodec('copy')
            .on('end', () => {
            resolve(true);
        })
            .on('error', () => {
            reject(false);
        })
            .run();
    });
}
