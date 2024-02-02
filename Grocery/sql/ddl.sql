use grocery;

create table users (
	id int primary key auto_increment,
	name varchar(255) not null,
	email varchar(255) not null,
	phone varchar(12) not null,
	password varchar(255) not null,
	created_on timestamp default now(),
	updated_on timestamp default current_timestamp on update current_timestamp
);

create table contact (
	id int primary key auto_increment,
	name varchar(255) not null,
	email varchar(255) not null,
	phone varchar(12),
	subject varchar(255),
	message text(5000) not null,
	created_on datetime default now()
);


create table products (
	p_id int auto_increment primary key,
	name varchar(255) not null,
	description text,
	category varchar(255),
	quantity int,
	price int,
	created_at timestamp default now(),
	updated_at timestamp default current_timestamp on update current_timestamp
);

create table customers_details (
	id int primary key,
	address varchar(255),
	city varchar(255),
	postal_code int(8),
	country varchar(255),
	foreign key (id) references users(id)
)


create table orders(
	id int primary key auto_increment,
	user_id int,
	address varchar(255),
	total_price int,
	created timestamp default now(),
	updated timestamp default current_timestamp on update current_timestamp
	FOREIGN KEY (user_id) REFERENCES users(id)
)

create table orders_details (
	id int primary key auto_increment,
	order_id int not null,
	product_id int not null,
	quantity int not null,
	total_price int not null,	
	foreign key (order_id) references orders(id),
	foreign key (product_id) references products(p_id)
)

drop table users;
drop table contact;
drop table products;
drop table customers_details;
drop table orders;
drop table orders_details;


alter table products 
add deleted BOOLEAN DEFAULT FALSE CHECK (deleted IN (0, 1));

alter table products
add image longblob not null;

alter table products
drop column image;