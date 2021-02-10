import { IsEmail } from 'class-validator';

class LogInDto {
  @IsEmail()
  public email: string;

  public password: string;
}

export default LogInDto;
