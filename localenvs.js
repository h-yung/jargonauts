// prepare this and ensure gitignore has: */localenvs.js

//force the cluster awake using the project_jargonauts-Copy code that has the node server code. npm start - that's it; that connects to the server. Sadly the endpoints have other problems in that code base so we'll ignore/move on from them with serverless here.

//update the env vars here. You will need to import them locally and then add them to the deployment env on Netlify

export const MONGO_APIKEY =
	"y1LYw9c8UpggKWtEwTQ07YGfaAyX23Wo0RXh5SzIdzKxjM3UWtzxwyfOAheLBS5p";

export const DB_URL =
	"https://us-east-1.aws.data.mongodb-api.com/app/data-fnsysiv/endpoint/data/v1/action";

export const DATASOURCE = "Cluster0";

/**** 
 * 
fetchBtn.addEventListener('click', async () => {

          const reqBody = {
            document: {
              category: "test",
              date: new Date(),
              currency: "USD",
              desc: "Updated Hot Pocket",
              details: "It was a steal",
              value: 0.3,
              submittedBy: "helen_yung",
              trip: "destiny_alaska_2024",
            }};

          const config = {
            method: 'POST', 
            body: JSON.stringify(reqBody)
          };
          const response =  await fetch(
            '/.netlify/functions/deleteExpense?itemId=6687f3926f47b5c34f36fc37', 
            // '/.netlify/functions/getAllExpenses?trip=destiny_alaska_2024', 
          
            // config
          );
            const content = await response.json();
            // responseText.innerText = content?.documents[0].avatarRef;
            responseText.innerText = JSON.stringify(content);

        })
 */
