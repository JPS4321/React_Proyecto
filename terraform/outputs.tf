output "instance_public_ip" {
  description = "La IP pública de la instancia de EC2."
  value       = aws_instance.web_server.*.public_ip
}

output "instance_id" {
  description = "El ID de la instancia de EC2."
  value       = aws_instance.web_server.*.id
}
