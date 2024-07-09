import { MONGO_APIKEY, DB_URL, DATASOURCE } from "../../localenvs";

export const handler = async (
	event //, context
) => {
	const { itemId, collection } = event.queryStringParameters;

	// console.log(itemId);

	const document = JSON.parse(event.body); //body comes stringified. from UI, document can contain only fields that were updated. So far there are no embedded fields either.
	const url = `${DB_URL ?? process.env.MONGO_DB_URL}/updateOne`;
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
			upsert: false,
			update: {
				$set: document,
				//To specify a <field> in an embedded document or in an array, use dot notation.
			},
		}),
	};

	try {
		const response = await fetch(url, config);
		const res = await response.json(); //matchedCount, ModifyCount
		return { statusCode: 200, body: JSON.stringify(res) };
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error }),
		};
	}
};
