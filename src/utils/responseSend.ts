import { Response } from "express";

interface ApiResponse<T> {
    status: string,
    message: string,
    data?: T,
    error?: string | null
}

export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    error?: string | null
  ): Response<ApiResponse<T>> => {
    const response: ApiResponse<T> = {
      status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
      message,
      data,
      error: error || null,
    };

    return res.status(statusCode).json(response);
};

export const success = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 200, 'success', data, null)
}
export const created = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 201, 'success', data, null)
}
export const general_error = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 500, 'error', data, 'General Error')
}
export const not_found = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 404, 'error', data, 'Not Found')
}
export const wrong_credentials = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 401, 'error', data, 'Wrong Credentials')
}
export const conflict_data = <T>(res: Response, data?: T) : Response<ApiResponse<T>> => {
    return sendResponse(res, 409, 'error', data, 'Email already exists')
}