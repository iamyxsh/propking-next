const fetchCall = async (endpoint, method, jwt, body) => {
	const data = await fetch(
		`https://propking-yxsh.herokuapp.com/api/${endpoint}`,
		{
			method: `${method}`,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: jwt ? `Bearer ${jwt}` : "Bearer",
			},
			body: body ? JSON.stringify(body) : null,
		}
	).then((response) => response.json())

	return data
}

export default fetchCall
