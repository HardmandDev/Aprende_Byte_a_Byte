select * from users

insert into users (first_name,email) values ('Adriana Cecilia','ceciliarodriguez@gmai.com')

insert into users (first_name,email,hashed_password,role,last_name) values ('Aime','Betanco@hotmail.com','43ad12344a13','estudiante','Betancourt')

update users set hashed_password = 'a4d3398714a56', role = 'estudiante',last_name = 'Rodríguez Pedraza' where id = 32

update users set last_name = 'Velazquez Triana' where id > 0 and first_name ='Armando Velasquez'

update users set email = 'harryseveruspotterevans@outlook.com' where id > 0 and first_name ='Harry'
update users set first_name = 'Valentina' where id > 0 and first_name ='Valentina Mancera'
update users set last_name = 'Mancera' where id > 0 and first_name ='Valentina'