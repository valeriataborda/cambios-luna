// API'S
const URL_API = 'http://localhost:4500/api/v1/created';
const TOAST = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(TOAST);
const TOAST_ERROR = document.getElementById('liveToastError');
const toastBootstrapError = bootstrap.Toast.getOrCreateInstance(TOAST_ERROR);

// constructora
const TRADE_NAME = document.getElementById('nombre-comercial');
const BUSINESS_NAME = document.getElementById('razon-social');
const NIT = document.getElementById('nit');
const BTN_CREATE_CONSTRUCTOR = document.getElementById('create-constructora');


function viewToast(error) {
    if (error) {
        toastBootstrapError.show();
    } else {
        toastBootstrap.show();
    }
}

function sendNewConstructora() {
    BTN_CREATE_CONSTRUCTOR.disabled = true;
    BTN_CREATE_CONSTRUCTOR.classList.replace('btn-primary', 'btn-secondary');
    BTN_CREATE_CONSTRUCTOR.textContent = 'Enviando...';

    const data = {
        NOMBRE_COMERCIAL: TRADE_NAME.value,
        RAZON_SOCIAL: BUSINESS_NAME.value,
        NIT_CONSTRUCTORA: NIT.value
    }

    fetch(`${URL_API}/constructora`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        viewToast(data.error);
    })
    .catch(err => {
        console.error(err);
        toastBootstrapError.show();
    })
    .finally(() => {
        BTN_CREATE_CONSTRUCTOR.disabled = false;
        BTN_CREATE_CONSTRUCTOR.classList.replace('btn-secondary', 'btn-primary');
        BTN_CREATE_CONSTRUCTOR.textContent = 'Crear Constructora';
    });
}
BTN_CREATE_CONSTRUCTOR.addEventListener('click', sendNewConstructora);

// proyectos
const GET_CONSTRUCTORA = document.getElementById('get-constructora');
const PROJECT_NAME = document.getElementById('nombre-proyecto');
const PROJECT_LOCATION = document.getElementById('ubicacion');
const PROJECT_ADDRESS = document.getElementById('direccion');
const BTN_CREATE_PROJECT = document.getElementById('create-proyect');

function createSelectConstructoras() {
    fetch(`${URL_API}/constructoras`)
        .then(res => res.json())
        .then(resData => {
            resData.data.data.forEach(constructora => {
                const option = document.createElement('option');
                option.textContent = constructora.NOMBRE_COMERCIAL;
                option.value = constructora.ID_CONSTRUCTORA;
                GET_CONSTRUCTORA.appendChild(option);
            });
        })
}
createSelectConstructoras();

function sendNewProject() {
    BTN_CREATE_PROJECT.disabled = true;
    BTN_CREATE_PROJECT.classList.replace('btn-primary', 'btn-secondary');
    BTN_CREATE_PROJECT.textContent = 'Enviando...';

    const data = {
        ID_CONSTRUCTORA: GET_CONSTRUCTORA.value,
        NOMBRE_PROYECTO: PROJECT_NAME.value,
        UBICACION_PROYECTO: PROJECT_LOCATION.value,
        DIRECCION_PROYECTO: PROJECT_ADDRESS.value
    }

    fetch(`${URL_API}/proyecto`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        viewToast(data.error);
    })
    .catch(err => {
        console.error(err);
        toastBootstrapError.show();
    })
    .finally(() => {
        BTN_CREATE_PROJECT.disabled = false;
        BTN_CREATE_PROJECT.classList.replace('btn-secondary', 'btn-primary');
        BTN_CREATE_PROJECT.textContent = 'Crear Proyecto';
    });
}
BTN_CREATE_PROJECT.addEventListener('click', sendNewProject);

// Tracking
const GET_PROJECT_TRACK = document.getElementById('get-proyecto-tracking');
const IMAGE_TRACKING = document.getElementById('image-tracking');
const OBSERVATION = document.getElementById('observation');
const BTN_CREATE_TRACKING = document.getElementById('create-tracking');

function createSelectProjects() {
    fetch(`${URL_API}/proyectos`)
        .then(res => res.json())
        .then(resData => {
            resData.data.data.forEach(project => {
                const option = document.createElement('option');
                option.textContent = project.NOMBRE_PROYECTO;
                option.value = project.ID_PROYECTO;

                GET_PROJECT_TRACK.appendChild(option);
            });
        })
}
createSelectProjects();

