
//Constants
import { BAD_REQUEST, CREATED, NO_CONTENT, OK, commonMessages, templateMessages } from '@constants';
//Types
import type { IApiResponse, IBio, IEvent, IImage } from '@customTypes';
import { TemplateB } from '@models';
import { paginationHandler } from '@utils';

/**
 * Handles template creation
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the created template or error information
 */
export const createTemplateB = async (slider: IImage[],
  bio: IBio,
  event: IEvent): Promise<IApiResponse> => {

  const newTemplateB = new TemplateB({
    slider,
    bio,
    event,
  });
  const createdTemplateB = await newTemplateB.save();

  return {
    status: CREATED,
    success: true,
    message: templateMessages.TEAMPLATE_CREATE_SUCCESS,
    data: createdTemplateB,
  };
};

/**
 * Retrieves templates from the database.
 * If a templateId is provided, fetch that specific template; otherwise, fetch all templates.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the template(s) or error information
 */
export const getTemplateBs = async (
  templateId: string,
  pageNumber: number,
  pageSize: number,
  search: string | any,
  sortBy: string | any, // -1 , 1,
  orderBy: string | any,
): Promise<IApiResponse> => {
  if (templateId) {
    const template = await TemplateB.findById(templateId);
    return {
      status: template ? OK : BAD_REQUEST,
      success: Boolean(template),
      message: template ? templateMessages.TEAMPLATE_FETCH_SUCCESS : commonMessages.USER_NOT_FOUND,
      data: template || null,
    };
  }
  // get pagination for manage pagination records
  const { limit, offset } = paginationHandler.getPagination(pageNumber, pageSize);
  /**
   * Manage sorting and pagination
   */
  // /sort_by = createdAt
  // order = asc || desc
  let sort: Record<string, any> = { createdAt: -1 };
  const order = orderBy ? orderBy : 'createdAt';
  if (sortBy || order) {
    orderBy = orderBy === 'asc' ? 1 : -1;
    sort = { [sortBy]: orderBy };
  }
  const filter: Record<string, any> = {
    isDeleted: false
  };
  if (search) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    filter['cssContent'] = { $regex: search, $options: 'i' };
  }
  const templates = await TemplateB.aggregate([
    { $match: filter }, // Apply filter
    { $sort: sort }, // Apply sorting
    { $skip: offset }, // Apply offset for pagination
    { $limit: limit }, // Apply limit for pagination
    { $addFields: { id: '$_id' } }, // Add id field
  ]);
  // Fetch total count for pagination metadata
  const total = await TemplateB.countDocuments({ isDeleted: false });
  return {
    status: OK,
    success: true,
    message: templateMessages.TEAMPLATE_FETCH_SUCCESS,
    data: { total: total, templates: templates },
  };
};

/**
 * Deletes a template from the database based on the provided template ID.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the deletion result or error information
 */
export const deleteTemplateB = async (templateId: string): Promise<IApiResponse> => {
  const template = await TemplateB.findByIdAndDelete(templateId);
  return {
    status: template ? NO_CONTENT : BAD_REQUEST,
    success: !!template,
    message: template ? templateMessages.TEAMPLATE_DELETE_SUCCESS : commonMessages.USER_NOT_FOUND,
    data: null,
  };
};

/**
 * Service to update a template's information (name, email, role, status only)
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the updated template or error information
 */
export const updateTemplateB = async (
  templateId: string,
  slider: IImage[],
  bio: IBio,
  event: IEvent
): Promise<IApiResponse> => {
  const template = await TemplateB.findById(templateId);
  if (!template)
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: null,
    };


  Object.assign(template, {
    slider: slider || template.slider,
    bio: bio || template.bio,
    event: event || template.event,
  });
  const updatedTemplateB = await template.save();

  return {
    status: OK,
    success: true,
    message: templateMessages.TEAMPLATE_UPDATED_SUCCESS,
    data: updatedTemplateB,
  };
};

