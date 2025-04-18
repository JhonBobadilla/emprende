import django
import os

# Aquí debes hacer referencia a la ruta de settings dentro de 'backend'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')  # Cambia esto a la ruta correcta de tu archivo settings.py

# Configurar Django
django.setup()

# Ahora puedes importar tu modelo
from core.models import Usuario

def insertar_datos():
    # Crear y guardar usuarios de ejemplo
    usuarios = [
        Usuario(
            pais="Colombia",
            ciudad="Bogotá",
            nombres="Juan",
            apellidos="Pérez",
            sexo="Masculino",
            edad=30,
            telefono="123456789",
            correo_electronico="juan.perez@correo.com",
            estado_emprendimiento="Activo",
            se_centra_en="Tecnología",
            categoria="Software",
            opcion_especifica="Desarrollador Web",
            rol="CEO",
            descripcion="Emprendedor en tecnología y desarrollo de software"
        ),
        Usuario(
            pais="Colombia",
            ciudad="Medellín",
            nombres="Ana",
            apellidos="Gómez",
            sexo="Femenino",
            edad=28,
            telefono="987654321",
            correo_electronico="ana.gomez@correo.com",
            estado_emprendimiento="Activo",
            se_centra_en="Educación",
            categoria="Servicios",
            opcion_especifica="Consultoría",
            rol="Consultora",
            descripcion="Especialista en desarrollo de programas educativos"
        ),
        Usuario(
            pais="Peru",
            ciudad="Lima",
            nombres="Carlos",
            apellidos="Torres",
            sexo="Masculino",
            edad=35,
            telefono="345678123",
            correo_electronico="carlos.torres@correo.com",
            estado_emprendimiento="Activo",
            se_centra_en="Salud",
            categoria="Servicios",
            opcion_especifica="Clínica",
            rol="Médico",
            descripcion="Médico general con enfoque en medicina preventiva"
        ),
        Usuario(
            pais="Mexico",
            ciudad="Ciudad de México",
            nombres="Luis",
            apellidos="Martínez",
            sexo="Masculino",
            edad=40,
            telefono="654321987",
            correo_electronico="luis.martinez@correo.com",
            estado_emprendimiento="Activo",
            se_centra_en="Tecnología",
            categoria="Productos",
            opcion_especifica="Desarrollo de Software",
            rol="Ingeniero",
            descripcion="Desarrollador de software con experiencia en Python y Django"
        )
    ]

    # Guardar todos los usuarios en la base de datos
    for usuario in usuarios:
        usuario.save()

# Ejecutar la inserción
if __name__ == '__main__':
    insertar_datos()
    print("Datos insertados correctamente.")



