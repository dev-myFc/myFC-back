import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  UserSignUpRequestDto,
  createUserConverter,
  findUserByEmailConverter,
} from './dtos/signup/signup.request.dto';
import { UserRepository } from './user.repository';
import { passwordEncrypt } from 'src/utils/encrypt';
import { UserSignUpResponseDto } from './dtos/signup/signup.response.dto';
import { AuthService } from '../auth/auth.service';
import { UserSignInRequestDto } from './dtos/signIn/signIn.request.dto';
import { UserSignInResponseDto } from './dtos/signIn/signIn.response.dto';

export interface UserService {
  signUp: (request: UserSignUpRequestDto) => Promise<UserSignUpResponseDto>;
  signIn: (request: UserSignInRequestDto) => Promise<UserSignInResponseDto>;
  getUserInfo: () => Promise<any>;
}

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('authService') private readonly authService: AuthService,
  ) {}

  async signUp(request: UserSignUpRequestDto) {
    const { email, password } = request;
    const isExist = await this.userRepository.fineUserByEmail(
      findUserByEmailConverter({ email }),
    );
    if (isExist) {
      throw new HttpException('이미 존재하는 이메일입니다.', 405);
    }
    const encryptedPassword = await passwordEncrypt(password);
    const newUser = createUserConverter(request, encryptedPassword);
    const user = await this.userRepository.createUser(newUser);

    const tokens = this.authService.jwtSignIn(user);
    return tokens;
  }

  async signIn(request: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    console.log(request);
    return { accessToken: 'a', refreshToken: 'a' };
  }

  async getUserInfo() {}
}
