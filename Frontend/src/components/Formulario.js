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
        descripcionProyecto: "",
        tipoEmprendimiento: "",
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
        "ALIMENTOS Y BEBIDAS": "Aceites, vinagres y condimentos, Alimentos deshidratados y enlatados, Alimentos frescos (frutas/verduras), Alimentos vegetarianos veganos gourmet y orgánicos, Alimentos precocinados y/o congelados, Bebidas alcohólicas, Bebidas energéticas, Bebidas isotónicas, Café té y mate, Cereales y granos, Chocolates dulces y postres, Restaurante (cualquier tipo), Harinas y mezclas, Helados y postres, Miel y derivados, Panadería y repostería, Pastas y arroces, Productos lácteos, Snacks y botanas",
        "MODA Y ACCESORIOS": "Accesorios para cabello, Bisutería, Bolsos y carteras, Calzado, Cinturones, Gafas de sol, Gorros y sombreros, Joyería Lencería, Moda infantil, Moda masculina, Moda femenina, Relojes, Ropa de baño, Ropa deportiva, Ropa interior, Ropa para bebés, Ropa de trabajo, Almacén o fábrica de ropa (cualquier tipo)",
        "HOGAR Y JARDÍN": "Aire acondicionado, Alfombras y tapetes, Artículos de baño, Calefacción, Cortinas y persianas, Decoración navideña, Electrodomésticos, Iluminación, Jardinería, Productos de limpieza del hogar, Muebles de exterior, Organizadores, Paisajismo, Plantas artificiales, Productos de lavandería, Sistemas de riego, Textiles para hogar, Utensilios de cocina, Cualquier tipo de producto de esta categoría.",
        "TECNOLOGÍA Y ELECTRÓNICA": "Accesorios de audio, Cámaras de seguridad, Drones, Electrónica para automóviles, Equipos de redes, GPS y navegación, Impresoras 3D, Realidad virtual, Smartwatches, Tarjetas de memoria, Cualquier tipo de producto de esta categoría",
        "DEPORTES Y AIRE LIBRE": "Artículos deportivos",
        "AUTOMOTRIZ Y TRANSPORTE": "Accesorios para vehículos",
        "INDUSTRIA Y CONSTRUCCIÓN": "Publicidad, Estampados, Materiales Cualquier tipo de producto de esta categoría",
        "SALUD Y BELLEZA": "Artículos de salud y belleza, Cualquier tipo de producto de esta categoría",
        "INFANTIL": "Artículos infantiles, Cualquier tipo de producto de esta categoría",
        "MASCOTAS": "Aseo para mascotas, Artículos para mascotas, Alimento para mascotas, Ropa para mascotas, Cualquier tipo de producto de esta categoría",
        "OFICINA": "Artículos de oficina",
        "ARTE": "Artículos para arte",
        "SEGURIDAD": "Artículos de seguridad",
        "EVENTOS Y CELEBRACIONES": "Artículos para eventos y celebraciones",
        "PRODUCTOS ESPECIALIZADOS": "Artículos religiosos, Cualquier tipo de producto de esta categoría",
        "PRODUCTOS PARA ADULTOS": "Cualquier tipo de producto de esta categoría",
        "OTROS ARTÍCULOS": "Otros artículos"
    };

    const servicios = {
        "ASESORIA Y CONSULTA": "Consultoría empresarial, Asesoría financiera, Asesoría legal, Asesoría o Coaching personal y profesional, Consultoría en marketing, Asesoría de las ingenierías, Cualquier otro servicio de esta categoría",
        "SALUD Y BIENESTAR": "Servicios médicos, Terapias alternativas (acupuntura, masajes), Psicología y consejería, Nutrición y dietética, Servicios de yoga y meditación, Cualquier otro servicio de esta categoría",
        "EDUCACIÓN": "Tutorías académicas, Cursos en línea, Capacitación profesional, Enseñanza de idiomas, Asesoramiento educativo, Cualquier otro servicio de esta categoría",
        "TECNOLOGÍA Y DIGITAL": "Desarrollo de software, Diseño web, Servicios de ciberseguridad, Optimización SEO, Creación de contenido digital, Cualquier otro servicio de esta categoría",
        "MARKETING Y PUBLICIDAD": "Gestión de redes sociales, Diseño gráfico, Producción audiovisual, Estrategias publicitarias, Análisis de mercado, Cualquier otro servicio de esta categoría",
        "LOGÍSTICA Y TRANSPORTE": "Transporte de carga, Servicios de mensajería, Almacenamiento y distribución, Mudanzas, Transporte turístico, Cualquier otro servicio de esta categoría",
        "TURISMO Y HOSPITALIDAD": "Guías turísticas, Servicios hoteleros, Organización de eventos, Restauración y catering, Reservas de viajes, Cualquier otro servicio de esta categoría",
        "HOGAR Y MANTENIMIENTO": "Reparaciones domésticas, Limpieza profesional, Jardinería y paisajismo, Mantenimiento de electrodomésticos, Servicios de plomería y electricidad, Cualquier otro servicio de esta categoría",
        "ARTE Y ENTRETENIMIENTO": "Producción musical, Fotografía y videografía, Organización de espectáculos, Servicios de escritura creativa, Artes visuales y diseño, Cualquier otro servicio de esta categoría",
        "OTROS SERVICIOS": "Servicios de mascotas (cuidado, entrenamiento), Servicios funerarios, Servicios especializados (por ejemplo, traducción), Servicios de alquiler (vehículos, equipos), Cualquier otro servicio de esta categoría",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        console.log(`🛠 Campo cambiado: ${name}, Nuevo valor: ${value}`);
    
        setFormData((prevFormData) => {
            let nuevoEstado = { ...prevFormData, [name]: value.trim() }; // 🔹 Evitamos espacios innecesarios
    
            // Actualización especial para ciertos campos
            if (name === "pais") {
                nuevoEstado = { ...nuevoEstado, ciudad: "", pais: value };
                setCiudadesDisponibles(ciudadesPorPais[value] || []);
            } else if (name === "edad") {
                const edadValida = value.replace(/\D/g, ""); 
                nuevoEstado = { ...nuevoEstado, edad: edadValida };
                setErrorEdad(edadValida && parseInt(edadValida) < 18 ? "Debes ser mayor de edad, si eres menor no puedes inscribirte." : "");
            } else if (name === "tipoEmprendimiento") {
                const titulos = value === "PRODUCTOS" ? Object.keys(productos) : value === "SERVICIOS" ? Object.keys(servicios) : [];
                nuevoEstado = { ...nuevoEstado, tipoEmprendimiento: value, titulo: "", opcion: "" };
                setTitulosDisponibles(titulos);
                setOpcionesDisponibles([]);
            } else if (name === "titulo") {
                const source = prevFormData.tipoEmprendimiento === "PRODUCTOS" ? productos : servicios;
                const opciones = source[value] ? source[value].split(",").map(op => op.trim()) : [];
                nuevoEstado = { ...nuevoEstado, titulo: value, opcion: "" };
                setOpcionesDisponibles(opciones);
            } else if (name === "correo_electronico") {
                nuevoEstado = { ...nuevoEstado, correo_electronico: value.trim() };
            } else if (name === "descripcionProyecto") {
                nuevoEstado = { ...nuevoEstado, descripcionProyecto: value.trim() };
            } else if (name === "estado_emprendimiento") {
                nuevoEstado = { ...nuevoEstado, estado_emprendimiento: value.trim() };
            }
    
            return nuevoEstado;
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Función para obtener el token CSRF
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
    
        // Validación de datos
        console.log("Datos enviados antes de validación:", formData);
        const edad = parseInt(formData.edad, 10);
        console.log("Edad convertida a número:", edad);
    
        // Validación básica
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
        
        // Validación para emprendimientos iniciados
        if (formData.estado_emprendimiento !== "AÚN NO INICIO MI EMPRENDIMIENTO" && (
            !formData.tipoEmprendimiento.trim() ||
            !formData.titulo.trim() ||
            !formData.opcion.trim()
        )) {
            alert("Para emprendimientos ya iniciados, debes completar toda la información sobre tu negocio.");
            return;
        }
    
        console.log("Datos enviados al backend:", JSON.stringify(formData));
    
        try {
            console.log("Datos enviados al backendddddddddddddddddddddddddd:", formData);
            const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
    
            // Manejo mejorado de la respuesta
            const responseData = await response.text();
            
            try {
                const jsonData = JSON.parse(responseData);
                if (!response.ok) {
                    throw new Error(jsonData.message || "Error en el servidor");
                }
                alert("Formulario enviado con éxito: " + JSON.stringify(jsonData));
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
                    <select name="tipoEmprendimiento" value={formData.tipoEmprendimiento} onChange={handleChange} required>
                        <option value="">Selecciona una opción</option>
                        <option value="PRODUCTOS">PRODUCTOS</option>
                        <option value="SERVICIOS">SERVICIOS</option>
                    </select>

                    <label>Categoría:</label>
                    <select name="titulo" value={formData.titulo} onChange={handleChange} required>
                        {formData.tipoEmprendimiento === ""
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
                id="descripcionProyecto"
                name="descripcionProyecto"
                placeholder="Describe brevemente el proyecto que tienes o quisieras unirte (máximo 800 caracteres)"
                maxLength={800}
                value={formData.descripcionProyecto}
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