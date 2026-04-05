import { apiFetch } from "../../auth/api/apiFetch";
import API_URL from "../../../shared/api/api";

export const fetchLibrary = async () => {
  const response = await apiFetch(`${API_URL}/api/library`);
  return response;
};
