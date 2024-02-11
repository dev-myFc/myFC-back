import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export class UserSignInResponseDto extends createZodDto(SignInResponseSchema) {}
