import { Prisma } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignUpRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export class UserSignUpRequestDto extends createZodDto(SignUpRequestSchema) {}

export const findUserByEmailConverter = ({
  email,
}: Pick<UserSignUpRequestDto, 'email'>): Prisma.UserFindFirstArgs => {
  return {
    where: { email },
  };
};

export const createUserConverter = (
  rawData: UserSignUpRequestDto,
  password: string,
): Prisma.UserCreateArgs => {
  const { email, name } = rawData;
  return {
    data: {
      email,
      name,
      password,
    },
  };
};
