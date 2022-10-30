export type Error = [
  {
    field: string;
    message: string;
  }
];

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
