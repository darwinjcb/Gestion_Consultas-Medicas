-- CreateIndex
CREATE INDEX "Cita_id_paciente_idx" ON "Cita"("id_paciente");

-- CreateIndex
CREATE INDEX "Cita_id_doctor_idx" ON "Cita"("id_doctor");

-- CreateIndex
CREATE INDEX "Cita_fecha_idx" ON "Cita"("fecha");

-- CreateIndex
CREATE INDEX "Doctor_id_especialidad_idx" ON "Doctor"("id_especialidad");

-- CreateIndex
CREATE INDEX "Receta_id_cita_idx" ON "Receta"("id_cita");

-- CreateIndex
CREATE INDEX "Receta_fecha_emision_idx" ON "Receta"("fecha_emision");

-- CreateIndex
CREATE INDEX "RecetaMedica_id_medicamento_idx" ON "RecetaMedica"("id_medicamento");

-- CreateIndex
CREATE INDEX "Usuario_id_doctor_idx" ON "Usuario"("id_doctor");
