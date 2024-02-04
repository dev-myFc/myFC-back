import { Module, forwardRef } from '@nestjs/common';
import { AuthServiceImpl } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepositoryImpl } from '../user/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: await configService.get('JWT_REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: await configService.get(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  providers: [
    { provide: 'authService', useClass: AuthServiceImpl },
    { provide: 'userRepository', useClass: UserRepositoryImpl },
    JwtStrategy,
  ],
  exports: [AuthModule],
})
export class AuthModule {}
