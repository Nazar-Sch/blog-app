export type Tags = {
  label: string;
  _id: string;
  posts: string[];
};

export interface TagsState {
  tags: Tags[];
  isLoading: boolean;
  error: string;
}
