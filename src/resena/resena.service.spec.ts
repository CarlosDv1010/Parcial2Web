import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResenaService } from './resena.service';
import { Resena } from './entities/resena.entity';
import { Actividad } from '../actividad/entities/actividad.entity';
import { EstudianteService } from '../estudiante/estudiante.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateResenaDTO } from './dto/create-resena.dto';

describe('ResenaService', () => {
  let service: ResenaService;
  let resenaRepository: any;
  let actividadRepository: any;
  let estudianteService: any;

  beforeEach(async () => {
    const mockResenaRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockActividadRepository = {
      findOne: jest.fn(),
    };

    const mockEstudianteService = {
      findEstudianteById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        {
          provide: getRepositoryToken(Resena),
          useValue: mockResenaRepository,
        },
        {
          provide: getRepositoryToken(Actividad),
          useValue: mockActividadRepository,
        },
        {
          provide: EstudianteService,
          useValue: mockEstudianteService,
        },
      ],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
    resenaRepository = module.get(getRepositoryToken(Resena));
    actividadRepository = module.get(getRepositoryToken(Actividad));
    estudianteService = module.get<EstudianteService>(EstudianteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('agregarResena', () => {
    it('should throw NotFoundException if student not found', async () => {
      const createResenaDto: CreateResenaDTO = {
        comentario: 'Great activity',
        calificacion: 5,
        fecha: '2023-12-15',
        actividadId: 1,
        estudianteId: 999,
      };
      
      estudianteService.findEstudianteById.mockResolvedValue(null);

      await expect(service.agregarResena(createResenaDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if activity not found', async () => {
      const createResenaDto: CreateResenaDTO = {
        comentario: 'Great activity',
        calificacion: 5,
        fecha: '2023-12-15',
        actividadId: 999,
        estudianteId: 1,
      };
      
      const estudiante = {
        id: 1,
        nombre: 'Test Student',
      };
      
      estudianteService.findEstudianteById.mockResolvedValue(estudiante);
      actividadRepository.findOne.mockResolvedValue(null);

      await expect(service.agregarResena(createResenaDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if activity is not finalized', async () => {
      const createResenaDto: CreateResenaDTO = {
        comentario: 'Great activity',
        calificacion: 5,
        fecha: '2023-12-15',
        actividadId: 1,
        estudianteId: 1,
      };
      
      const estudiante = {
        id: 1,
        nombre: 'Test Student',
      };
      
      const actividad = {
        id: 1,
        titulo: 'Test Activity',
        estado: 1,
        inscritos: [{ id: 1 }],
      };
      
      estudianteService.findEstudianteById.mockResolvedValue(estudiante);
      actividadRepository.findOne.mockResolvedValue(actividad);

      await expect(service.agregarResena(createResenaDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if student was not enrolled', async () => {
      const createResenaDto: CreateResenaDTO = {
        comentario: 'Great activity',
        calificacion: 5,
        fecha: '2023-12-15',
        actividadId: 1,
        estudianteId: 2,
      };
      
      const estudiante = {
        id: 2,
        nombre: 'Test Student',
      };
      
      const actividad = {
        id: 1,
        titulo: 'Test Activity',
        estado: 2, 
        inscritos: [{ id: 1 }],
      };
      
      estudianteService.findEstudianteById.mockResolvedValue(estudiante);
      actividadRepository.findOne.mockResolvedValue(actividad);

      await expect(service.agregarResena(createResenaDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should add review when all conditions are met', async () => {
      const createResenaDto: CreateResenaDTO = {
        comentario: 'Great activity',
        calificacion: 5,
        fecha: '2023-12-15',
        actividadId: 1,
        estudianteId: 1,
      };
      
      const estudiante = {
        id: 1,
        nombre: 'Test Student',
      };
      
      const actividad = {
        id: 1,
        titulo: 'Test Activity',
        estado: 2, 
        inscritos: [{ id: 1 }], 
      };
      
      const nuevaResena = {
        ...createResenaDto,
        estudiante,
        actividad,
      };
      
      estudianteService.findEstudianteById.mockResolvedValue(estudiante);
      actividadRepository.findOne.mockResolvedValue(actividad);
      resenaRepository.create.mockReturnValue(nuevaResena);
      resenaRepository.save.mockResolvedValue({ id: 1, ...nuevaResena });

      const result = await service.agregarResena(createResenaDto);

      expect(result.comentario).toBe(createResenaDto.comentario);
      expect(result.estudiante).toBe(estudiante);
      expect(result.actividad).toBe(actividad);
    });
  });
});
