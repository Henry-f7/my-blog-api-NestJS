import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'jhon.doe@example.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jame.smith@example.com',
    },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    const newUser = { ...user, id: (this.users.length + 1).toString() };

    this.users.push(newUser);
    return { message: 'User created successfully', user };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return { message: 'User updated successfully', user: this.users[userIndex] };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return { message: 'User deleted successfully' };
  }
}
