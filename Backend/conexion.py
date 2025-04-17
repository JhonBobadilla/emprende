import mysql.connector

def insertar_usuario(pais, ciudad, nombres, apellidos, sexo, edad, telefono, correo, estado, se_centra_en, categoria, opcion, rol, descripcion):
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="emprende"
    )
    cursor = conexion.cursor()
    sql = """
    INSERT INTO usuarios (pais, ciudad, nombres, apellidos, sexo, edad, telefono, correo_electronico, estado_emprendimiento, se_centra_en, categoria, opcion_especifica, rol, descripcion) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (pais, ciudad, nombres, apellidos, sexo, edad, telefono, correo, estado, se_centra_en, categoria, opcion, rol, descripcion)
    cursor.execute(sql, valores)
    conexion.commit()
    print(f"{cursor.rowcount} usuario insertado correctamente.")
    conexion.close()

# Prueba de inserción
insertar_usuario(
    "Colombia", "Bogotá", "Jhon", "Doe", "MASCULINO", 30, "1234567890",
    "jhon.doe@example.com", "Iniciado", "PRODUCTOS", "Tecnología", 
    "Software", "SOCIO CAPITALISTA", "Descripción del proyecto aquí"
)