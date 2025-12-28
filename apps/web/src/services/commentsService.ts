import api from "@/lib/api";
import type { CreateCommentSchemaType } from "@/schema/CreateCommentSchema";

export const saveComment = async (
  taskId: string,
  data: CreateCommentSchemaType
) => {
  try {
    const response = await api.post(`/tasks/${taskId}/comments`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
