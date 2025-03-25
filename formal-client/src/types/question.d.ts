/**
 * 问卷系统核心类型定义
 */

export interface Survey {
  id: number;
  title: string;
  content: string;
  gender: 'male' | 'female';
  createdAt: string;
}

// API响应类型
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }
