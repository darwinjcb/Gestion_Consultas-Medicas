// src/doctores/doctores.controller.ts:
import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { DoctoresService } from './doctores.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctores')
export class DoctoresController {
    constructor(private readonly doctoresService: DoctoresService) { }

    @Post()
    create(@Body() dto: CreateDoctorDto) {
        return this.doctoresService.create(dto);
    }

    @Get()
    findAll() {
        return this.doctoresService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.doctoresService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDoctorDto,
    ) {
        return this.doctoresService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.doctoresService.remove(id);
    }
}