CREATE USER 'ppc'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON myfc.* TO 'ppc'@'localhost';
FLUSH PRIVILEGES;