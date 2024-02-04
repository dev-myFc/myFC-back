import { Module, forwardRef } from '@nestjs/common';
import { UserServiceImpl } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [
    { provide: 'userService', useClass: UserServiceImpl },
    { provide: 'userRepository', useClass: UserRepositoryImpl },
    PrismaService,
  ],
  controllers: [UserController],
  exports: [
    { provide: 'userService', useClass: UserServiceImpl },
    { provide: 'userRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
