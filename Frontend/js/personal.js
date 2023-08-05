// Función para crear la lista de trabajadores por departamento
function mostrarListaTrabajadores() {
    // Datos de ejemplo: departamentos y trabajadores
    let data = [
        {
            id: 1, departamento: 'Ventas', trabajadores: [
                { nombre: 'Juan Pérez', cedula: '11111111', cargo: 'Vendedor' },
                { nombre: 'María López', cedula: '22222222', cargo: 'Vendedora' },
                { nombre: 'Carlos Gómez', cedula: '33333333', cargo: 'Vendedor' }
            ]
        },
        {
            id: 2, departamento: 'Recursos Humanos', trabajadores: [
                { nombre: 'Laura Martínez', cedula: '44444444', cargo: 'Analista de RRHH' },
                { nombre: 'Ana Rodríguez', cedula: '55555555', cargo: 'Coordinadora de RRHH' }
            ]
        },
        {
            id: 3, departamento: 'Finanzas', trabajadores: [
                { nombre: 'Pedro Sánchez', cedula: '66666666', cargo: 'Contador' },
                { nombre: 'Luisa Ramírez', cedula: '77777777', cargo: 'Analista Financiero' },
                { nombre: 'Elena Torres', cedula: '88888888', cargo: 'Gerente Financiero' }
            ]
        },
        // Puedes agregar más departamentos y trabajadores aquí
    ];

    const listaTrabajadores = document.getElementById('listaTrabajadores');

    data.forEach((depto) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">${depto.departamento}</div>
            <div class="card-body">
                <ul class="list-group">
                ${depto.trabajadores.map((trabajador) => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-muted">${trabajador.cedula}</span>
                        <span class = "ms-2">${trabajador.nombre}</span>
                        <span class = "ms-2 text-muted">${trabajador.cargo}</span>
                    </div>
                    <div>
                        <button class="btn btn-primary btn-sm" onclick="mostrarId(${depto.id})"><img src="css/imagenes/eye-solid.svg" alt="Icono" width="16" height="16"></button>
                    </div>
                    </li>
                `).join('')}
                </ul>
            </div>
    `;
        listaTrabajadores.appendChild(card);
    });
}

// Función que muestra el id del departamento por consola al presionar los botones
function mostrarId(deptoId) {
    console.log(`ID del departamento: ${deptoId}`);
}
