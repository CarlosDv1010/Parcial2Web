import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import { RolUsuario } from 'src/common/role.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

describe('UsuarioService', () => {
  let service: EstudianteService;
  let repository: Repository<Estudiante>;

  const mockJefe: Estudiante = {
    id: 2,
    cedula: 9876543210,
    nombre: 'Jefe User',
    rol: RolUsuario.DECANA,
    grupoInvestigacion: 'TICSW',
    numeroExtension: 87654321,
    clasesImpartidas: [],
    bonos: [],
  };

  const mockUsuarioProfesor: Estudiante = {
    id: 1,
    cedula: 1234567890,
    nombre: 'Test User Profesor',
    rol: RolUsuario.PROFESOR,
    grupoInvestigacion: 'TICSW',
    numeroExtension: 12345678,
    jefe: mockJefe,
    clasesImpartidas: [],
    bonos: [],
  };

  const mockUsuarioDecana: Estudiante = {
    id: 3,
    cedula: 1122334455,
    nombre: 'Test User Decana',
    rol: RolUsuario.DECANA,
    grupoInvestigacion: 'IMAGINE',
    numeroExtension: 11223344,
    jefe: mockJefe,
    clasesImpartidas: [],
    bonos: [],
  };

  const mockUsuarioProfesorWithBonos: Estudiante = {
    id: 4,
    cedula: 5566778899,
    nombre: 'Test User With Bonos',
    rol: RolUsuario.PROFESOR,
    grupoInvestigacion: 'COMIT',
    numeroExtension: 55667788,
    jefe: mockJefe,
    clasesImpartidas: [],
    bonos: [{ id: 1, monto: 100, calificacion: 5, palabraClave: 'test', usuario: null, usuarioId: 4, clase: null, claseId: 1 }],
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearUsuario', () => {
    it('should create a user successfully', async () => {
      const createUsuarioDto: CreateUsuarioDto = {
        cedula: 1234567890,
        nombre: 'New User',
        rol: RolUsuario.PROFESOR,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
      };
      const expectedUsuario: Estudiante = {
        id: 5,
        ...createUsuarioDto,
        jefe: mockJefe,
        clasesImpartidas: [],
        bonos: [],
      };

      jest.spyOn(repository, 'create').mockReturnValue(expectedUsuario);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedUsuario);

      const result = await service.crearUsuario(createUsuarioDto);
      expect(result).toEqual(expectedUsuario);
      expect(repository.create).toHaveBeenCalledWith(createUsuarioDto);
      expect(repository.save).toHaveBeenCalledWith(expectedUsuario);
    });

    it('should throw BadRequestException for invalid grupoInvestigacion for Profesor', async () => {
      const createUsuarioDto: CreateUsuarioDto = {
        cedula: 1234567890,
        nombre: 'Test User',
        rol: RolUsuario.PROFESOR,
        grupoInvestigacion: 'INVALID',
        numeroExtension: 12345678,
      };

      await expect(service.crearUsuario(createUsuarioDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.crearUsuario(createUsuarioDto)).rejects.toThrow(
        'Grupo de investigación inválido para el rol Profesor.',
      );
    });

    it('should throw BadRequestException for invalid numeroExtension for Decana', async () => {
      const createUsuarioDto: CreateUsuarioDto = {
        cedula: 1234567890,
        nombre: 'Test User',
        rol: RolUsuario.DECANA,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 123,
      };

      await expect(service.crearUsuario(createUsuarioDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.crearUsuario(createUsuarioDto)).rejects.toThrow(
        'El número de extensión debe tener 8 dígitos para el rol Decana.',
      );
    });
  });

  describe('findUsuarioById', () => {
    it('should return a user if found', async () => {
      const userId = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUsuarioProfesor);

      const result = await service.findEstudianteById(userId);
      expect(result).toEqual(mockUsuarioProfesor);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should return null if user not found', async () => {
      const userId = 99;
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findEstudianteById(userId);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });

  describe('eliminarUsuario', () => {
    it('should delete a user successfully', async () => {
      const userId = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUsuarioProfesor);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.eliminarUsuario(userId);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['bonos'],
      });
      expect(repository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw BadRequestException if user not found', async () => {
      const userId = 99;
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        'Usuario no encontrado.',
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['bonos'],
      });
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if user has Decana role', async () => {
      const userId = 3;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUsuarioDecana);

      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        'No se puede eliminar un usuario con rol Decana.',
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['bonos'],
      });
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if user has associated bonos', async () => {
      const userId = 4;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUsuarioProfesorWithBonos);

      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.eliminarUsuario(userId)).rejects.toThrow(
        'No se puede eliminar un usuario con bonos asociados.',
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['bonos'],
      });
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});