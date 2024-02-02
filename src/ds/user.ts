import { Prisma, User } from "@prisma/client";
import MessageDefaultArgs = Prisma.MessageDefaultArgs;
import validator = Prisma.validator;
import UserGetPayload = Prisma.UserGetPayload;
import MessageGetPayload = Prisma.MessageGetPayload;
import TaskGetPayload = Prisma.TaskGetPayload;
import TaskDefaultArgs = Prisma.TaskDefaultArgs;

// ref: https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
export const clientUser = validator<MessageDefaultArgs>()({
  select: {
    user: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
    updatedAt: true,
    text: true,
  },
});

export type ClientUserSelector = {
  select: {
    id: true;
    name: true;
    image: true;
    type: true;
  };
};

export type ClientUser = UserGetPayload<ClientUserSelector>;

export type ClientMessage = MessageGetPayload<{
  select: {
    user: ClientUserSelector;
    updatedAt: true;
    text: true;
  };
}>;

export const clientTask = validator<TaskDefaultArgs>()({
  include: {},
});
