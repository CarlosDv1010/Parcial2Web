import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateActividadDTO } from './dto/create-actividad.dto';

describe('ActividadService', () => {
  let service: ActividadService;
  let actividadRepository: any;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: getRepositoryToken(Actividad),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    actividadRepository = module.get(getRepositoryToken(Actividad));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearActividad', () => {
    it('should throw BadRequestException if title is too short', async () => {
      const createActividadDto: CreateActividadDTO = {
        titulo: 'Corto',
        fecha: '2023-12-15',
        calificacion: 4,
        cupoMaximo: 10,
      };

      await expect(service.crearActividad(createActividadDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if title contains symbols', async () => {
      const createActividadDto: CreateActividadDTO = {
        titulo: 'Actividad con @!',
        fecha: '2023-12-15',
        calificacion: 4,
        cupoMaximo: 10,
      };

      await expect(service.crearActividad(createActividadDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create an activity with valid data', async () => {
      const createActividadDto: CreateActividadDTO = {
        titulo: 'Actividad de prueba para estudiantes',
        fecha: '2023-12-15',
        calificacion: 4,
        cupoMaximo: 10,
      };
      
      const newActivity = {
        ...createActividadDto,
        estado: 0,
      };
      
      actividadRepository.create.mockReturnValue(newActivity);
      actividadRepository.save.mockResolvedValue({ id: 1, ...newActivity });

      // Act
      const result = await service.crearActividad(createActividadDto);

      // Assert
      expect(result.titulo).toBe(createActividadDto.titulo);
      expect(result.estado).toBe(0);
    });
  });

  describe('findAllActividadesByDate', () => {
    it('should find activities by date', async () => {
      const fecha = '2023-12-15';
      const activities = [
        { id: 1, titulo: 'Activity 1', fecha },
        { id: 2, titulo: 'Activity 2', fecha },
      ];
      
      actividadRepository.find.mockResolvedValue(activities);

      const result = await service.findAllActividadesByDate(fecha);

      expect(result).toEqual(activities);
      expect(actividadRepository.find).toHaveBeenCalledWith({
        where: { fecha },
      });
    });
  });

  describe('cambiarEstado', () => {
    it('should change activity state when conditions are met', async () => {
      const actividadId = 1;
      const estado = 1;
      const actividad = {
        id: actividadId,
        estado: 0,
        cupos: 10,
        inscritos: Array(8).fill({}),
      };
      
      actividadRepository.findOne.mockResolvedValue(actividad);
      actividadRepository.save.mockImplementation((act) => Promise.resolve(act));

      const result = await service.cambiarEstado(actividadId, estado);

      expect(result.estado).toBe(estado);
    });
  });
});
