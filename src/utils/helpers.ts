import { CalcPaginationType, PaginationData } from 'src/types/types';
import { Op } from 'sequelize';
import { FindDataRequestDto } from 'src/auth/dtos/request/find.data.request.dto';
// import { FindDataRequestDto } from '../users/dtos/request/find.data.request.dto';

export const calculate_query_params = (
  query: FindDataRequestDto,
  query_condition?: any,
) => {
  const search_by = query.searchBy ?? null;
  const search_param = query.searchParam ?? null;
  const condition = query_condition ? { ...query_condition } : {};
  if (search_param != null) {
    condition[search_by] = { [Op.like]: `%${search_param}` };
  }
  const query_page = query.page ? Number.parseInt(query.page) : 0;
  const query_size = query.size ? Number.parseInt(query.size) : 0;
  let limit_query: number, offset_query: number;
  if (query_page || query_size) {
    const { limit, offset } = calculate_pagination(query_page, query_size);
    limit_query = limit;
    offset_query = offset;
  } else {
    limit_query = 20;
    offset_query = 0;
  }
  return { limit_query, offset_query, query_page, condition };
};

export const calculate_pagination = (
  page: number,
  size: number,
): CalcPaginationType => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return {
    limit,
    offset,
  };
};

export const calculate_pagination_data = (
  data: any,
  page: number,
  limit: number,
): PaginationData<any> => {
  const { count: total_items, rows: data_response } = data;
  const current_page = page ? +page : 0;
  const total_pages = Math.ceil(total_items / limit);

  return {
    total_items,
    data_response,
    total_pages,
    current_page,
  };
};
