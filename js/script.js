
let tareas = [
    { id: 1, descripcion: "Encontrar el One Piece", completado: false },
    { id: 2, descripcion: "Buscar a Zoro", completado: false },
    { id: 3, descripcion: "Cocinar para Luffy", completado: false }
];


const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const tasksList = document.getElementById('tasks-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');


function renderTareas() {

    tasksList.innerHTML = '';


    tareas.forEach((tarea, index) => {
        const fila = document.createElement('tr');


        const colId = document.createElement('td');
        colId.textContent = tarea.id;
        fila.appendChild(colId);


        const colDescripcion = document.createElement('td');
        colDescripcion.textContent = tarea.descripcion;

        if (tarea.completado) {
            colDescripcion.classList.add('completed-task');
        }
        fila.appendChild(colDescripcion);


        const colCompletada = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completado;
        checkbox.addEventListener('change', () => toggleCompletado(tarea.id));
        colCompletada.appendChild(checkbox);
        fila.appendChild(colCompletada);


        const colEliminar = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-task');
        deleteButton.addEventListener('click', () => eliminarTarea(tarea.id));
        colEliminar.appendChild(deleteButton);
        fila.appendChild(colEliminar);


        tasksList.appendChild(fila);
    });


    actualizarContadores();
}


function agregarTarea() {
    const descripcion = taskInput.value.trim();


    if (descripcion === '') {
        alert('Por favor, ingresa la tarea.');
        return;
    }


    const nuevaTarea = {
        id: generarId(),
        descripcion: descripcion,
        completado: false
    };


    tareas.push(nuevaTarea);


    taskInput.value = '';


    renderTareas();
}


function eliminarTarea(id) {

    tareas = tareas.filter(tarea => tarea.id !== id);


    renderTareas();
}


function toggleCompletado(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return { ...tarea, completado: !tarea.completado };
        }
        return tarea;
    });


    renderTareas();
}


function actualizarContadores() {
    totalTasks.textContent = tareas.length;
    const completadas = tareas.filter(tarea => tarea.completado).length;
    completedTasks.textContent = completadas;
}


function generarId() {
    return tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
}

addTaskButton.addEventListener('click', agregarTarea);


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});


document.addEventListener('DOMContentLoaded', renderTareas);