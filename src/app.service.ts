import { Controller, Get } from '@nestjs/common';
import { ApiStateController } from './app.controller';

@Controller('other')
export class OtherController {
  constructor(private readonly apiStateController: ApiStateController) {}

  @Get()
  someOtherMethod() {
    // Call the getSummation() method from ApiStateController
    // this.apiStateController.getSummation().subscribe(
    //   (result) => {
    //     console.log('Summation result:', result);
    //     // Do something with the result
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //     // Handle the error
    //   },
    // );
  }
}
