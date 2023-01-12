import { Test, TestingModule } from '@nestjs/testing';
import { LocatairesController } from './locataires.controller';
import { CreateLocataireDto } from './dto/create-locataire.dto';
import { LocatairesService } from './locataires.service';

describe('Locataires Controller', () => {
  let controller: LocatairesController;
  let service: LocatairesService;
  const CreateLocataireDto: CreateLocataireDto = {
    nom: 'toto',
    prenom: 'tata',
    email: "toto1@.com",
    password: "titi"
  };

  const mockLocataire = {
    nom: 'toto1',
    prenom: 'tata1',
    email: "toto1@.com",
    password: "titi1",
    _id: '11',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocatairesController],
      providers: [
        {
          provide: LocatairesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                nom: 'toto1',
                prenom: 'tata1',
                email: "toto1@.com",
                password: "titi"
              },
              {
                nom: 'toto2',
                prenom: 'tata2',
                email: "toto1@.com",
                password: "titi"
              },
              {
                nom: 'toto3',
                prenom: 'tata3',
                email: "toto1@.com",
                password: "titi"
              },
            ]),
            create: jest.fn().mockResolvedValue(CreateLocataireDto),
          },
        },
      ],
    }).compile();

    controller = module.get<LocatairesController>(LocatairesController);
    service = module.get<LocatairesService>(LocatairesService);
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockLocataire);

      await controller.create(CreateLocataireDto);
      expect(createSpy).toHaveBeenCalledWith(CreateLocataireDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Cat #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Cat #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Cat #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
