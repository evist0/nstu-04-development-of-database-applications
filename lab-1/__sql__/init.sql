create table if not exists deposits
(
    id     serial primary key,

    name   varchar(255) not null,

    term   integer      not null,
    annual decimal      not null
);

create table if not exists clients
(
    id         serial primary key,

    name       varchar(255) not null,
    surname    varchar(255) not null,
    patronymic varchar(255) not null,

    passport   varchar(255) not null unique,

    address    varchar(255) not null,

    phone      varchar(255) not null
);

create table if not exists accounts
(
    id           serial primary key,

    deposit_id   integer not null,
    client_id    integer not null,

    opening_date date    not null,
    closing_date date    not null,

    constraint fk_deposit_id
        foreign key (deposit_id)
            references deposits (id)
            on delete cascade,

    constraint fk_client_id
        foreign key (client_id)
            references clients (id)
            on delete cascade
)