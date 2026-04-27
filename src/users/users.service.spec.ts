/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<Users>;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    hashingService = module.get<HashingService>(HashingService);
  });

  it('UsersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'tsousa@email.com',
        name: 'Thiago',
        password: '123456',
      };
      const passwordHash = 'HASHDESENHA';

      const newUser = {
        id: 1,
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash,
      };

      jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
      jest.spyOn(usersRepository, 'create').mockReturnValue(newUser as any);
      //Act
      const result = await usersService.create(createUserDto);

      // Assert
      expect(hashingService.hash).toHaveBeenCalledWith(createUserDto.password);

      expect(usersRepository.create).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash,
      });

      expect(usersRepository, 'create').toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });

    it('should throw a conflictException when email already exists', async () => {
      jest.spyOn(usersRepository, 'save').mockRejectedValue({
        code: '23505',
      });

      const result = await expect(
        usersService.create({} as any),
      ).rejects.toThrow(ConflictException);
    });
  });
});
