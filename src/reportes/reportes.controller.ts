// src/reportes/reportes.controller.ts:
import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
    constructor(private readonly reportesService: ReportesService) { }

    // ✅ REQUERIMIENTO 4
    @Get('medicamentos-mas-recetados-ultimo-mes')
    medicamentosMasRecetadosUltimoMes() {
        return this.reportesService.medicamentosMasRecetadosUltimoMes();
    }

    // ✅ REQUERIMIENTO 5
    @Get('pacientes-sin-citas-6-meses')
    pacientesSinCitas6Meses() {
        return this.reportesService.pacientesSinCitasUltimosSeisMeses();
    }

    // ✅ REQUERIMIENTO 7
    @Get('total-citas-por-especialidad-y-doctor')
    totalCitasPorEspecialidadYDoctor() {
        return this.reportesService.totalCitasPorEspecialidadYDoctor();
    }

    // ✅ REQUERIMIENTO 10
    // GET /reportes/buscar-pacientes?q=juan
    @Get('buscar-pacientes')
    buscarPacientes(@Query('q') q: string) {
        return this.reportesService.buscarPacientesConResumen(q);
    }
}