function sendNewTracking() {
    BTN_CREATE_TRACKING.disabled = true;
    BTN_CREATE_TRACKING.classList.replace('btn-primary', 'btn-secondary');
    BTN_CREATE_TRACKING.textContent = 'Enviando...';

    const data = {
        ID_PROYECTO: GET_PROJECT_TRACK.value,
        IMAGEN_TRACKING: IMAGE_TRACKING.value,
        OBSERVACION_TRACKING: OBSERVATION.value
    }

    fetch(`${URL_API}/tracking`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        viewToast(data.error);
    })
    .catch(err => {
        console.error(err);
        toastBootstrapError.show();
    })
    .finally(() => {
        BTN_CREATE_TRACKING.disabled = false;
        BTN_CREATE_TRACKING.classList.replace('btn-secondary', 'btn-primary');
        BTN_CREATE_TRACKING.textContent = 'Crear Tracking';
    });
}

// apartament
const GET_COMPRADOR = document.getElementById('get-comprador');
const GET_PROYECTO_APART = document.getElementById('get-proyecto-apartamento');
const TAMANO = document.getElementById('tamaño');
const PISO = document.getElementById('piso');
const TIPO_APARTAMENTO = document.getElementById('type-apartament');
const PRICE = document.getElementById('precio');
const BTN_CREATE_APARTAMENT = document.getElementById('create-apartament');

function createSelectProjectsApart() {
    fetch(`${URL_API}/proyectos`)
        .then(res => res.json())
        .then(resData => {
            resData.data.data.forEach(project => {
                const option = document.createElement('option');
                option.textContent = project.NOMBRE_PROYECTO;
                option.value = project.ID_PROYECTO;

                GET_PROYECTO_APART.appendChild(option);
            });
        })
}
createSelectProjectsApart();

function createSelectBuyers() {
    fetch(`${URL_API}/users`)
        .then(res => res.json())
        .then(resData => {
            resData.data.data.forEach(buyer => {
                const option = document.createElement('option');
                option.textContent = buyer.NOMBRE_COMPLETO;
                option.value = buyer.ID_USUARIO;

                GET_COMPRADOR.appendChild(option);
            });
        })
}
createSelectBuyers();

function sendNewApartament() {
    BTN_CREATE_APARTAMENT.disabled = true;
    BTN_CREATE_APARTAMENT.classList.replace('btn-primary', 'btn-secondary');
    BTN_CREATE_APARTAMENT.textContent = 'Enviando...';

    const data = {
        ID_COMPRADOR: GET_COMPRADOR.value,
        ID_PROYECTO: GET_PROYECTO_APART.value,
        METRAJE_APARTAMENTO: TAMANO.value,
        PISO_APARTAMENTO: PISO.value,
        TIPO_APARTAMENTO: TIPO_APARTAMENTO.value,
        PRECIO_APARTAMENTO: PRICE.value
    }

    fetch(`${URL_API}/apartamento`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        viewToast(data.error);
    })
    .catch(err => {
        console.error(err);
        toastBootstrapError.show();
    })
    .finally(() => {
        BTN_CREATE_APARTAMENT.disabled = false;
        BTN_CREATE_APARTAMENT.classList.replace('btn-secondary', 'btn-primary');
        BTN_CREATE_APARTAMENT.textContent = 'Crear Apartamento';
    });
}

// venta
const ASESOR = document.getElementById('get-asesor');
const APARTAMENTO_VENTA = document.getElementById('get-apartamento-venta');
const BTN_CREATE_VENTA = document.getElementById('create-venta');

// ROLES
const NOMBRE_ROL = document.getElementById('nombre-rol');
const DEESCRIPCION_ROL = document.getElementById('descripcion-rol');
const BTN_CREATE_ROL = document.getElementById('create-rol');

// cartera
const TOTAL_PRICE = document.getElementById('total-price');
const ABONO_ACTUAL = document.getElementById('abono-actual');
const CUOTAS_ACORDADAS = document.getElementById('cuotas-acordadas');
const BTN_CREATE_PORTFOLIO = document.getElementById('create-portfolio');

// cuotas
const GET_CARTERA = document.getElementById('get-cartera');
const VALOR_ABONO = document.getElementById('valor-abono');
const FECHA_ABONO = document.getElementById('fecha-abono');
const BTN_CREATE_SHARE = document.getElementById('create-share');