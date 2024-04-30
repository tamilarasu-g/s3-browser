import { createFolder } from "./aws"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // const response = await createFolder()
  // console.log(body)
  const bucketName = body.bucketName
  const prefix = body.prefix
  const folderName = body.folderName
  const response = await createFolder(bucketName, prefix, folderName)
  return response
})
