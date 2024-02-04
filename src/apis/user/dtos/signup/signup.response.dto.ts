import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignUpResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export class UserSignUpResponseDto extends createZodDto(SignUpResponseSchema) {}
