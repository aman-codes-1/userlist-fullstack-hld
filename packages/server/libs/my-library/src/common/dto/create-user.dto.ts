import {
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsInt,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required', groups: ['required'] })
  @IsString({ message: 'Invalid name', groups: ['type'] })
  name: string;

  @IsNotEmpty({ message: 'Interests are required', groups: ['required'] })
  @IsArray({ message: 'Interests must be an array', groups: ['type'] })
  @ArrayMinSize(1, {
    message: 'At least one interest must be provided',
    groups: ['other'],
  })
  @IsString({
    each: true,
    message: 'Each interest must be a string',
    groups: ['type'],
  })
  @IsNotEmpty({
    each: true,
    message: 'Each interest is required',
    groups: ['required'],
  })
  interests: string[];

  @IsNotEmpty({ message: 'Age is required', groups: ['required'] })
  @IsInt({ message: 'Age must be an integer', groups: ['type'] })
  @Min(1, { message: 'Age cannot be negative', groups: ['range'] })
  @Max(150, { message: 'Age cannot be greater than 150', groups: ['range'] })
  age: number;

  @IsNotEmpty({ message: 'Mobile is required', groups: ['required'] })
  @IsString({ message: 'Mobile number must be a string', groups: ['type'] })
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Mobile number must be 10 digits',
    groups: ['other'],
  })
  mobile: string;

  @IsNotEmpty({ message: 'Email is required', groups: ['required'] })
  @IsEmail({}, { message: 'Invalid email', groups: ['other'] })
  email: string;
}
