export async function postData() {
    const response = await fetch('/api/endpoint')
    const res = await response.json()
    return res
}