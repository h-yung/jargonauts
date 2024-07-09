import { MONGO_APIKEY, DB_URL, DATASOURCE } from "../../localenvs";

export const handler = async (
	event //, context
) => {
	const { itemId, collection } = event.queryStringParameters;

	const url = `${DB_URL ?? process.env.MONGO_DB_URL}/deleteOne`;
	const key = MONGO_APIKEY ?? process.env.MONGO_APIKEY;
	const database = "trip-organizer";

	const dataSource = DATASOURCE ?? process.env.MONGO_DATASOURCE;
	const filter = { _id: { $oid: itemId } }; //ObjectId(inputid) was quietly deprecated

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
			filter,
			// "projection": {
			//     "_id": 1,
			//     "displayName": 1
			// }
		}),
	};

	try {
		const response = await fetch(url, config);
		const res = await response.json(); //deletedCount
		console.log(res);
		return { statusCode: 200, body: JSON.stringify(res) };
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error }),
		};
	}
};
