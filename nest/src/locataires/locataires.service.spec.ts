import { Test, TestingModule } from '@nestjs/testing';
import { LocatairesService } from './locataires.service';
import { getModelToken } from '@nestjs/mongoose';
import { Locataire } from './schemas/locataire.schema';
import { Model } from 'mongoose';

const mocklocataire = {
  nom: 'toto',
  prenom: 'tata',
  email: "toto1@.com",
  password: "titi"
};

describe('CatsService', () => {
  let service: LocatairesService;
  let model: Model<Locataire>;

  const locatairesArray = [
    {
      nom: 'toto',
      prenom: 'tata',
      email: "toto1@.com",
      password: "titi"
    },
    {
      nom: 'toto',
      prenom: 'tata',
      email: "toto1@.com",
      password: "titi"
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocatairesService,
        {
          provide: getModelToken('Cat'),
          useValue: {
            new: jest.fn().mockResolvedValue(mocklocataire),
            constructor: jest.fn().mockResolvedValue(mocklocataire),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocatairesService>(LocatairesService);
    model = module.get<Model<Locataire>>(getModelToken('Cat'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(locatairesArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(locatairesArray);
  });

  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        nom: 'toto',
        prenom: 'tata',
        email: "toto1@.com",
        password: "titi"
      }),
    );
    const newLocataire = await service.create({
      nom: 'toto',
      prenom: 'tata',
      email: "toto1@.com",
      password: "titi"
    });
    expect(newLocataire).toEqual(mocklocataire);
  });
});
