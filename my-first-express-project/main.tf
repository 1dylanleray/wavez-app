provider "aws" {
  region     = "us-east-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Remplacez par une AMI valide dans votre région
  instance_type = "t2.micro"
  key_name      = "myKey" # Nom de la clé SSH

  tags = {
    Name = "WebServer"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y nginx",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/myKey.pem")
      host        = self.public_ip
    }
  }
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}
