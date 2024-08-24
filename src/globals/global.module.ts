import { Global, Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { CryptoEncrypt } from './providers/encrypt';
import { Encode } from './providers/encode';
import { JwtStrategy } from './strategy';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'toBeModified',
      signOptions: { expiresIn: '60m' },
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [CryptoEncrypt, Encode, JwtStrategy],
  exports: [CryptoEncrypt, Encode, JwtStrategy],
})
export class GlobalModule {}
