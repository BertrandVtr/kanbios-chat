// message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = new this.messageModel({
      ...createMessageDto,
    });
    return newMessage.save();
  }

  async getConversation(
    firstUserId: number,
    secondUserId: number,
    skip: number = 0,
  ): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { senderId: firstUserId, receiverId: secondUserId },
          { senderId: secondUserId, receiverId: firstUserId },
        ],
      })
      .sort({ createdAt: 'asc' })
      .skip(skip)
      .exec();
  }
}
