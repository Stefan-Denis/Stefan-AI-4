/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 18.12.2023
 * @description Source File that contains the function to add audio on top of a video.
 *
 * @project Stefan AI 4
 */
/**
 * Imports
 */
import ffmpeg from 'fluent-ffmpeg';
export default function addAudio(input, audio, output) {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .input(audio)
            .outputOptions([
            '-c:v copy',
            '-c:a aac',
            '-strict experimental',
            '-map 0:v:0',
            '-map 1:a:0'
        ])
            .save(output)
            .on('end', () => {
            resolve(true);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
}
