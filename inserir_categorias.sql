-- Inserir categorias básicas
INSERT INTO CATEGORIAS_PRODUTOS (NOME_CATEGORIA_PROD) VALUES
('Vestidos'),
('Saias'),
('Blusas'),
('Calças'),
('Outros'),
('Acessórios'),
('Sapatos'),
('Bolsas'),
('Jaquetas'),
('Shorts');

-- Inserir alguns produtos de exemplo
INSERT INTO PRODUTOS (ID_USUARIO, NOME_PROD, PRECO_PRODUTO, TIPO, TAMANHO, COR_PRODUTO, CONDICAO, OUTROS) VALUES
(1, 'Vestido Floral Vintage', 89.90, 'Vestido', 'M', 'Azul', 'usado', 'Vestido lindo com estampa floral'),
(1, 'Saia Midi Plissada', 45.50, 'Saia', 'P', 'Preto', 'semi-novo', 'Saia elegante para ocasiões especiais'),
(1, 'Blusa de Seda', 65.00, 'Blusa', 'G', 'Branco', 'novo', 'Blusa delicada de seda natural'),
(1, 'Calça Jeans Skinny', 55.90, 'Calça', 'M', 'Azul', 'usado', 'Calça jeans confortável'),
(1, 'Bolsa de Couro', 120.00, 'Acessório', 'U', 'Marrom', 'semi-novo', 'Bolsa de couro legítimo');

-- Associar produtos às categorias
INSERT INTO PRODUTOS_CATEGORIAS (ID_PROD, ID_CATEGORIA_PROD) VALUES
(1, 1), -- Vestido -> Vestidos
(2, 2), -- Saia -> Saias  
(3, 3), -- Blusa -> Blusas
(4, 4), -- Calça -> Calças
(5, 6); -- Bolsa -> Acessórios