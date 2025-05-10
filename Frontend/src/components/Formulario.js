import React, { useState } from "react";

// Función para obtener el indicativo según el país seleccionado
const indicativoPais = (pais) => {
    const codigosPorPais = {
        COLOMBIA: "57",
        ARGENTINA: "54",
        BRASIL: "55",
        MÉXICO: "52",
        CHILE: "56",
        PERÚ: "51",
        PANAMÁ: "507",
    };
    return codigosPorPais[pais] || "";
};

// Función para obtener el código de bandera correcto
const codigosBandera = {
    COLOMBIA: "co",
    ARGENTINA: "ar",
    BRASIL: "br",
    MÉXICO: "mx",
    CHILE: "cl",
    PERÚ: "pe",
    PANAMÁ: "pa",
};

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        pais: "",
        ciudad: "",
        sexo: "",
        edad: "",
        telefono: "",
        correo_electronico: "",
        estado_emprendimiento: "",
        rol: "",
        descripcion: "",
        tipoemprendimiento: "",
        titulo: "",
        opcion: ""
    });

    const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
    const [errorEdad, setErrorEdad] = useState("");
    const [titulosDisponibles, setTitulosDisponibles] = useState([]);
    const [opcionesDisponibles, setOpcionesDisponibles] = useState([]);

    const ciudadesPorPais = {
        COLOMBIA: [
            "Arauca", "Armenia", "Barranquilla", "Bogotá D.C.", "Bucaramanga",
            "Cali", "Cartagena", "Cúcuta", "Florencia", "Ibagué", "Inírida",
            "Leticia", "Manizales", "Medellín", "Mitú", "Mocoa", "Montería",
            "Neiva", "Pasto", "Pereira", "Popayán", "Puerto Carreño", "Quibdó",
            "Riohacha", "San Andrés", "San José del Guaviare", "Santa Marta",
            "Sincelejo", "Tunja", "Valledupar", "Villavicencio", "Yopal"
        ],
        ARGENTINA: [
            "Buenos Aires", "Córdoba", "Corrientes", "Formosa", "La Rioja",
            "Mendoza", "Neuquén", "Paraná", "Posadas", "Rawson", "Resistencia",
            "Río Gallegos", "Salta", "San Fernando del Valle de Catamarca",
            "San Juan", "San Luis", "San Miguel de Tucumán", "San Salvador de Jujuy",
            "Santa Fe", "Santa Rosa", "Santiago del Estero", "Ushuaia", "Viedma"
        ],
        BRASIL: [
            "Aracaju", "Belém", "Belo Horizonte", "Boa Vista", "Brasília",
            "Campo Grande", "Cuiabá", "Curitiba", "Florianópolis", "Fortaleza",
            "Goiânia", "João Pessoa", "Macapá", "Maceió", "Manaus", "Natal",
            "Palmas", "Porto Alegre", "Porto Velho", "Recife", "Rio Branco",
            "Rio de Janeiro", "Salvador", "São Luís", "São Paulo", "Teresina",
            "Vitória"
        ],
        MÉXICO: [
            "Aguascalientes", "Campeche", "Chihuahua", "Ciudad de México", "Culiacán",
            "Durango", "Guadalajara", "Hermosillo", "La Paz", "León", "Mérida",
            "Mexicali", "Monterrey", "Morelia", "Oaxaca", "Puebla", "Querétaro",
            "Saltillo", "San Luis Potosí", "Tepic", "Tlaxcala", "Toluca",
            "Tuxtla Gutiérrez", "Veracruz", "Villahermosa", "Zacatecas"
        ],
        CHILE: [
            "Antofagasta", "Arica", "Castro", "Copiapó", "Concepción", "Iquique",
            "La Serena", "Puerto Montt", "Punta Arenas", "Rancagua", "Santiago",
            "Talca", "Valdivia", "Valparaíso"
        ],
        PERÚ: [
            "Arequipa", "Ayacucho", "Bagua", "Callao", "Cusco", "Huancayo",
            "Huaraz", "Ica", "Iquitos", "Juliaca", "Lima", "Moyobamba",
            "Pucallpa", "Piura", "Puno", "Trujillo", "Tumbes", "Tarapoto",
            "Tacna", "Chimbote"
        ],
        PANAMÁ: [
            "Bocas del Toro", "Chiriquí", "Coclé", "Colón", "Darién",
            "Herrera", "Los Santos", "Panamá", "Veraguas"
        ]
    };

    const productos = {
        "AGRICULTURA Y OTROS": "Productos de agricultura, Otros",
        "ALIMENTOS Y BEBIDAS": "Alimentos, Bebidas",
        "ARTE": "Cualquier tipo de producto de esta categoría",
        "AUTOMOTRIZ": "Cualquier tipo de producto de esta categoría",
        "BIENESTAR": "Productos para eventos, Productos para celebraciones, Otros Productos de bienestar",
        "CONSTRUCCIÓN": "Cualquier tipo de producto de esta categoría",
        "DEPORTES": "Cualquier tipo de producto de esta categoría",
        "ELECTRÓNICA": "Productos de Electrónica",
        "HOGAR Y DECORACIÓN": "Productos para el hogar, Productos de decoración",
        "INDUSTRIA": "Cualquier tipo de producto de esta categoría",
        "INFANTIL": "Cualquier tipo de producto de esta categoría",
        "LIBROS E IMPRESOS": "Libros, Otros",
        "LIMPIEZA": "Productos de limpieza",
        "MASCOTAS": "Comida para mascotas, Accesorios para mascotas",
        "MODA Y ACCESORIOS": "Productos textiles, Accesorios",
        "MUSICALES": "Instrumentos musicales, Accesorios",
        "OFICINA": "Cualquier tipo de producto de esta categoría",
        "PAPELERÍA Y EDUCATIVOS": "Productos de Papelería, Productos Educativos",
        "PRODUCTOS PARA ADULTOS": "Cualquier tipo de producto de esta categoría",
        "PRODUCTOS RELIGIOSOS": "Cualquier tipo de producto de esta categoría",
        "SALUD Y BELLEZA": "Productos para la salud, Productos de belleza",
        "TECNOLOGÍA": "Software, Hardware, Otros productos de tecnología",
        "OTROS PRODUCTOS": "Otros Productos no clasificados"
    };
    
    const servicios = {
        "ALQUILER": "Servicios de alquiler",
        "AMBIENTALES Y AGRICULTURA": "Servicios ambientales, Servicios de agricultura",
        "ARTE Y ENTRETENIMIENTO": "Servicios de arte, Servicios de entretenimiento",
        "ASESORIA Y CONSULTA": "Asesorias, Consultas",
        "EDUCACIÓN": "Servicios educativos",
        "GASTRONOMÍA": "Servicios gastronómicos",
        "HOGAR (EMPRESA) Y MANTENIMIENTO": "Limpieza, Otros Servicios para el hogar y empresas, Servicios de mantenimiento en general",
        "INDUSTRIALES": "Servicios industriales",
        "INMOBILIARIOS": "Servicios inmobiliarios",
        "LOGÍSTICA Y TRANSPORTE": "Servicios de logística, Servicios de transporte",
        "MARKETING Y PUBLICIDAD": "Servicios de marketing, Servicios de publicidad",
        "MASCOTAS": "Servicios para mascotas",
        "REPARACIONES Y MANTENIMIENTO": "Servicios de reparaciones, Servicios de mantenimiento",
        "SALUD Y BIENESTAR": "Servicios para la salud, Srvicios de bienestar",
        "SEGURIDAD": "Servicios de seguridad",
        "SERVICIO PROFESIONAL": "Servicios profesionales",
        "TECNOLOGÍA Y DIGITAL": "Servicios de y para software",
        "TURISMO": "Servicios de turismo",
        "VENTAS Y COMERCIO": "Servicios de ventas, Servicios de comercio",
        "OTROS SERVICIOS": "Otros servicios no clasificados"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        console.log(`🛠 Campo cambiado: ${name}, Nuevo valor: ${value}`);
    
        setFormData((prevFormData) => {
            let nuevoEstado = { ...prevFormData, [name]: value.trim() };
    
            // 🔁 Actualización especial por campo
            if (name === "pais") {
                nuevoEstado = { ...nuevoEstado, ciudad: "", pais: value };
                setCiudadesDisponibles(ciudadesPorPais[value] || []);
            } else if (name === "edad") {
                const edadValida = value.replace(/\D/g, "");
                nuevoEstado = { ...nuevoEstado, edad: edadValida };
                setErrorEdad(
                    edadValida && parseInt(edadValida) < 18
                        ? "Debes ser mayor de edad, si eres menor no puedes inscribirte."
                        : ""
                );
            } else if (name === "tipoemprendimiento") {
                const titulos =
                    value === "PRODUCTOS"
                        ? Object.keys(productos)
                        : value === "SERVICIOS"
                        ? Object.keys(servicios)
                        : [];
                nuevoEstado = { ...nuevoEstado, tipoemprendimiento: value, titulo: "", opcion: "" };
                setTitulosDisponibles(titulos);
                setOpcionesDisponibles([]);
            } else if (name === "titulo") {
                const source = prevFormData.tipoemprendimiento === "PRODUCTOS" ? productos : servicios;
                const opciones = source[value] ? source[value].split(",").map(op => op.trim()) : [];
                nuevoEstado = { ...nuevoEstado, titulo: value, opcion: "" };
                setOpcionesDisponibles(opciones);
            } else if (name === "correo_electronico") {
                nuevoEstado = { ...nuevoEstado, correo_electronico: value.trim() };
            } else if (name === "descripcion") {
                nuevoEstado = { ...nuevoEstado, descripcionProyecto: value.trim() };
            } else if (name === "estado_emprendimiento") {
                if (value === "AÚN NO INICIO MI EMPRENDIMIENTO") {
                    nuevoEstado = {
                        ...nuevoEstado,
                        estado_emprendimiento: value.trim(),
                        tipoemprendimiento: "",
                        titulo: "",
                        opcion: ""
                    };
                    setTitulosDisponibles([]);
                    setOpcionesDisponibles([]);
                } else {
                    nuevoEstado = { ...nuevoEstado, estado_emprendimiento: value.trim() };
                }
            }
    
            return nuevoEstado;
        });
    };
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
    
        const edad = parseInt(formData.edad, 10);
    
        if (
            !formData.nombres.trim() ||
            !formData.apellidos.trim() ||
            !formData.pais.trim() || 
            !formData.ciudad.trim() || 
            !formData.sexo.trim() || 
            !formData.edad.trim() ||
            isNaN(edad) ||
            edad < 18 ||
            !formData.correo_electronico.trim() || 
            !formData.estado_emprendimiento.trim() || 
            !formData.rol.trim() ||
            !formData.descripcionProyecto.trim()
        ) {
            alert("Todos los campos son obligatorios y debes ser mayor de 18 años.");
            return;
        }
    
        if (formData.estado_emprendimiento !== "AÚN NO INICIO MI EMPRENDIMIENTO" && (
            !formData.tipoemprendimiento.trim() ||
            !formData.titulo.trim() ||
            !formData.opcion.trim()
        )) {
            alert("Completa la información del negocio.");
            return;
        }
    
        const telefonoCompleto = `+${indicativoPais(formData.pais)}${formData.telefono.replace(/\D/g, "")}`;
        const datosAEnviar = {
            ...formData,
            telefono: telefonoCompleto,
            tipoemprendimiento: formData.tipoemprendimiento.trim()
        };
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: "include",
                body: JSON.stringify(datosAEnviar)
            });
    
            const responseData = await response.text();
    
            try {
                const jsonData = JSON.parse(responseData);
                if (!response.ok) {
                    throw new Error(jsonData.message || "Error en el servidor");
                }
                alert("✅ Tu formulario fue enviado exitosamente.");

            } catch (e) {
                console.error("El servidor devolvió:", responseData);
                throw new Error("La respuesta no es JSON válido: " + responseData.substring(0, 100));
            }
        } catch (error) {
            console.error("Error completo:", error);
            alert("Error: " + error.message);
        }
    };
    
    
    
    
    return (
        <form onSubmit={handleSubmit}>
            <label>País:</label>
            <select name="pais" value={formData.pais} onChange={handleChange} required>
                <option value="">Selecciona un país</option>
                {Object.keys(ciudadesPorPais).map((pais) => (
                    <option key={pais} value={pais}>{pais}</option>
                ))}
            </select>

            <label>Ciudad:</label>
            <select name="ciudad" value={formData.ciudad} onChange={handleChange} required>
                <option value="">Selecciona una ciudad</option>
                {ciudadesDisponibles.map((ciudad, idx) => (
                    <option key={idx} value={ciudad}>{ciudad}</option>
                ))}
            </select>

            <label>Nombres:</label>
            <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />

            <label>Apellidos:</label>
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />

            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="FEMENINO">FEMENINO</option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="OTRO">OTRO</option>
            </select>

            <label>Edad:</label>
            <input type="text" name="edad" value={formData.edad} onChange={handleChange} required />
            {errorEdad && <p style={{ color: "red" }}>{errorEdad}</p>}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                    Teléfono
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid black", borderRadius: "3px", width: "40%" }}>
                    <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>
                        {formData.pais && `+${indicativoPais(formData.pais)}`}
                        {codigosBandera[formData.pais] && (
                            <img
                                src={`https://flagcdn.com/w40/${codigosBandera[formData.pais]}.png`}
                                alt={`${formData.pais} flag`}
                                style={{ width: "20px", height: "15px", marginLeft: "5px" }}
                            />
                        )}
                    </span>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        placeholder="Número de teléfono"
                        style={{ border: "none", outline: "none", flex: "1", paddingLeft: "10px" }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo_electronico">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="correo_electronico"
                    name="correo_electronico"
                    value={formData.correo_electronico}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            
            <label>Estado del emprendimiento:</label>
            <select name="estado_emprendimiento" value={formData.estado_emprendimiento} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="AÚN NO INICIO MI EMPRENDIMIENTO">AÚN NO INICIO MI EMPRENDIMIENTO</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES">YA INICIÉ PERO AÚN NO GENERO UTILIDADES</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES">YA INICIÉ Y YA GENERO UTILIDADES</option>
            </select>

            {/* Mostrar casillas condicionalmente */}
            {formData.estado_emprendimiento && formData.estado_emprendimiento !== "AÚN NO INICIO MI EMPRENDIMIENTO" && (
                <>
                    <label>Mi emprendimiento se centra en:</label>
                    <select name="tipoemprendimiento" value={formData.tipoemprendimiento} onChange={handleChange} required>
                        <option value="">Selecciona una opción</option>
                        <option value="PRODUCTOS">PRODUCTOS</option>
                        <option value="SERVICIOS">SERVICIOS</option>
                    </select>

                    <label>Categoría:</label>
                    <select name="titulo" value={formData.titulo} onChange={handleChange} required>
                        {formData.tipoemprendimiento === ""
                            ? <option value="">Debes escoger primero una opción de la casilla anterior</option>
                            : <>
                                <option value="">Selecciona un título</option>
                                {titulosDisponibles.map((titulo, idx) => (
                                    <option key={idx} value={titulo}>{titulo}</option>
                                ))}
                            </>
                        }
                    </select>

                    <label>Opción específica:</label>
                    <select name="opcion" value={formData.opcion} onChange={handleChange} required>
                        {formData.titulo === ""
                            ? <option value="">Debes escoger primero una opción de la casilla anterior</option>
                            : <>
                                <option value="">Selecciona una opción</option>
                                {opcionesDisponibles.map((opcion, idx) => (
                                    <option key={idx} value={opcion}>{opcion}</option>
                                ))}
                            </>
                        }
                    </select>
                </>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rol">
                    Tu rol en el emprendimiento
                </label>
                <select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Selecciona una opción</option>
                    <option value="SOCIO CAPITALISTA">SOY O SERÉ SOCIO CAPITALISTA</option>
                    <option value="SOCIO TRABAJADOR">SOY O SERÉ SOCIO TRABAJADOR</option>
                    <option value="SOCIO IGUALITARIO (CAPITAL Y TRABAJO)">SOY O SERÉ SOCIO IGUALITARIO (CAPITAL Y TRABAJO)</option>
                </select>
            </div>

            <label>Descripción del proyecto que tienes o quieres:</label>
            <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe brevemente el proyecto que tienes o quisieras unirte (máximo 800 caracteres)"
                maxLength={800}
                value={formData.descripcion}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{ resize: "none", height: "100px", width: "80%" }}
            />

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;
























