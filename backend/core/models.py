from django.db import models
from django.core.validators import MinValueValidator, RegexValidator

class Usuario(models.Model):
    # Opciones para campos de selección
    SEXO_OPCIONES = [
        ('FEMENINO', 'Femenino'),
        ('MASCULINO', 'Masculino'),
        ('OTRO', 'Otro'),
    ]

    ESTADO_EMPRENDIMIENTO = [
        ('AÚN NO INICIO MI EMPRENDIMIENTO', 'Aún no inicio mi emprendimiento'),
        ('YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES', 'Ya inicié pero sin utilidades'),
        ('YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES', 'Ya inicié y con utilidades'),
    ]

    ROL_OPCIONES = [
        ('SOCIO CAPITALISTA', 'Socio capitalista'),
        ('SOCIO TRABAJADOR', 'Socio trabajador'),
        ('SOCIO IGUALITARIO (CAPITAL Y TRABAJO)', 'Socio mixto (capital y trabajo)'),
    ]

    # Campos principales
    nombres = models.CharField(
        max_length=100,
        help_text="Ingrese sus nombres completos"
    )
    
    apellidos = models.CharField(
        max_length=100,
        help_text="Ingrese sus apellidos completos"
    )
    
    pais = models.CharField(
        max_length=50,
        help_text="País de residencia"
    )
    
    ultima_actualizacion = models.DateTimeField(
    auto_now=True,  # Actualiza automáticamente cada vez que se guarda el registro
    null=True,      # Permite valores nulos si no es obligatorio
    blank=True      # Permite dejar el campo vacío
    
    )
    ciudad = models.CharField(
        max_length=50,
        help_text="Ciudad de residencia"
    )
    
    sexo = models.CharField(
        max_length=20,
        choices=SEXO_OPCIONES
    )
    
    edad = models.PositiveIntegerField(
        validators=[MinValueValidator(18)],
        help_text="Debe ser mayor de 18 años"
    )
    
    telefono = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?[\d\s]{8,15}$',
                message="Formato de teléfono inválido. Use números y un + opcional"
            )
        ]
    )
    
    correo_electronico = models.EmailField(
        unique=True,
        error_messages={
            'unique': "Este correo electrónico ya está registrado"
        }
    )
    
    estado_emprendimiento = models.CharField(
        max_length=60,  # Ajustado al valor más largo de las opciones
        choices=ESTADO_EMPRENDIMIENTO
    )
    
    rol = models.CharField(
        max_length=40,  # Ajustado al valor más largo de las opciones
        choices=ROL_OPCIONES
    )
    
    descripcionProyecto = models.TextField(
        max_length=800,
        help_text="Describa su proyecto (máximo 800 caracteres)"
    )
    
    # Campos condicionales
    tipoemprendimiento = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=[
            ('PRODUCTOS', 'Productos'),
            ('SERVICIOS', 'Servicios')
        ]
    )
    
    titulo = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    
    opcion = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )
    
    fecha_registro = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-fecha_registro']
        indexes = [
        models.Index(fields=['correo_electronico'], name='email_index'),
        ]

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"

    def clean(self):
        """Validación adicional a nivel de modelo"""
        from django.core.exceptions import ValidationError
        
        # Validación para emprendimientos iniciados
        if self.estado_emprendimiento != 'AÚN NO INICIO MI EMPRENDIMIENTO':
            if not self.tipoemprendimiento:
                raise ValidationError(
                    {'tipoemprendimiento': 'Debe especificar el tipo de emprendimiento'}
                )
            if not self.titulo:
                raise ValidationError(
                    {'titulo': 'Debe especificar una categoría'}
                )
            if not self.opcion:
                raise ValidationError(
                    {'opcion': 'Debe especificar una opción específica'}
                )
        
        # Normalización de datos
        self.nombres = self.nombres.strip().title()
        self.apellidos = self.apellidos.strip().title()
        self.correo_electronico = self.correo_electronico.lower()