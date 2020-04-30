'use strict';

var AWS = require('aws-sdk');
 
module.exports.hello = async event => {

  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
 // var userId = event.pathParameters.user_id
  

 /* return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'HOLA ! Go Serverless v1.0! Your function executed successfully!'
      },
      null,
      2
    ),
  };*/

  var params = {
    TableName: 'serverless_workshop_table',
    Key: {
      'id': { S: "1234" }
    },
    ProjectionExpression: 'content'
  };

  return await new Promise((resolve, reject) => {
    ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {

        var parse = AWS.DynamoDB.Converter.output;
        var dataSimplificada = parse({ "M": data.Item}).content


        const response = {
          statusCode: 200,
          body: JSON.stringify(
            dataSimplificada,
            null,
            2
          )
        }
        resolve(response)
      }
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
