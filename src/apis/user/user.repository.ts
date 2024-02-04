import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UserRepository {
  createUser: (user: Prisma.UserCreateInput) => Promise<User>;
  fineUserById: (id: Prisma.UserFindUniqueArgs) => Promise<User>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async fineUserById(id: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(id);
  }
}
