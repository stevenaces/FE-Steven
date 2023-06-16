async function retry(fn, retries = 3, delay = 1000) {
    try {
        const result = await fn();
        return result;
    } catch (error) {
        if (retries > 0) {
            console.log(`Error occurred: ${error.message}. Retrying...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return retry(fn, retries - 1, delay);
        } else {
            throw new Error(`Maximum retries reached: ${error.message}`);
        }
    }
}
