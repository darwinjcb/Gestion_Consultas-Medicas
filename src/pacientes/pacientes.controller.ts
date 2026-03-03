import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) { }

    @Post()
    create(@Body() dto: CreatePacienteDto) {
        return this.pacientesService.create(dto);
    }

    @Get()
    findAll() {
        return this.pacientesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pacientesService.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
        return this.pacientesService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pacientesService.remove(Number(id));
    }
}