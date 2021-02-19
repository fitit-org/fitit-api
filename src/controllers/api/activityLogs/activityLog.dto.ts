import { IsMongoId, IsDateString, IsOptional } from 'class-validator';

class AddActivityDto {
  @IsMongoId()
  public activityType_id: string;

  @IsDateString()
  @IsOptional()
  public startDate?: string;

  @IsDateString()
  @IsOptional()
  public endDate?: string;
}

export default AddActivityDto;
