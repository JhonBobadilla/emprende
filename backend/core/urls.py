""" Este archivo tiene como función principal definir las rutas o "endpoints" que conectan URLs específicas con las vistas correspondientes en la aplicación. Antes, este archivo únicamente configuraba la ruta para el panel de administración de Django, permitiendo acceder al área de administración con la URL admin/. Ahora, se ha ampliado su funcionalidad al incluir una nueva ruta guardar_usuario/, que conecta directamente con la vista guardar_usuario. Esto permite que el backend reciba datos enviados desde el frontend mediante solicitudes POST y los procese para guardarlos en la base de datos, creando así un endpoint funcional para la API. En resumen, este archivo ahora facilita tanto la administración como la interacción dinámica entre el frontend y el backend
 """

from django.contrib import admin
from django.urls import path
from core.views import guardar_usuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', guardar_usuario, name='guardar_usuario'),
]
