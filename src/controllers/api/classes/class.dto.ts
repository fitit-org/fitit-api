import { IsString } from 'class-validator';

class CreateClassDTO {
  @IsString()
  public name: string;
}

export default CreateClassDTO;
