import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/apis/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtAccessToken') {
  constructor(
    @Inject('authService') private readonly authService: AuthService,
    @Inject('userService') private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // 일단은 무한하게 해둠
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    // 우선 검증 없이 고고
    console.log(payload);
    return payload;
    // const user = this.userRepository.fineUserById(payload.id);
    // if (user) {
    //   return user; // request.user
    // } else {
    //   throw new HttpException('인증되지 않은 사용자의 요청입니다..', 405);
    // }
  }
}
