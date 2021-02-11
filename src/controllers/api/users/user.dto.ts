import {
  IsOptional,
  IsEmail,
  IsDate,
  IsNumber,
  IsBoolean,
  IsString,
  Matches,
  MinLength,
  Min,
  MaxDate,
} from 'class-validator';

const strongPassRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
);

class CreateUserDto {
  @MinLength(3)
  @IsString()
  public name: string;

  @MinLength(3)
  @IsString()
  public surname: string;

  @IsString()
  @MinLength(10)
  @Matches(strongPassRegex)
  public password: string;

  @IsString()
  public classId: string;

  @IsEmail()
  @IsString()
  public email: string;

  @IsOptional()
  @IsDate()
  @MaxDate(new Date())
  public birthDate?: Date;

  @IsOptional()
  @IsBoolean()
  public isTeacher?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  public height?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  public weight?: number;
}

export default CreateUserDto;
