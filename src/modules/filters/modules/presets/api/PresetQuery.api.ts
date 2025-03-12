import {EngineCreatePresetQueryRequest, EnginePresetQuery, PresetQueryServiceApiFactory} from 'webitel-sdk';
import {getDefaultGetListResponse, getDefaultGetParams} from '@webitel/ui-sdk/src/api/defaults/index';
import applyTransform, {
    camelToSnake,
    merge,
    notify,
    snakeToCamel,
    starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index';
import i18n from '../../../../../app/locale/i18n';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const service = PresetQueryServiceApiFactory(configuration, '', instance);

const skipIf = (transformer: (...payload: unknown[]) => unknown, ifFn: boolean | ((...payload: unknown[]) => boolean)) => (payload: unknown) => {
    if (typeof ifFn === 'function' ? ifFn() : ifFn) {
        return payload;
    }
    return transformer(payload);
};

type GetPresetListRequestConfig = {
    transformers: {
        useStarToSearch?: boolean,
    },
};

const getPresetList = async (params, config: GetPresetListRequestConfig) => {

    const useStarToSearch = config?.transformers?.useStarToSearch ?? true;

    const {
        page,
        size,
        search,
        sort,
        fields,
        presetNamespace,
        id,
    } = applyTransform(params, [
        merge(getDefaultGetParams()),
        (params) => useStarToSearch ? starToSearch('search')(params) : params,
    ]);

    try {
        const response = await service.searchPresetQuery(
            page,
            size,
            search,
            sort,
            fields || ['id', 'name', 'preset', 'description'],
            id,
        );
        const {items, next} = applyTransform(response.data, [
            snakeToCamel(),
            merge(getDefaultGetListResponse()),
        ]);
        return {
            items: applyTransform(items, [
                (items) => items.filter(({preset}) => preset.namespace === presetNamespace),
            ]),
            next,
        };
    } catch (err) {
        throw applyTransform(err, [
            notify,
        ]);
    }
};

const addPreset = async ({preset, namespace}: {
    preset: EngineCreatePresetQueryRequest,
    namespace: string
}): Promise<EnginePresetQuery> => {
    const item = applyTransform(preset, [
        camelToSnake(),
        (item) => {
            item.preset.namespace = namespace;
            return item;
        },
    ]);
    try {
        const response = await service.createPresetQuery(item);
        return applyTransform(response.data, [
            notify(({callback}) => {
                return callback({
                    type: 'success',
                    text: i18n.global.t('SSSSSSuccessfully created preset'),
                });
            }),
            snakeToCamel(),
        ]);
    } catch (err) {
        throw applyTransform(err, [
            skipIf(notify, (err) => err.status === 409),
        ]);
    }
};

const updatePreset = async ({item: itemInstance, id}) => {
    const item = applyTransform(itemInstance, [
        camelToSnake(),
    ]);
    try {
        const response = await service.updatePresetQuery(id, item);
        return applyTransform(response.data, [
            notify(({callback}) => {
                return callback({
                    type: 'success',
                    text: i18n.global.t('SSSSSSuccessfully updated preset'),
                });
            }),
            snakeToCamel(),
        ]);
    } catch (err) {
        throw applyTransform(err, [
            skipIf(notify, (err) => err.status === 409),
        ]);
    }
};

const deletePreset = async ({id}) => {
    try {
        const response = await service.deletePresetQuery(id);
        return applyTransform(response.data, [
            notify(({callback}) => {
                return callback({
                    type: 'success',
                    text: i18n.global.t('SSSSSSuccessfully deleted preset'),
                });
            }),
        ]);
    } catch (err) {
        throw applyTransform(err, [
            notify,
        ]);
    }
};

const PresetQueryAPI = {
    getList: getPresetList,
    add: addPreset,
    update: updatePreset,
    delete: deletePreset,
};

export {
    getPresetList,
    addPreset,
    updatePreset,
    deletePreset,
};

export default PresetQueryAPI;
