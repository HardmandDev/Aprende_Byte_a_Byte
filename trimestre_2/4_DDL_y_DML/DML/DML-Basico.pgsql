-- Crear una función que verifica si un usuario tiene el rol adecuado para ser autor de un curso
CREATE OR REPLACE FUNCTION is_valid_course_author(user_id INT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM "ABB".users WHERE id = user_id AND id_role = 2 -- Solo permitir id_role = 2 (docente)
    );
END;
$$ LANGUAGE plpgsql;

-- Modificar la tabla courses para incluir una restricción CHECK basada en la función
ALTER TABLE "ABB".courses
ADD CONSTRAINT check_author_role
CHECK (is_valid_course_author(id_author)); -- Verificar si el autor tiene el rol adecuado

-- Modificar la tabla lessons para incluir una restricción CHECK basada en la función
ALTER TABLE "ABB".lessons
ADD CONSTRAINT check_author_role_lessons
CHECK (is_valid_course_author(id_author)); -- Verificar si el autor tiene el rol adecuado

----------------------------------------------------------
----------------------------------------------------------

SELECT * FROM "ABB".roles;
-- Agregando los roles:
INSERT INTO "ABB".roles (role) VALUES
  ('estudiante'),
  ('docente'),
  ('soporte');

---------------------------------------------------------
SELECT * FROM "ABB".document_types;
-- Agregando los tipos de documento:
INSERT INTO "ABB".document_types (type) VALUES
  ('cc'),
  ('ti'),
  ('ce'),
  ('ppt'),
  ('pp');

---------------------------------------------------------
SELECT * FROM "ABB".users;
-- Agregando un usuario (el password, está en otra tabla):
INSERT INTO "ABB".users (id_document_type, document, first_name, last_name, email, id_role)
VALUES (2, '1233899642', 'Armando', 'Estudiante', 'AE@gmail.com', 1)
RETURNING *

---------------------------------------------------------
SELECT * FROM "ABB".user_credentials;
-- Agregando password a un ID de usuario correspondiente:
INSERT INTO "ABB".user_credentials (id_user, password)
VALUES (3, 'ClaveEstudiante'),
       (4, 'ClaveSoporte');

---------------------------------------------------------
---------------------------------------------------------
-- Filtrando entre 2 tablas, y solicitando 3 valores de estas:
SELECT first_name, last_name, password 
FROM "ABB".users
INNER JOIN "ABB".user_credentials 
    ON "ABB".users.id = "ABB".user_credentials.id_user
---------------------------------------------------------
---------------------------------------------------------
SELECT * FROM "ABB".levels;
-- Agregando los niveles:
INSERT INTO "ABB".levels (level) VALUES
    ('principiante'),
    ('intermedio'),
    ('avanzado')

---------------------------------------------------------
SELECT * FROM "ABB".courses;
-- Agregando un curso:
INSERT INTO "ABB".courses (id_author, course_name, description, image_url, id_level) 
VALUES (2, 'JavaScript primeros pasos', 'Curso de introducción a la programación web con JavaScript', 'https://image.url/js.png', 1)
RETURNING *

---------------------------------------------------------
SELECT * FROM "ABB".lessons;
-- Agregando una lección a un curso:
INSERT INTO "ABB".lessons (id_course, id_author, lesson_order, lesson_name, content) 
VALUES (1, 2, 2, 'Nombre de la lección 2', 'Contenido de la leccion 2...');

---------------------------------------------------------
SELECT * FROM "ABB".code_editor;
-- Agregando código base por parte del docente:
INSERT INTO "ABB".code_editor (id_user, id_lesson, code)
    VALUES (2, 1, 'Texto base creado por el docente...');

UPDATE "ABB".code_editor
SET id_user = 3, code = 'Valor actualizado por el estudiante...'
WHERE id = 1
RETURNING id_user, code;


--/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
ALTER TABLE "ABB".code_editor
ADD COLUMN code_history text[];

UPDATE "ABB".code_editor
SET code = 'Valor actualizado por el estudiante...',
    code_history = array_append(code_history, 'Texto base creado por el docente...')
WHERE id = 1;

SELECT code_history, code
FROM "ABB".code_editor
WHERE id = 1;

---------------------------------------------------------
SELECT * FROM "ABB".student_progress;
-- Agregando progreso del estudiante:
INSERT INTO "ABB".student_progress (id_user, id_lesson)
VALUES (3, 2)

UPDATE "ABB".student_progress
SET lesson_approved = TRUE
WHERE id = 1

---------------------------------------------------------
SELECT * FROM "ABB".test_results;
-- Agregando un test:
INSERT INTO "ABB".test_results (id_user, id_lesson, code, test)
VALUES (3, 4, 'Código de la prueba realizada por el usuario.', 'Descripción de la prueba.')
RETURNING *;

---------------------------------------------------------
SELECT * FROM "ABB".certifications;
-- Agregando una certificación:
INSERT INTO "ABB".certifications (id_user, id_course, id_student_progress)
VALUES (3, 1, 1)