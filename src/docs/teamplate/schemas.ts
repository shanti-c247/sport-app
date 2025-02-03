import { templateHandler } from '@utils';

const templateSchemas = {
  // Teamplate Creation
  CreateTeamplateRequest: {
    type: 'object',
    required: ['htmlContent', 'cssContent'],
    properties: templateHandler.templateRandomData('createTeamplateRequest'),
  },
  // Teamplate Update
  UpdateTeamplateRequest: {
    type: 'object',
    properties: templateHandler.templateRandomData('updateTeamplateRequest'),
  },
};
export default templateSchemas;
