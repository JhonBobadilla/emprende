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
        emprendimiento: "",
        tipoEmprendimiento: "",
        titulo: "",
        opcion: "",
        telefono: "",
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
        "ASESORIA Y CONSULTA": "Asesoría administrativa",
        "PRODUCTOS DIGITALES": "Software, plataformas web",
        "OTROS": "Otros, Otros2"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "pais") {
            setCiudadesDisponibles(ciudadesPorPais[value] || []);
            setFormData({ ...formData, [name]: value, ciudad: "" });
        } else if (name === "edad") {
            const nuevoValor = value.replace(/\D/g, "");
            setFormData({ ...formData, [name]: nuevoValor });
            setErrorEdad(nuevoValor && parseInt(nuevoValor) < 18 ? "Debes ser mayor de edad, si eres menor no puedes inscribirte." : "");
        } else if (name === "tipoEmprendimiento") {
            const titulos = value === "PRODUCTOS" ? Object.keys(productos) : value === "SERVICIOS" ? Object.keys(servicios) : [];
            setTitulosDisponibles(titulos);
            setOpcionesDisponibles([]);
            setFormData({ ...formData, [name]: value, titulo: "", opcion: "" });
        } else if (name === "titulo") {
            const source = formData.tipoEmprendimiento === "PRODUCTOS" ? productos : servicios;
            const opciones = source[value] ? source[value].split(",").map(op => op.trim()) : [];
            setOpcionesDisponibles(opciones);
            setFormData({ ...formData, [name]: value, opcion: "" });
        } else {
            const nuevoValor = (name === "nombres" || name === "apellidos") ? value.toUpperCase() : value;
            setFormData({ ...formData, [name]: nuevoValor });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(formData.edad, 10) < 18) {
            alert("Debes ser mayor de edad, si eres menor no puedes inscribirte.");
            return;
        }
        console.log("Datos del formulario:", formData);
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

            {/* Casilla de Teléfono con Indicativo y Bandera dentro del Input */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                    Teléfono
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
                    <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>
                        {formData.pais && `+${indicativoPais(formData.pais)}`}
                        {codigosBandera[formData.pais] && (
                            <img
                                src={`https://flagcdn.com/w40/${codigosBandera[formData.pais]}.png`}
                                alt={`${formData.pais} flag`}
                                style={{ width: "20px", marginLeft: "5px" }}
                            />
                        )}
                    </span>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        placeholder="Número de teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        style={{ border: "none", outline: "none", flex: "1", padding: "5px" }}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <label>Estado del emprendimiento:</label>
            <select name="emprendimiento" value={formData.emprendimiento} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="AÚN NO INICIO MI EMPRENDIMIENTO">AÚN NO INICIO MI EMPRENDIMIENTO</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES">YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES">YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES</option>
            </select>

            <label>Mi emprendimiento se centra en:</label>
            <select name="tipoEmprendimiento" value={formData.tipoEmprendimiento} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="PRODUCTOS">PRODUCTOS</option>
                <option value="SERVICIOS">SERVICIOS</option>
            </select>

            <label>Título del emprendimiento:</label>
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

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;