import { Prisma } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export class UserSignInRequestDto extends createZodDto(SignInRequestSchema) {}

export const findUserByEmailConverter = ({
  email,
}: Pick<UserSignInRequestDto, 'email'>): Prisma.UserFindFirstArgs => {
  return {
    where: { email },
  };
};
