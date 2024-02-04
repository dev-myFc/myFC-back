import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UserRepository {
  createUser: (user: Prisma.UserCreateArgs) => Promise<User>;
  fineUserById: (id: Prisma.UserFindUniqueArgs) => Promise<User>;
  fineUserByEmail: (email: Prisma.UserFindFirstArgs) => Promise<User>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(data);
  }

  async fineUserById(id: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(id);
  }

  async fineUserByEmail(email: Prisma.UserFindFirstArgs) {
    return await this.prisma.user.findFirst(email);
  }
}
