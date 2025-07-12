'use client';

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { testApi, HealthResponse, DatabaseTestResponse, VersionResponse } from "@/lib/api/test";
import { useState } from "react";

export default function Home() {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  // 헬스 체크 쿼리
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: testApi.healthCheck,
    enabled: activeTest === 'health',
  });

  // 데이터베이스 테스트 쿼리
  const dbTestQuery = useQuery({
    queryKey: ['db-test'],
    queryFn: testApi.databaseTest,
    enabled: activeTest === 'db-test',
  });

  // 버전 정보 쿼리
  const versionQuery = useQuery({
    queryKey: ['version'],
    queryFn: testApi.getVersion,
    enabled: activeTest === 'version',
  });

  const handleTest = (testType: string) => {
    setActiveTest(testType);
  };

  const renderResult = (
    query: UseQueryResult<HealthResponse | DatabaseTestResponse | VersionResponse, Error>, 
    testType: string
  ) => {
    if (!activeTest || activeTest !== testType) {
      return null;
    }

    if (query.isLoading) {
      return (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-700">로딩 중...</span>
          </div>
        </div>
      );
    }

    if (query.isError) {
      return (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">오류 발생</h4>
          <p className="text-red-700">{query.error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
        </div>
      );
    }

    if (query.data) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">성공</h4>
          <pre className="text-sm text-green-700 whitespace-pre-wrap">
            {JSON.stringify(query.data, null, 2)}
          </pre>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              RDBMS to Knowledge Graph
            </h1>
            <p className="text-gray-600">
              API 연결 테스트 및 시스템 상태 확인
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              API 테스트
            </h2>
            
            <div className="space-y-4">
              {/* 헬스 체크 테스트 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">헬스 체크</h3>
                  <button
                    onClick={() => handleTest('health')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    테스트
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  API 서버가 정상적으로 작동하는지 확인합니다.
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  GET /api/v1/test/health
                </code>
                {renderResult(healthQuery, 'health')}
              </div>

              {/* 데이터베이스 테스트 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">데이터베이스 연결 테스트</h3>
                  <button
                    onClick={() => handleTest('db-test')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    테스트
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  MySQL 데이터베이스 연결 상태를 확인합니다.
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  GET /api/v1/test/db-test
                </code>
                {renderResult(dbTestQuery, 'db-test')}
              </div>

              {/* 버전 정보 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">버전 정보</h3>
                  <button
                    onClick={() => handleTest('version')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    테스트
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  API 버전 및 시스템 정보를 조회합니다.
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  GET /api/v1/test/version
                </code>
                {renderResult(versionQuery, 'version')}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              백엔드 서버가 실행 중인지 확인하세요: <code>http://localhost:8000</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}