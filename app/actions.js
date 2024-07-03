'use server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
  });
const docClient = DynamoDBDocumentClient.from(client);

// takes finalWorkout and adds it to the DynamoDB table
export async function addEntry(entry) {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: entry   
    };
    try {
        await docClient.send(new PutCommand(params));
        console.log("PutItem succeeded:", JSON.stringify(params.Item, null, 2));
        return { message: "Item added successfully" };
    } catch (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        throw err;
    }
}

// function that takes a user name and returns the 5 most recent entries for that user
export async function getRecentEntries(userName) {
    const params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "#usr = :userValue",
        ExpressionAttributeNames: {
            "#usr": "user"
        },
        ExpressionAttributeValues: {
            ":userValue": userName
        },
        ScanIndexForward: false, // Returns items in descending order by the sort key
        Limit: 5  // Limits the returned items to the most recent 5 entries
    };

    console.log("Query parameters:", JSON.stringify(params, null, 2));

    try {
        const data = await docClient.send(new QueryCommand(params));
        // console.log("Query succeeded:", JSON.stringify(data, null, 2));
        return data.Items;  // Return the retrieved records directly
    } catch (err) {
        console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
        throw err;  // Throw the original error to get more details in the calling function
    }
}

export const getPreviousWorkout = async ({ username, routine}) => {
    let previousWorkout;
    async function recentsAsyncWrapper() {
      let recents = await getRecentEntries(username);
      if (recents) {
        for (let i = 0; i < recents.length; i++) {
          if (recents[i].data.muscleGroup == routine.muscleGroup) {
            previousWorkout = recents[i].data;
            break;
          } else { 
            previousWorkout = routine;
          }
        }
      }
    }
    await recentsAsyncWrapper();
    if (previousWorkout) { 
      return(previousWorkout);
    }
  }

  export async function addCalorieEntry(entry) {
    const params = {
        TableName: process.env.CAL_TABLE_NAME,
        Item: entry   
    };
    try {
        await docClient.send(new PutCommand(params));
        console.log("PutItem succeeded:", JSON.stringify(params.Item, null, 2));
        return { message: "Item added successfully" };
    } catch (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        throw err;
    }
}