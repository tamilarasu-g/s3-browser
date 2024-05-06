import { getobject } from "./aws";

export default defineEventHandler(async (event) => {
  console.log(event.context);
  const body = await readBody(event)
  const bucketName = body.bucketName
  const prefix = body.prefix
  const objectName = body.objectName
  const response = await getobject(bucketName, prefix, objectName)
  console.log(response.Body);
  return response;
});
