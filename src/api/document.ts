import axios from "@/axios";
import { DocumentModel, IDocument } from "../../server/document";

/**
 * 获取文档列表
 */
export const getDocumentList = () => {
  return axios.get("/document");
};

/**
 * 查询某个文档
 * @param id
 */
export const getDocument = (id: string) => {
  return axios.get(`/document/${id}`);
};

/**
 * 新增文档
 * @param name 文档名称
 * @param content 文档内容
 * @param cover 封面
 */
export const addDocument = ({ name, content, cover }: DocumentModel) => {
  return axios.post<IDocument>(`/document`, { name, content, cover });
};

/**
 * 更新文档
 * @param id 文档id
 * @param name 文档名称
 * @param content 文档内容
 */
export const updateDocument = ({ _id, name, content, cover }: IDocument) => {
  return axios.put(`/document/${_id}`, { name, content, cover });
};

/**
 * 删除某个文档
 * @param id
 */
export const delDocument = (id: string) => {
  return axios.delete(`/document/${id}`);
};
