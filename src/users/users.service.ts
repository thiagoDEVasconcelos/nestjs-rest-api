import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly hashingService: HashingService,
  ) {}

  throwNotFoundException() {
    throw new NotFoundException('Message not found');
  }

  async create(createUserDto: CreateUserDto) {
    console.log('OIOIOI');

    try {
      const passwordHash = await this.hashingService.hash(
        createUserDto.password,
      );
      const userData = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwordHash,
      };

      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find({ order: { id: 'desc' } });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      this.throwNotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const partialUpdateUserDto = {
      name: updateUserDto?.name,
      email: updateUserDto?.email,
      password: updateUserDto?.password,
    };

    if (updateUserDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updateUserDto.password,
      );

      partialUpdateUserDto['password'] = passwordHash;
    }
    const user = await this.userRepository.preload({
      id,
      ...partialUpdateUserDto,
    });

    if (!user) return this.throwNotFoundException();

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) return this.throwNotFoundException();

    return this.userRepository.delete(user);
  }
}
