import {
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsInt,
  Min,
  Max,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required', groups: ['required'] })
  @IsString({ message: 'Invalid name', groups: ['type'] })
  name: string;

  @IsNotEmpty({ message: 'Email is required', groups: ['required'] })
  @IsEmail({}, { message: 'Invalid email', groups: ['other'] })
  email: string;

  @IsNotEmpty({ message: 'Mobile is required', groups: ['required'] })
  @IsPhoneNumber(undefined, {
    message: 'Invalid phone number',
    groups: ['other'],
  })
  mobile: string;

  @IsNotEmpty({ message: 'Age is required', groups: ['required'] })
  @IsInt({ message: 'Age must be an integer', groups: ['type'] })
  @Min(1, { message: 'Age cannot be negative', groups: ['range'] })
  @Max(150, { message: 'Age cannot be greater than 150', groups: ['range'] })
  age: number;

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
}
