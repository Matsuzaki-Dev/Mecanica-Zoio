import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const key = req.header('x-api-key');
    const expected = process.env.ADMIN_API_KEY || '';
    if (!expected) throw new UnauthorizedException('API key not configured on server');
    if (!key || key !== expected) throw new UnauthorizedException('Invalid API key');
    return true;
  }
}
