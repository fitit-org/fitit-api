import {
  IsOptional,
  IsEmail,
  IsDate,
  IsNumber,
  IsBoolean,
} from 'class-validator';

class CreateUserDto {
  public name: string;
  public surname: string;
  public password: string;
  public classId: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsDate()
  public birthDate?: Date;

  @IsOptional()
  @IsBoolean()
  public isTeacher?: boolean;

  @IsOptional()
  @IsNumber()
  public height?: number;

  @IsOptional()
  @IsNumber()
  public weight?: number;
}

export default CreateUserDto;
