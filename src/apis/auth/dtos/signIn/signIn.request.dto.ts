import { Prisma } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string(),
});

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}

export const signInConverter = (
  data: SignInRequestDto,
): Prisma.UserFindUniqueArgs => {
  const { id } = data;
  return { where: { id } };
};
