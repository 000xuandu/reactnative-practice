import {axiosClient} from '~apis';
import {ListResponse} from '~models';
import {ParamsAPIs} from '~models/common';
import {Todo} from '~models/user';

export const todoAPIs = {
  getAll(params?: ParamsAPIs): Promise<ListResponse<Todo>> {
    const endpoint = '/todos';
    return axiosClient.get(endpoint, {params});
  },
};
