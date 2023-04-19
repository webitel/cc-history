import { AuditFormServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/utils/openAPIConfig';
import formatResponse from './formatRegistryResponse';

// const defaultParams = {
//   page: 1,
//   size: 10,
//   search: '',
//   from: new Date().setHours(0, 0, 0),
//   to: new Date().setHours(23, 59, 59),
//   sort: '-created_at',
// };

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const fetchAudit = async ({
                            id,
                            active,
                            question,
                          }) => {
  try {
    const response = await auditService.searchAuditForm(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      active,
      question,

    );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const AuditAPIRepository = {
  async getAudit(argParams) {
    const params = {
      ...argParams,
    };
    return fetchAudit(params);
  },
};

export default AuditAPIRepository;
