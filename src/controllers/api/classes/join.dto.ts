import { IsString } from 'class-validator';

class JoinClassDto {
  @IsString()
  public humanReadable: string;
}

export default JoinClassDto;
