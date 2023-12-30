/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to concatenate videos together.
 *
 * @project Stefan AI 4
 */
/**
 * Imports
 */
import concat from 'ffmpeg-concat';
export default async function concatenate(input, output, transition) {
    return new Promise(async (resolve, reject) => {
        try {
            await concat({
                videos: input,
                output: output,
                transition: transition
            });
            resolve(true);
        }
        catch {
            reject(false);
        }
    });
}
