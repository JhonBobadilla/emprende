# Este archivo se encargará de convertir los datos del modelo Usuario en un formato que pueda enviarse y recibirse como JSON desde el frontend.

from rest_framework import serializers
from .models import Usuario
import re

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'se_centra_en': {
                'required': False,
                'allow_blank': True,
                'allow_null': True
            },
            'categoria': {
                'required': False,
                'allow_blank': True,
                'allow_null': True
            },
            'opcion_especifica': {
                'required': False,
                'allow_blank': True,
                'allow_null': True
            },
            'descripcion': {
                'required': True,
                'allow_blank': False,
                'error_messages': {
                    'blank': 'La descripción del proyecto es obligatoria'
                }
            },
            'estado_emprendimiento': {
                'max_length': 50,
                'error_messages': {
                    'max_length': 'El estado no puede exceder los 50 caracteres'
                }
            },
            'correo_electronico': {
                'required': True,
                'allow_blank': False,
                'error_messages': {
                    'blank': 'El correo electrónico es obligatorio',
                    'invalid': 'Ingrese un correo electrónico válido'
                }
            },
            'telefono': {
                'required': True,
                'allow_blank': False
            }
        }

    def validate_edad(self, value):
        """Validación personalizada para la edad"""
        if value < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte")
        if value > 100:
            raise serializers.ValidationError("Por favor verifica tu edad")
        return value

    def validate_telefono(self, value):
        """Validación para el formato del teléfono"""
        if not re.match(r'^\+?\d{9,15}$', value):
            raise serializers.ValidationError("Formato de teléfono inválido. Use solo números y el signo + opcional")
        return value

    def validate_correo_electronico(self, value):
        """Validación básica de formato de email"""
        if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', value):
            raise serializers.ValidationError("Ingrese un correo electrónico válido")
        return value.lower()  # Normaliza a minúsculas

    def validate(self, data):
        """Validación cruzada de campos"""
        estado = data.get('estado_emprendimiento')
        
        # Validación para emprendimientos iniciados
        if estado and estado != 'AÚN NO INICIO MI EMPRENDIMIENTO':
            if not data.get('se_centra_en'):
                raise serializers.ValidationError({
                    "se_centra_en": "Debe especificar si su emprendimiento se centra en productos o servicios"
                })
            if not data.get('categoria'):
                raise serializers.ValidationError({
                    "categoria": "Debe seleccionar una categoría para su emprendimiento"
                })
            if not data.get('opcion_especifica'):
                raise serializers.ValidationError({
                    "opcion_especifica": "Debe especificar la opción concreta de su emprendimiento"
                })

        # Validación de descripción
        descripcion = data.get('descripcion', '').strip()
        if len(descripcion) < 30:
            raise serializers.ValidationError({
                "descripcion": "La descripción debe tener al menos 30 caracteres"
            })
        if len(descripcion) > 800:
            raise serializers.ValidationError({
                "descripcion": "La descripción no puede exceder los 800 caracteres"
            })

        return data

    def create(self, validated_data):
        """Creación con lógica adicional"""
        # Verificar si el correo ya existe
        if Usuario.objects.filter(correo_electronico=validated_data['correo_electronico']).exists():
            raise serializers.ValidationError({
                'correo_electronico': 'Este correo electrónico ya está registrado'
            })

        # Capitalizar nombres y apellidos
        validated_data['nombres'] = validated_data['nombres'].strip().title()
        validated_data['apellidos'] = validated_data['apellidos'].strip().title()

        return super().create(validated_data)