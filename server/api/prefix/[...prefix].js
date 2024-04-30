import { listObjectsInBucket, listObjectsInPrefix } from '../aws.js'

export default defineEventHandler(async (event) => {
  try {
    // console.log(event.context.params);
    // const bucketName = event.context.params.name
    const fulldata = event.context.params.prefix
    const parts = fulldata.split('/');
    const bucketName = parts[0];
    const prefix = parts.slice(1).join('/'); // Join remaining parts with '/'
    // console.log(`bucketname is ${bucketName} and prefix is ${prefix}`)
    const data = await listObjectsInPrefix(bucketName, prefix);
    // console.log(data)
    return data
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
})
