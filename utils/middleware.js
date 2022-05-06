export async function postData() {
    try {
        const response = await fetch('/api/endpoint')
        const res = await response.json()
        return res
    } catch (error) {
        return error
    }

}