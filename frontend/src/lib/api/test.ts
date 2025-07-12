import { apiClient } from './client';

// API 응답 타입 정의
export interface HealthResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface DatabaseTestResponse {
  status: string;
  message: string;
  test_value: number;
  timestamp: string;
}

export interface VersionResponse {
  version: string;
  api_name: string;
  description: string;
  timestamp: string;
}

// 테스트 API 함수들
export const testApi = {
  // 헬스 체크
  healthCheck: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/api/v1/test/health');
    return response.data;
  },

  // 데이터베이스 연결 테스트
  databaseTest: async (): Promise<DatabaseTestResponse> => {
    const response = await apiClient.get<DatabaseTestResponse>('/api/v1/test/db-test');
    return response.data;
  },

  // 버전 정보 조회
  getVersion: async (): Promise<VersionResponse> => {
    const response = await apiClient.get<VersionResponse>('/api/v1/test/version');
    return response.data;
  },
};

export default testApi; 