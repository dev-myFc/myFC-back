import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserSignUpResponseDto } from './dtos/signup/signup.response.dto';
import { UserService } from './user.service';
import { UserSignUpRequestDto } from './dtos/signup/signup.requrest.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('userService')
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async userSignUp(
    @Body() body: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return await this.userService.signUp(body);
  }
}
