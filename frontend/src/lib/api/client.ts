import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청 전 로깅
    console.log(`API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 성공 로깅
    console.log(`API 응답: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    // 에러 처리
    console.error('API 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient; 