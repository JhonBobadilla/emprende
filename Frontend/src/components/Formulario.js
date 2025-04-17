import React, { useState } from "react";

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        pais: "",
        ciudad: "",
        sexo: "",
        edad: "",
    });

    const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
    const [errorEdad, setErrorEdad] = useState("");

    // Lista de ciudades por país
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "pais") {
            setCiudadesDisponibles(ciudadesPorPais[value] || []);
            setFormData({ ...formData, [name]: value, ciudad: "" });
        } else if (name === "edad") {
            // Solo acepta números y verifica que sea mayor o igual a 18.
            const nuevoValor = value.replace(/\D/g, "");
            setFormData({ ...formData, [name]: nuevoValor });

            if (nuevoValor && parseInt(nuevoValor, 10) < 18) {
                setErrorEdad("Debes ser mayor de edad, si eres menor no puedes inscribirte.");
            } else {
                setErrorEdad("");
            }
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
            <label htmlFor="pais">País:</label>
            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required>
                <option value="">Selecciona un país</option>
                {Object.keys(ciudadesPorPais).map((pais) => (
                    <option key={pais} value={pais}>{pais}</option>
                ))}
            </select>

            <label htmlFor="ciudad">Ciudad:</label>
            <select id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required>
                <option value="">Selecciona una ciudad</option>
                {ciudadesDisponibles.length > 0 ? (
                    ciudadesDisponibles.map((ciudad, index) => (
                        <option key={index} value={ciudad}>{ciudad}</option>
                    ))
                ) : (
                    <option value="" disabled>Primero selecciona un país</option>
                )}
            </select>

            <label htmlFor="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />

            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />

            <label htmlFor="sexo">Sexo con el que te identificas:</label>
            <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="FEMENINO">FEMENINO</option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="OTRO">OTRO</option>
            </select>

            <label htmlFor="edad">Edad:</label>
            <input type="text" id="edad" name="edad" value={formData.edad} onChange={handleChange} required />
            {errorEdad && <p style={{ color: "red" }}>{errorEdad}</p>}

            <label htmlFor="emprendimiento">Escoge tu estado de emprendimiento actual:</label>
            <select id="emprendimiento" name="emprendimiento" value={formData.emprendimiento} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="AÚN NO INICIO MI EMPRENDIMIENTO">AÚN NO INICIO MI EMPRENDIMIENTO</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES">YA INICIÉ MI EMPRENDIMIENTO PERO AÚN NO GENERO UTILIDADES</option>
                <option value="YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES">YA INICIÉ MI EMPRENDIMIENTO Y YA GENERO UTILIDADES</option>
            </select>

            <label htmlFor="tipoEmprendimiento">Mi emprendimiento se centra en:</label>
            <select id="tipoEmprendimiento" name="tipoEmprendimiento" value={formData.tipoEmprendimiento} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                <option value="PRODUCTOS">PRODUCTOS</option>
                <option value="SERVICIOS">SERVICIOS</option>
            </select>

            

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;