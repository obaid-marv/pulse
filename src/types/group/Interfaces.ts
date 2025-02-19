export interface Group {
  id: number;
  name: string;
  createdBy: number;
  createdAt: string;
}

export interface AllGroupsResponse {
  success: boolean;
  groups: Group[];
}
