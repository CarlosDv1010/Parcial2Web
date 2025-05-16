import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './entities/estudiante.entity';
import { Actividad } from '../actividad/entities/actividad.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: any;
  let actividadRepository: any;

  beforeEach(async () => {
    const mockEstudianteRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockActividadRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useValue: mockEstudianteRepository,
        },
        {
          provide: getRepositoryToken(Actividad),
          useValue: mockActividadRepository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get(getRepositoryToken(Estudiante));
    actividadRepository = module.get(getRepositoryToken(Actividad));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearEstudiante', () => {
    it('should throw BadRequestException if semester is less than 1', async () => {
      const createEstudianteDto: CreateEstudianteDto = {
        cedula: 123456789,
        nombre: 'Test Student',
        correo: 'test@example.com',
        programa: 'Computer Science',
        semestre: 0,
      };

      await expect(service.crearEstudiante(createEstudianteDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if email is invalid', async () => {
      const createEstudianteDto: CreateEstudianteDto = {
        cedula: 123456789,
        nombre: 'Test Student',
        correo: 'invalid-email',
        programa: 'Computer Science',
        semestre: 5,
      };

      await expect(service.crearEstudiante(createEstudianteDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a student with valid data', async () => {
      const createEstudianteDto: CreateEstudianteDto = {
        cedula: 123456789,
        nombre: 'Test Student',
        correo: 'test@example.com',
        programa: 'Computer Science',
        semestre: 5,
      };
      
      const newEstudiante = {
        ...createEstudianteDto,
        actividades: [],
        resenas: []
      };
      
      estudianteRepository.create.mockReturnValue(newEstudiante);
      estudianteRepository.save.mockResolvedValue({ id: 1, ...newEstudiante });

      const result = await service.crearEstudiante(createEstudianteDto);

      expect(result.nombre).toBe(createEstudianteDto.nombre);
      expect(result.correo).toBe(createEstudianteDto.correo);
    });
  });

  describe('findEstudianteById', () => {
    it('should find a student by id', async () => {
      const estudianteId = 1;
      const estudiante = {
        id: estudianteId,
        nombre: 'Test Student',
        correo: 'test@example.com',
      };
      
      estudianteRepository.findOne.mockResolvedValue(estudiante);

      const result = await service.findEstudianteById(estudianteId);

      expect(result).toEqual(estudiante);
      expect(estudianteRepository.findOne).toHaveBeenCalledWith({
        where: { id: estudianteId },
        relations: ['actividades', 'resenas']
      });
    });

    it('should throw NotFoundException if student not found', async () => {
      const estudianteId = 999;
      
      estudianteRepository.findOne.mockResolvedValue(null);

      await expect(service.findEstudianteById(estudianteId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('inscribirseActividad', () => {
    it('should enroll student in activity when conditions are met', async () => {
      const estudianteId = 1;
      const actividadId = 1;
      
      const estudiante = {
        id: estudianteId,
        nombre: 'Test Student',
        actividades: [],
      };
      
      const actividad = {
        id: actividadId,
        titulo: 'Test Activity',
        estado: 0,
        cupos: 10,
        inscritos: [],
      };
      
      estudianteRepository.findOne.mockResolvedValue(estudiante);
      actividadRepository.findOne.mockResolvedValue(actividad);
      estudianteRepository.save.mockImplementation((est) => Promise.resolve(est));

      const result = await service.inscribirseActividad(estudianteId, actividadId);

      expect(estudiante.actividades).toContain(actividad);
      expect(estudianteRepository.save).toHaveBeenCalled();
    });
  });
});
