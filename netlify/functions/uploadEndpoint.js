import { getStore } from "@netlify/blobs";
import formidable from "formidable";

export async function handler(event) {
    console.log(event);

    // Ensure the method is POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    // Check if the body is Base64 encoded
    let body = event.body;
    if (event.isBase64Encoded) {
        body = Buffer.from(body, 'base64').toString();
    }
    // console.log(body);

    // // Parse the form data using formidable
    // const data = await new Promise((resolve, reject) => {
    //     const form = new formidable.IncomingForm();

    //     form.parse({ ...event, body }, (err, fields, files) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve({ fields, files });
    //     });
    // });

    // Extract file data
    // const fileUpload = data.files.fileUpload[0]; // Assuming 'fileUpload' is the name of the input field

    // if (!fileUpload) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify({ message: "File is missing" }),
    //     };
    // }

    // Set file in Netlify Blobs
    const userUploadStore = getStore({
        name: "UserUpload",
        consistency: "strong", siteID: `sparkly-peony-393e93`,
        token: `nfp_5GmGtRGnEHCZYUHA76QhgfM88DRifzQca92a`,
    });
    const uniqueKey = `image_${Date.now()}_`;

    try {
        await userUploadStore.set(uniqueKey, '/diwali-wishes-lines.jpg');
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "File uploaded successfully!" }),
    };
}
