import { MONGO_APIKEY, DB_URL, DATASOURCE } from "../../localenvs";

export const handler = async (
	event //, context
) => {
	const {
		// itemId,
		collection, //trip_activities, trip_expenses, trip_users, trip_reviews
	} = event.queryStringParameters;

	const { document } = JSON.parse(event.body); //body comes stringified
	const url = `${DB_URL ?? process.env.MONGO_DB_URL}/insertOne`;
	const key = MONGO_APIKEY ?? process.env.MONGO_APIKEY;
	const database = "trip-organizer";
	const dataSource = DATASOURCE ?? process.env.MONGO_DATASOURCE;

	const config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			"Access-Control-Request-Headers": "*",
			"api-key": key,
		},
		body: JSON.stringify({
			collection,
			database,
			dataSource,
			document,
		}),
	};

	try {
		const response = await fetch(url, config);
		const res = await response.json();
		return { statusCode: 200, body: JSON.stringify(res) };
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error }),
		};
	}
};
