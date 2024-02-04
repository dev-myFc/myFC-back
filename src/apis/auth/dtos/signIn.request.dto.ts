import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}
