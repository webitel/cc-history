import { AuditFormServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const _getScorecardsLookup = (getList) => function ({
                                                page,
                                                size,
                                                search,
                                                sort,
                                                fields,
                                                enabled,
                                              }) {
  const params = [
    page,
    size,
    search,
    sort,
    fields,
    undefined,
    undefined,
    enabled,
  ];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm)
  .setGetListMethod(_getScorecardsLookup);

const getAuditLookup = (params) => listGetter.getList(params);

const AuditAPIRepository = {
  getLookup: getAuditLookup,
};

export default AuditAPIRepository;
