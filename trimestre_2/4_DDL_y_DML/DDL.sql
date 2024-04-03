CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    hashed_password VARCHAR(255),
    role VARCHAR(20) CHECK (role IN ('estudiante', 'docente', 'soporte')),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    level VARCHAR(20) CHECK (
      level IN ('principiante', 'intermedio', 'avanzado')
    ),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    id_course INT REFERENCES courses (id),
    title VARCHAR(100),
    content TEXT,
    lesson_order INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE student_progress (
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES users (id),
    id_course INT REFERENCES courses (id),
    id_lesson INT REFERENCES lessons (id),
    certificate_obtained BOOLEAN DEFAULT FALSE
  );

CREATE TABLE code_editor (
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES users (id),
    id_course INT REFERENCES courses (id),
    id_lesson INT REFERENCES lessons (id),
    code TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES users (id),
    id_course INT REFERENCES courses (id),
    id_lesson INT REFERENCES lessons (id),
    test_name VARCHAR(255),
    test_description VARCHAR(255),
    test_result VARCHAR(20),
    test_code_url VARCHAR(255)
  );


alter table users rename column name to first_name;

alter table users add column last_name varchar(256)