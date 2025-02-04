import { getStore } from "@netlify/blobs";

export async function handler(event) {
    // Get form data from the request (as per the previous logic)
    const formData = await event.request.formData();
    const fileUpload = formData.get("fileUpload");

    if (!fileUpload) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "File is missing" }),
        };
    }

    // Set file in the Netlify Blob store
    const userUploadStore = getStore({ name: "UserUpload", consistency: "strong" });
    const uniqueKey = `image_${Date.now()}_${fileUpload.name}`;

    await userUploadStore.set(uniqueKey, fileUpload);

    // Return a response (e.g., redirect, confirmation message, etc.)
    return {
        statusCode: 302,
        headers: {
            Location: "/thank-you",
        },
        body: JSON.stringify({ message: "File uploaded successfully!" }),
    };
}
