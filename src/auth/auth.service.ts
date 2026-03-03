// src/auth/auth.service.ts:
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) { }

    async login(username: string, password: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { username },
        });

        if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

        const ok = await bcrypt.compare(password, usuario.password);
        if (!ok) throw new UnauthorizedException('Credenciales inválidas');

        const payload = {
            sub: usuario.id_usuario,
            username: usuario.username,
            rol: usuario.rol,
        };

        return {
            access_token: await this.jwt.signAsync(payload),
        };
    }
}