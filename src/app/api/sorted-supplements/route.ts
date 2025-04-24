export const GET = async () => {
    const res = await fetch(
        `${process.env.STRAPI_API_URL}/supplements?locale=en&sort=name:asc&fields[0]=name&fields[1]=slug`,
        {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN_READ_ONLY}`
            }
        }
    )

    const data = await res.json()
    return Response.json(data.data)
}
