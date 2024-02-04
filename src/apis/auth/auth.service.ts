import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignInRequestDto } from './dtos/signIn.request.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('userRepository')
    private userRepository: UserRepository,
  ) {}

  async jwtSignIn(data: SignInRequestDto) {
    const { id, password } = data;
    const user = await this.userRepository.fineUserById(id);
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
    const payload = { id: id, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
