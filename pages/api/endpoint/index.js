export default async function handler(req, res) {
    const response = await fetch(process.env.ENDPOINT_URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const data = await response.json()

    res.status(200).json(data)

}