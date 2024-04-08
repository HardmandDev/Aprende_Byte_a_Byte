-- Tabla de roles: Almacena los roles disponibles para los usuarios.
CREATE TABLE "ABB".roles (
  id SERIAL PRIMARY KEY, -- Identificador único del rol.
  role VARCHAR CHECK (role IN ('estudiante', 'docente', 'soporte')), -- Nombre del rol.
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del rol.
);

-- Tabla de permisos de roles: Define los permisos asociados a cada rol.
CREATE TABLE "ABB".role_permissions (
  id SERIAL PRIMARY KEY, -- Identificador único del permiso.
  id_role INT REFERENCES "ABB".roles(id), -- Rol al que se asigna el permiso.
  action text, -- Acción permitida por el permiso.
  constraint unique_role_action unique (id_role, action) -- Restricción para evitar duplicados.
);

-- Tabla de tipos de documentos: Almacena los tipos de documentos disponibles.
CREATE TABLE "ABB".document_types (
  id SERIAL PRIMARY KEY, -- Identificador único del tipo de documento.
  type VARCHAR(5) CHECK (type IN ('cc', 'ti', 'ce', 'ppt', 'pp')) -- Nombre del tipo de documento.
);

-- Tabla de credenciales de usuario: Almacena las credenciales de acceso de los usuarios.
CREATE TABLE "ABB".user_credentials (
  id SERIAL PRIMARY KEY, -- Identificador único de la credencial.
  id_user INT REFERENCES "ABB".users(id), -- Usuario al que pertenece la credencial.
  password VARCHAR(255) NOT NULL, -- Contraseña encriptada.
  CONSTRAINT unique_user_credential UNIQUE (id_user) -- Restricción para una sola credencial por usuario.
);

-- Tabla de usuarios: Almacena la información de los usuarios.
CREATE TABLE "ABB".users (
  id SERIAL PRIMARY KEY, -- Identificador único del usuario.
  id_document_type INT REFERENCES "ABB".document_types(id), -- Tipo de documento del usuario.
  document VARCHAR(20), -- Número de documento del usuario.
  first_name VARCHAR(100), -- Nombre del usuario.
  last_name VARCHAR(100), -- Apellido del usuario.
  email VARCHAR(100) UNIQUE, -- Correo electrónico único del usuario.
  id_role INT REFERENCES "ABB".roles(id) DEFAULT (1), -- Rol asignado al usuario por defecto.
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del usuario.
  CONSTRAINT unique_document_per_type UNIQUE (id_document_type, document) -- Restricción para un documento único por tipo.
);

--------------------------------------------------------------------------

-- Tabla de niveles de curso: Almacena los niveles de dificultad de los cursos.
CREATE TABLE "ABB".levels (
  id SERIAL PRIMARY KEY, -- Identificador único del nivel.
  level VARCHAR(15) CHECK (level IN ('principiante', 'intermedio', 'avanzado')) -- Nombre del nivel.
);

-- Tabla de cursos: Almacena la información de los cursos disponibles.
CREATE TABLE "ABB".courses (
    id SERIAL PRIMARY KEY, -- Identificador único del curso.
    id_author INT REFERENCES "ABB".users(id), -- Autor del curso.
    course_name VARCHAR(255), -- Nombre del curso
    description TEXT, -- Descripción del curso.
    image_url VARCHAR(255), -- URL de la imagen del curso.
    id_level INT REFERENCES "ABB".levels(id), -- Nivel de dificultad del curso.
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del curso.
);

-- Tabla de lecciones: Almacena la información de las lecciones de los cursos.
CREATE TABLE "ABB".lessons (
  id SERIAL PRIMARY KEY, -- Identificador único de la lección.
  id_course INT REFERENCES "ABB".courses(id), -- Curso al que pertenece la lección.
  id_author INT REFERENCES "ABB".users(id), -- Autor de la lección.
  lesson_order FLOAT UNIQUE, -- Orden de la lección dentro del curso.
  lesson_name VARCHAR(255), -- Nombre de la lección.
  content TEXT, -- Contenido de la lección.
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación de la lección.
);

-- Tabla de editores de código: Almacena el código escrito por los usuarios en cada lección.
CREATE TABLE "ABB".code_editor (
  id SERIAL PRIMARY KEY, -- Identificador único del editor.
  id_user INT REFERENCES "ABB".users(id), -- Usuario que utiliza el editor.
  id_lesson INT REFERENCES "ABB".lessons(id), -- Lección a la que pertenece el editor.
  code TEXT, -- Código escrito por el usuario.
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del editor.
  CONSTRAINT unique_code_editor UNIQUE (id_user, id_lesson) -- Restricción para un único editor por usuario y lección.
);

-- Tabla de resultados de pruebas: Almacena los resultados de las pruebas realizadas por los usuarios en cada lección.
CREATE TABLE "ABB".test_results (
  id SERIAL PRIMARY KEY, -- Identificador único del resultado de prueba.
  id_user INT REFERENCES "ABB".users(id), -- Usuario que realiza la prueba.
  id_lesson INT REFERENCES "ABB".lessons(id), -- Lección en la que se realiza la prueba.
  code TEXT, -- Código de la prueba realizada por el usuario.
  test VARCHAR(255), -- Descripción de la prueba.
  test_result BOOLEAN, -- Resultado de la prueba (aprobada o reprobada).
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro del resultado de prueba.
  CONSTRAINT unique_test_result UNIQUE (id_user, id_lesson) -- Restricción para un único resultado de prueba por usuario y lección.
);

--------------------------------------------------------------------------

-- Tabla de progreso de estudiantes: Almacena el progreso de los estudiantes en cada lección.
CREATE TABLE "ABB".student_progress (
    id SERIAL PRIMARY KEY, -- Identificador único del progreso.
    id_user INT REFERENCES "ABB".users(id), -- Usuario que avanza en la lección.
    id_lesson INT REFERENCES "ABB".lessons(id), -- Lección en la que avanza el usuario.
    lesson_approved BOOLEAN DEFAULT FALSE, -- Estado de aprobación de la lección por parte del estudiante.
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro del progreso.
    CONSTRAINT unique_course_progress UNIQUE (id_user, id_lesson) -- Restricción para un único registro de progreso por usuario y lección.
);

-- Tabla de certificaciones: Almacena las certificaciones obtenidas por los usuarios en cada curso.
CREATE TABLE "ABB".certifications (
    id SERIAL PRIMARY KEY, -- Identificador único de la certificación.
    id_user INT REFERENCES "ABB".users(id), -- Usuario que obtiene la certificación.
    id_course INT REFERENCES "ABB".courses(id), -- Curso en el que se obtiene la certificación.
    id_student_progress INT REFERENCES "ABB".student_progress(id), -- Progreso del estudiante asociado a la certificación.
    certification_url VARCHAR(255) DEFAULT NULL, -- URL de la certificación.
    certificate_obtained BOOLEAN DEFAULT FALSE, -- Estado de obtención de la certificación.
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de obtención de la certificación.
    CONSTRAINT unique_certificate UNIQUE (id_user, id_course) -- Restricción para una única certificación por usuario y curso.
);