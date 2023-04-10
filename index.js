const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const data = await fetchData();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching data", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

const fetchData = async () => {
  const params = {
    TableName: "morale",
  };

  const result = await dynamodb.scan(params).promise();
  return result.Items;
};
