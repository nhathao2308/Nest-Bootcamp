import * as bcrypt from 'bcrypt';
// import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface ComparePasswordRequest {
  plainPassword: string;
  hashedPassword: string;
}

@Injectable()
export class PasswordUtil {
  private readonly pepper: string;

  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const pepper = this.configService.get('PASSWORD_PEPPER');
    if (typeof pepper !== 'string') {
      throw new Error(
        'PASSWORD_PEPPER environment variable is not set or invalid',
      );
    }
    this.pepper = pepper;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const passwordWithPepper = password + this.pepper;
    return await bcrypt.hash(passwordWithPepper, salt);
  }

  async comparePassword(req: ComparePasswordRequest): Promise<boolean> {
    const passwordWithPepper = req.plainPassword + this.pepper;
    return await bcrypt.compare(passwordWithPepper, req.hashedPassword);
  }
}
