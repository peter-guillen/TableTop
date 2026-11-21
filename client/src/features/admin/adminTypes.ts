export interface ActivityLogEntry {
  _id: string;
  action: string;
  target: string;
  // Populated by the server; null if the user has since been deleted
  userId: { _id: string; username: string } | null;
  createdAt: string;
}
