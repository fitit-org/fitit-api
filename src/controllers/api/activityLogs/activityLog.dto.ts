import { IsMongoId, IsDate, IsOptional } from 'class-validator';

class AddActivityDto {
  @IsMongoId()
  public activityType_id: string;

  @IsDate()
  @IsOptional()
  public startDate?: Date;

  @IsDate()
  @IsOptional()
  public endDate?: Date;
}

export default AddActivityDto;
