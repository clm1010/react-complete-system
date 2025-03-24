/**
 * 问卷系统核心类型定义
 */

declare namespace Question {
  interface Data {
    id: string;
    title: string;
    gender: 'male' | 'female' | 'other';
    content: string;
    createdAt: string;
  }

  interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    code?: number;
  }

  interface CreatePayload {
    title: string;
    gender: Data['gender'];
    content: string;
  }
}