import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
