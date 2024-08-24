import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserService } from 'src/users/services/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config_service: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'config.auth.secret',
    });
  }

  validate(payload): Promise<any> {
    // console.log(payload);

    return this.authService.find({ id: payload.id });
  }
}
