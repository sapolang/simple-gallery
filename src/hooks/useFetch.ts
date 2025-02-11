import { useState, useEffect } from "react";

// 定义 Fetch 的返回类型
interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string | null;
}

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/**
 * 自定义 Hook：useFetch
 * @param url - 请求的 URL
 * @param options - 请求选项（可选）
 * @returns {FetchResult<T>} 包含数据、错误和加载状态的对象
 */
export function useFetch<T>(url: string, options?: FetchOptions): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 定义异步函数来处理数据获取
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 发起请求
        const response = await fetch(url, options);

        // 检查响应状态
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        // 解析 JSON 数据
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred.'));
        }
      } finally {
        setLoading(false);
      }
    };

    // 调用 fetchData 函数
    fetchData();
  }, [url, options]);

  return { data, error, loading };
}