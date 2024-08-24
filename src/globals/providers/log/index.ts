import { Injectable } from '@nestjs/common';
// import * as chalk from 'chalk';

@Injectable()
export class Logger {
  static logg(opts, ...otherArgs) {
    const bgHex = {
      info: '#007bff',
      danger: '#dc3545',
      success: '#098426',
      redisY: '#FF8800',
      redisN: '#DEADED',
      googleDataY: '#000080',
      googleDataN: '#CD5C5C',
      mongo: '#1c6878',
      response: '#569c2d',
    };

    // if (process.env.LOGGING) {
    //   console.info(
    //     chalk
    //       .hex('#ffffff')
    //       .bgHex(bgHex[opts.type] || 'info')
    //       .bold.apply(null, [
    //         `\n ${opts.message || opts} `,
    //         opts.err,
    //         ...otherArgs,
    //       ]),
    //   );
    // }
  }
}
