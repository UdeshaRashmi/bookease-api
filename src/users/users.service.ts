import { Injectable } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
    role: UserRole = UserRole.USER,
  ) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findUserWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
