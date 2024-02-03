import { Prisma } from "@prisma/client";
import UserGetPayload = Prisma.UserGetPayload;
import MessageGetPayload = Prisma.MessageGetPayload;
import validator = Prisma.validator;
import MessageDefaultArgs = Prisma.MessageDefaultArgs;

export type ClientUserSelector = {
  select: {
    id: true;
    name: true;
    image: true;
    type: true;
  };
};

export type ClientUser = UserGetPayload<ClientUserSelector>;

export const sendTaskMessageSlice = validator<MessageDefaultArgs>()({
  include: {
    fromUser: true,
    task: true,
  },
});

export type ClientMessage = MessageGetPayload<typeof sendTaskMessageSlice>;
