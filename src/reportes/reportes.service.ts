// src/reportes/reportes.service.ts:
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesService {
    constructor(private readonly prisma: PrismaService) { }

    /* REQUERIMIENTO 4 */
    async medicamentosMasRecetadosUltimoMes() {
        const desde = new Date();
        desde.setMonth(desde.getMonth() - 1);

        const agrupado = await this.prisma.recetaMedica.groupBy({
            by: ['id_medicamento'],
            _count: { id_medicamento: true },
            where: {
                receta: {
                    fecha_emision: { gte: desde },
                },
            },
            orderBy: {
                _count: { id_medicamento: 'desc' },
            },
        });

        if (agrupado.length === 0) return [];

        const ids = agrupado.map((x) => x.id_medicamento);

        const medicamentos = await this.prisma.medicamento.findMany({
            where: { id_medicamento: { in: ids } },
            select: {
                id_medicamento: true,
                nombre: true,
                descripcion: true,
            },
        });

        const map = new Map(medicamentos.map((m) => [m.id_medicamento, m]));

        return agrupado.map((x) => ({
            medicamento: map.get(x.id_medicamento),
            frecuencia: x._count.id_medicamento,
        }));
    }

    /* REQUERIMIENTO 5 */
    async pacientesSinCitasUltimosSeisMeses() {
        const desde = new Date();
        desde.setMonth(desde.getMonth() - 6);

        return this.prisma.paciente.findMany({
            where: {
                citas: {
                    none: {
                        fecha: { gte: desde },
                    },
                },
            },
            orderBy: { id_paciente: 'desc' },
        });
    }

    /* REQUERIMIENTO 7 */
    async totalCitasPorEspecialidadYDoctor() {
        const porDoctorRaw = await this.prisma.cita.groupBy({
            by: ['id_doctor'],
            _count: { id_cita: true },
        });

        if (porDoctorRaw.length === 0) {
            return { porEspecialidad: [], porDoctor: [] };
        }

        const doctores = await this.prisma.doctor.findMany({
            select: {
                id_doctor: true,
                nombre: true,
                especialidad: {
                    select: {
                        id_especialidad: true,
                        nombre: true,
                    },
                },
            },
        });

        const docMap = new Map(doctores.map((d) => [d.id_doctor, d]));

        const porDoctor = porDoctorRaw
            .map((x) => ({
                doctor: docMap.get(x.id_doctor),
                total_citas: x._count.id_cita,
            }))
            .sort((a, b) => b.total_citas - a.total_citas);

        const especMap = new Map<number, { especialidad: any; total_citas: number }>();

        for (const x of porDoctorRaw) {
            const doctor = docMap.get(x.id_doctor);
            if (!doctor?.especialidad) continue;

            const idEsp = doctor.especialidad.id_especialidad;

            const actual = especMap.get(idEsp);
            if (!actual) {
                especMap.set(idEsp, {
                    especialidad: doctor.especialidad,
                    total_citas: x._count.id_cita,
                });
            } else {
                actual.total_citas += x._count.id_cita;
            }
        }

        const porEspecialidad = Array.from(especMap.values()).sort(
            (a, b) => b.total_citas - a.total_citas,
        );

        return { porEspecialidad, porDoctor };
    }

    /* REQUERIMIENTO 10 */
    async buscarPacientesConResumen(q: string) {
        const termino = (q ?? '').trim();
        if (!termino) return [];

        const pacientes = await this.prisma.paciente.findMany({
            where: {
                OR: [
                    { nombre: { contains: termino, mode: 'insensitive' } },
                    { apellido: { contains: termino, mode: 'insensitive' } },
                ],
            },
            include: {
                citas: {
                    orderBy: { fecha: 'desc' },
                    select: { fecha: true },
                },
                _count: {
                    select: { citas: true },
                },
            },
            orderBy: { id_paciente: 'desc' },
        });

        return pacientes.map((p) => {
            const apellido = p.apellido ?? '';
            const nombreCompleto = `${p.nombre} ${apellido}`.trim();

            return {
                id_paciente: p.id_paciente,
                nombre: p.nombre,
                apellido: p.apellido, // puede ser null
                nombre_completo: nombreCompleto,
                total_citas: p._count.citas,
                ultima_cita: p.citas.length > 0 ? p.citas[0].fecha : null,
            };
        });
    }
}