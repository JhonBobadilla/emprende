#Este archivo

#Define que esta vista aceptará únicamente solicitudes POST, que son usadas para enviar datos.
#- UsuarioSerializer(data=request.data): Toma los datos enviados desde el frontend y los valida usando el serializer.
#- serializer.save(): Guarda los datos validados en la base de datos usando el modelo Usuario.
#- Responde con un mensaje de éxito o con errores de validación según el caso. 

import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer

@api_view(['POST'])
def guardar_usuario(request):
    """
    Endpoint para registro de usuarios con manejo avanzado de errores
    """
    # Manejo de JSON malformado
    try:
        request_data = json.loads(request.body)
        print("Datos recibidos:", request_data)  # Verifica lo que llega al backend
    except json.JSONDecodeError:
        return Response(
            {
                "status": "error",
                "code": "invalid_json",
                "message": "El formato JSON es inválido"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validación con serializer
    serializer = UsuarioSerializer(data=request_data)
    if not serializer.is_valid():
        return Response(
            {
                "status": "error",
                "code": "validation_error",
                "errors": serializer.errors,
                "message": "Error en la validación de datos"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Guardado del usuario
    try:
        serializer.save()
        return Response(
            {
                "status": "success",
                "data": serializer.data,
                "message": "Usuario registrado exitosamente"
            },
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        print("Error al guardar el usuario:", str(e))  
        return Response(
            {
                "status": "error",
                "code": "server_error",
                "message": f"Error en el servidor: {str(e)}"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )