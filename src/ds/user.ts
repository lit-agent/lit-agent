import { Prisma } from "@prisma/client";
import MessageDefaultArgs = Prisma.MessageDefaultArgs;
import validator = Prisma.validator;
import UserGetPayload = Prisma.UserGetPayload;
import MessageGetPayload = Prisma.MessageGetPayload;

// ref: https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
export const clientUser = validator<MessageDefaultArgs>()({
  select: {
    sender: {
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
    sender: ClientUserSelector;
    updatedAt: true;
    text: true;
  };
}>;
