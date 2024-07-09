import { MONGO_APIKEY, DB_URL, DATASOURCE } from "../../localenvs";

export const handler = async () =>
	// event //, context
	{
		// const {  } = event.queryStringParameters;
		const url = `${DB_URL ?? process.env.MONGO_DB_URL}/find`;
		const key = MONGO_APIKEY ?? process.env.MONGO_APIKEY;
		const database = "jargonauts";
		const collection = "jargonTerms";
		const dataSource = DATASOURCE ?? process.env.MONGO_DATASOURCE;
		const filter = { category: "tips" };

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
			const data = await response.json();

			/***
			 "documents": [
				{
					"_id": "62a15a00238da7aac58601eb",
					"passcode": "112",
					"category": "tips",
					"tip": "Replace the word \"use\" in your vocabulary with \"leverage\". Conjugate accordingly."
				},
				...]
			 * 
			 */

			//return just one
			const index = Math.floor(Math.random() * data.documents.length);

			return {
				statusCode: 200,
				body: JSON.stringify(data.documents[index]),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error }),
			};
		}
	};
