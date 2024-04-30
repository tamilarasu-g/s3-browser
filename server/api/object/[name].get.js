import {listObjectsInBucket} from '../aws.js'

export default defineEventHandler(async (event) => {
  try {
    const bucketName = event.context.params.name
    const data = await listObjectsInBucket(bucketName);
    return data
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
})
