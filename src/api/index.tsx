import axios from "axios";

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
      { refreshToken }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", newRefreshToken);
    return accessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    // 로그인 페이지로 리다이렉트 또는 다른 처리
    throw error;
  }
};

export const createApiInstance = () => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // 리프레시 실패 시 처리 (예: 로그아웃)
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
