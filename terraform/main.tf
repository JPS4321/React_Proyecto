resource "aws_instance" "web_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  count         = var.instance_count

  tags = {
    Name = "${var.project_name}-web-server"
  }

  # Configuración de red (opcional)
  network_interface {
    device_index         = 0
    subnet_id            = "subnet-12345678"  # Cambia a tu subnet ID
    associate_public_ip_address = true
  }

  # User data script para inicializar la instancia
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "Bienvenido a DivinoSeas!" > /var/www/html/index.html
              EOF
}
