
//Constants
import { BAD_REQUEST, CREATED, NO_CONTENT, OK, commonMessages, templateMessages } from '@constants';
//Types
import type { IApiResponse } from '@customTypes';
import { Teamplate } from '@models';
import { paginationHandler } from '@utils';

/**
 * Handles template creation
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the created template or error information
 */
export const createTeamplate = async (htmlContent: string, cssContent: string): Promise<IApiResponse> => {

  const newTeamplate = new Teamplate({
    htmlContent,
    cssContent
  });
  const createdTeamplate = await newTeamplate.save();

  return {
    status: CREATED,
    success: true,
    message: templateMessages.TEAMPLATE_CREATE_SUCCESS,
    data: createdTeamplate,
  };
};

/**
 * Retrieves templates from the database.
 * If a templateId is provided, fetch that specific template; otherwise, fetch all templates.
 * @param {Request} req Express request object
 * @returns {Promise<IApiResponse>} Response containing the template(s) or error information
 */
export const getTeamplates = async (
  templateId: string,
  pageNumber: number,
  pageSize: number,
  search: string | any,
  sortBy: string | any, // -1 , 1,
  orderBy: string | any,
): Promise<IApiResponse> => {
  if (templateId) {
    const template = await Teamplate.findById(templateId);
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
  const templates = await Teamplate.aggregate([
    { $match: filter }, // Apply filter
    { $sort: sort }, // Apply sorting
    { $skip: offset }, // Apply offset for pagination
    { $limit: limit }, // Apply limit for pagination
    { $addFields: { id: '$_id' } }, // Add id field
  ]);
  // Fetch total count for pagination metadata
  const total = await Teamplate.countDocuments({ isDeleted: false });
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
export const deleteTeamplate = async (templateId: string): Promise<IApiResponse> => {
  const template = await Teamplate.findByIdAndDelete(templateId);
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
export const updateTeamplate = async (
  templateId: string,
  htmlContent: string,
  cssContent: string,

): Promise<IApiResponse> => {
  const template = await Teamplate.findById(templateId);
  if (!template)
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: null,
    };

  Object.assign(template, {
    htmlContent: htmlContent || template.htmlContent,
    cssContent: cssContent || template.cssContent,
  });
  const updatedTeamplate = await template.save();

  return {
    status: OK,
    success: true,
    message: templateMessages.TEAMPLATE_UPDATED_SUCCESS,
    data: updatedTeamplate,
  };
};

