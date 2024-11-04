export type Message = {
  _id: string;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: Date;
}