from django.db import models

class Usuario(models.Model):
    pais = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10)
    edad = models.IntegerField()
    telefono = models.CharField(max_length=20)
    correo_electronico = models.EmailField()
    estado_emprendimiento = models.CharField(max_length=50)
    se_centra_en = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    opcion_especifica = models.CharField(max_length=100)
    rol = models.CharField(max_length=50)
    descripcion = models.TextField()

    class Meta:
        db_table = 'usuarios'



