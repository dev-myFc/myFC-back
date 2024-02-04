import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export class SignInResponseDto extends createZodDto(SignInResponseSchema) {}
