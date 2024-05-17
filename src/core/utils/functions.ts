import { injectable } from "inversify";


@injectable()
export class GeneralFunctions {
      public otpGen(length: number) {
          let otp = Math.floor(Math.random() * length * 10000)
          if(`${otp}`.length != 4) {
              return  this.otpGen(4)
          }

          return otp
      }
}