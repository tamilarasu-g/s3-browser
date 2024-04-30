import { S3Client, ListBucketsCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
  },
});

export const listBuckets = async () => {
  try {
    const response = await s3Client.send(new ListBucketsCommand({}));
    return response.Buckets

  } catch (error) {
    console.error("Error listing buckets:", error);
  }
};

// Function to list objects in the bucket
export const listObjectsInBucket = async (bucketName) => {
  try {
    // Send the ListObjectsV2Command to list objects in the bucket
    const response = await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName, Delimiter: '/' })
    );
    // const folders = await response.CommonPrefixes.map(prefix => prefix.Prefix);
    const folders = [];

    // Iterate through the "CommonPrefixes" array in the response
    for (const commonPrefix of response.CommonPrefixes) {
      // Extract the folder path from the "Prefix" property
      const folderPath = commonPrefix.Prefix;

      // Check if the path ends with a trailing slash (indicating a folder)
      if (folderPath.endsWith('/')) {
        // Remove the trailing slash for cleaner display (optional)
        const trimmedPath = folderPath.slice(0, -1);
        const folder = {
          Name: trimmedPath,
        };
        folders.push(folder);
      }
    }
    return { data: { arrays: response.Contents, folders } }
  } catch (error) {
    // Handle errors
    console.error("Error listing objects:", error);
  }
};


export const listObjectsInPrefix = async (bucketName, prefix) => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    const response = await s3Client.send(new ListObjectsV2Command(params));
    const objects = [];
    const folders = [];
    // console.log(response);
    // Loop through the contents and separate objects and folders
    response.Contents.forEach(content => {
      if (content.Key.endsWith('/') && !(content.Key === (`${prefix}/`))) {
        // This is a folder
        const folderName = content.Key.replace((`${prefix}/`), '')
        if (/\/[a-zA-Z]+/.test(folderName) === false) {
          const formatfolder = {
            Name: folderName.replace('/', "")
          };
          folders.push(formatfolder);
        }
      } else if (!(content.Key === (`${prefix}/`))) {
        // This is an object

        const filtobject = content.Key.replace((`${prefix}/`), '');
        if (!filtobject.includes('/')) {
          const formatobject = {
            Name: filtobject,
            LastModified: content.LastModified.toLocaleString('en-IN', { hour12: false }),
            Size: (`${((content.Size) / 100000).toFixed(2)} MB`)
          };
          objects.push(formatobject);
        }
      }

    });
    // console.log('objects before sending are : ')
    // console.log(JSON.stringify(objects))
    return { data: { arrays: objects, folders } }
  } catch (error) {
    console.error("Error listing objects:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const createFolder = async (bucketName, prefix, folderName) => {
  const params = {
    Bucket: bucketName,
    Key: prefix + folderName, // Full path including prefix
    Body: "",
  };

  // Define the function to create the folder inside the prefix
  // console.log(params);
  try {
    // Call the putObject command to create the folder inside the prefix
    const data = await s3Client.send(new PutObjectCommand(params));
    return data
    // console.log("Folder created inside prefix successfully:", data);
  } catch (err) {
    console.error("Error creating folder inside prefix:", err);
  }
}