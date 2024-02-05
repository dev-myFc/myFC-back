import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  SignInRequestDto,
  signInConverter,
} from './dtos/signIn/signIn.request.dto';
import { UserRepository } from '../user/user.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInResponseDto } from './dtos/signIn/signIn.response.dto';

export interface AuthService {
  jwtSignIn: (request: SignInRequestDto) => Promise<SignInResponseDto>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject('userRepository') private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtSignIn(request: SignInRequestDto) {
    const data = signInConverter(request);
    const { password, id } = request;

    const user = await this.userRepository.fineUserById(data);
    if (!user) {
      throw new HttpException('이메일과 비밀번호를 확인해주세요.', 405);
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new HttpException('이메일과 비밀번호를 확인해주세요.', 405);
    }
    const payload = { id, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(
        { id: payload.id },
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    };
  }
}
