/**
 * @swagger
 * /events:
 *  post:
 *    summary: Create a new event
 *    description: Allows admin to create a new event
 *    tags: [TemplateB]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateEventRequest'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/EventCreated'
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
 * /events/{eventId}:
 *  get:
 *    summary: Get a specific event by ID
 *    description: Fetch all events if no ID is provided, otherwise fetch a specific event
 *    tags: [TemplateB]
 *    parameters:
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          type: string
 *        description: Required event ID to fetch a specific event
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EventResponse'
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
 * /events/{eventId}:
 *  put:
 *    summary: Update a event's details
 *    description: Allows admin to update event information
 *    tags: [TemplateB]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateEventRequest'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EventUpdated'
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
 * /events/{eventId}:
 *  delete:
 *    summary: Delete a event
 *    description: Allows admin to delete a event by their ID
 *    tags: [TemplateB]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the event to be deleted
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EventDeleted'
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
 * /events:
 *  get:
 *    summary: Get all events
 *    description: Fetch a list of events with pagination using `page` and `limit` query parameters, along with optional search and sort parameters.
 *    tags: [TemplateB]
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
