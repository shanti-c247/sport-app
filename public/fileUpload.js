import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from "uuid"; // To generate unique keys for files

export async function uploadEndpoint({ request }) {
  // Get form data from the request (assumes that `request` is the incoming request object)
  const formData = await request.formData();
  // Get the file from the form data
  const fileUpload = formData.get("fileUpload");
  
  // Ensure the file is an image before uploading (optional but recommended)
  if (!fileUpload || !fileUpload.type.startsWith("image/")) {
    return new Response("Please upload a valid image.", { status: 400 });
  }

  // Load the Netlify Blobs store called `UserUpload`
  const userUploadStore = getStore({ name: "UserUpload", consistency: "strong" });

  // Create a unique key for each file (you can customize this based on your needs)
  const fileKey = uuidv4();

  // Set the file in the store
  await userUploadStore.set(fileKey, fileUpload);

  // Return a response, including a link to the uploaded file if needed
  return new Response(`File uploaded successfully! File key: ${fileKey}`, {
    status: 200,
  });
}
