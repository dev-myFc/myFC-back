import { Module, forwardRef } from '@nestjs/common';
import { AuthServiceImpl } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepositoryImpl } from '../user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserServiceImpl } from '../user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [
    { provide: 'authService', useClass: AuthServiceImpl },
    { provide: 'userService', useClass: UserServiceImpl },
    { provide: 'userRepository', useClass: UserRepositoryImpl },
    PrismaService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [{ provide: 'authService', useClass: AuthServiceImpl }, JwtModule],
})
export class AuthModule {}
