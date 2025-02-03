/**
 * @swagger
 * /template:
 *  post:
 *    summary: Create a new template
 *    description: Allows admin to create a new template
 *    tags: [Teamplates]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTeamplateRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/TeamplateCreated'
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
 * /template/{templateId}:
 *  get:
 *    summary: Get a specific template by ID
 *    description: Fetch all template if no ID is provided, otherwise fetch a specific template
 *    tags: [Teamplates]
 *    parameters:
 *      - in: path
 *        name: templateId
 *        required: true
 *        schema:
 *          type: string
 *        description: Required template ID to fetch a specific template
 *    responses:
 *      200:
 *        $ref: '#/components/responses/TeamplateResponse'
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
 * /template:
 *  get:
 *    summary: Get all template
 *    description: Fetch a list of template with pagination using `page` and `limit` query parameters, along with optional search and sort parameters.
 *    tags: [Teamplates]
 *    security:
 *      - bearerAuth: []
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
 *        name: search
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
