export default async function asyncWait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
