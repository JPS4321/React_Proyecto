variable "aws_region" {
  description = "La región de AWS donde se desplegarán los recursos."
  default     = "us-west-2"
}

variable "aws_access_key" {
  description = "Clave de acceso de AWS."
  type        = string
}

variable "aws_secret_key" {
  description = "Clave secreta de AWS."
  type        = string
}

variable "instance_type" {
  description = "Tipo de instancia para el servidor."
  default     = "t2.micro"
}

variable "ami_id" {
  description = "ID de la Amazon Machine Image (AMI) para las instancias."
  default     = "ami-0c55b159cbfafe1f0"  # Cambia esto a la AMI que prefieras
}

variable "instance_count" {
  description = "Número de instancias a crear."
  default     = 1
}

variable "project_name" {
  description = "Nombre del proyecto para usar en etiquetas."
  default     = "DivinoSeas"
}
