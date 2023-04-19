import { AuditFormServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm);

const getAuditLookup = (params) => listGetter.getLookup(params);

const AuditAPIRepository = {
  getLookup: getAuditLookup,
};

export default AuditAPIRepository;
