
CREATE TABLE rol (
                rol_id serial NOT NULL,
                nombre_rol VARCHAR NOT NULL,
                descripcion VARCHAR NOT NULL,
                CONSTRAINT rol_pk PRIMARY KEY (rol_id)
);


CREATE TABLE estilo (
                id_estilo INTEGER NOT NULL,
                nombre_estilo VARCHAR NOT NULL,
                seleccion VARCHAR,
                CONSTRAINT estilo_pk PRIMARY KEY (id_estilo)
);


CREATE TABLE menu (
                id_menu INTEGER NOT NULL,
                nombre_menu VARCHAR NOT NULL,
                CONSTRAINT menu_pk PRIMARY KEY (id_menu)
);


CREATE TABLE subnivel (
                id_subnivel INTEGER NOT NULL,
                nombre_subnivel VARCHAR NOT NULL,
                id_menu INTEGER NOT NULL,
                parent_id_subnivel INTEGER,
                CONSTRAINT subnivel_pk PRIMARY KEY (id_subnivel)
);


CREATE TABLE usuario (
                id_usuario INTEGER NOT NULL,
                correo_usuario VARCHAR NOT NULL,
                nombre_usuario VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                rol_id INTEGER NOT NULL,
                CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);


CREATE TABLE item (
                id_item INTEGER NOT NULL,
                pregunta VARCHAR NOT NULL,
                id_estilo INTEGER NOT NULL,
                CONSTRAINT item_pk PRIMARY KEY (id_item)
);


CREATE TABLE formulario (
                id_formulario INTEGER NOT NULL,
                nombre_formulario VARCHAR NOT NULL,
                id_subnivel INTEGER,
                CONSTRAINT New_Tabl_pk PRIMARY KEY (id_formulario)
);


CREATE TABLE solicitud (
                respuesta JSON NOT NULL,
                fecha DATE NOT NULL,
                hora TIME NOT NULL,
                id_usuario INTEGER NOT NULL,
                id_formulario INTEGER NOT NULL
);


CREATE TABLE formulario_item (
                id_formulario INTEGER NOT NULL,
                id_item INTEGER NOT NULL
);


ALTER TABLE usuario ADD CONSTRAINT tipo_usuario_usuario_fk
FOREIGN KEY (rol_id)
REFERENCES rol (rol_id)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE item ADD CONSTRAINT estilo_fk
FOREIGN KEY (id_estilo)
REFERENCES estilo (id_estilo)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE subnivel ADD CONSTRAINT menu_subnivel_fk
FOREIGN KEY (id_menu)
REFERENCES menu (id_menu)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE New_Tabl ADD CONSTRAINT subnivel_formulario_fk
FOREIGN KEY (id_subnivel)
REFERENCES subnivel (id_subnivel)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE subnivel ADD CONSTRAINT subnivel_subnivel_fk
FOREIGN KEY (parent_id_subnivel)
REFERENCES subnivel (id_subnivel)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE solicitud ADD CONSTRAINT usuario_respuesta_fk
FOREIGN KEY (id_usuario)
REFERENCES usuario (id_usuario)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE formulario_item ADD CONSTRAINT item_formulario_item_fk
FOREIGN KEY (id_item)
REFERENCES item (id_item)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE formulario_item ADD CONSTRAINT formulario_formulario_item_fk
FOREIGN KEY (id_formulario)
REFERENCES formulario (id_formulario)
ON DELETE SET NULL
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE solicitud ADD CONSTRAINT formulario_respuesta_fk
FOREIGN KEY (id_formulario)
REFERENCES formulario (id_formulario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;