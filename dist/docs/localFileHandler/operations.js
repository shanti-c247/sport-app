"use strict";
/**
 * @swagger
 * /local-files:
 *  post:
 *    summary: Upload a file
 *    description: Allows a user to upload a file on local server.
 *    tags: [Local Files Handling]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/LocalUploadFileRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/FileUploaded'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /local-files/{fileId}:
 *  put:
 *    summary: Update a uploaded file
 *    description: Allows user to update user information
 *    tags: [Local Files Handling]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: fileId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/LocalUploadFileRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/FileUploaded'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /local-files/{fileId}:
 *  get:
 *    summary: Get a specific file by ID
 *    description: Retrieve a specific file by its ID from local server.
 *    tags: [Local Files Handling]
 *    parameters:
 *      - in: path
 *        name: fileId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the file to fetch
 *    responses:
 *      200:
 *        $ref: '#/components/responses/FileFetched'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /local-files/{fileId}:
 *   delete:
 *     summary: Delete uploaded file with file id
 *     tags: [Local Files Handling]
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Required params parameter to delete file
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /local-files:
 *  get:
 *    summary: Get all files
 *    description: Fetch a list of files with pagination using `page` and `limit` query parameters, along with optional search and sort parameters.
 *    tags: [Local Files Handling]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sortBy
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: orderBy
 *        required: false
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        $ref: '#/components/responses/FileFetched'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/Conflict'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
//# sourceMappingURL=operations.js.map