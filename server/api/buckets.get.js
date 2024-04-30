import {listBuckets}  from './aws.js'

export default defineEventHandler(async (event) => {
  try {
    const buckets = await listBuckets();
    return buckets
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
});