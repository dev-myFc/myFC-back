import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserSignUpResponseDto } from './dtos/signup/signup.response.dto';
import { UserService } from './user.service';
import { UserSignUpRequestDto } from './dtos/signup/signup.request.dto';
import { UserSignInRequestDto } from './dtos/signIn/signIn.request.dto';
import { UserSignInResponseDto } from './dtos/signIn/signIn.response.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

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

  @Get('sign-in')
  @ApiOkResponse()
  async userSignIn(
    @Body() body: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    return await this.userService.signIn(body);
  }

  @Get('user-info')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async getUserInfo(): Promise<any> {
    return await this.userService.getUserInfo();
  }
}
