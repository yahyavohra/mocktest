export default async function handler(req, res) {
    try {
        const response = await fetch(process.env.ENDPOINT_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const data = await response.json()

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error)
    }

}

