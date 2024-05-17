provider "google" {
  project = "poke-app-back"
  region  = "us-central1"
  zone    = "us-central1-c"
}

# Generate SSH key pair
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "ssh_public_key" {
  content  = tls_private_key.ssh_key.public_key_openssh
  directory_permission = "0700"
  file_permission = "0600"
  filename = "/Users/agustinallamanocosta/.ssh/poke/id_rsa.pub"
}

resource "local_file" "ssh_private_key" {
  content  = tls_private_key.ssh_key.private_key_openssh
  directory_permission = "0700"
  file_permission = "0600"
  filename = "/Users/agustinallamanocosta/.ssh/poke/id_rsa"
}

resource "google_compute_instance" "vm_instance" {
  name          = "poke-terraform-instance"
  machine_type  = "e2-micro"
  tags          = ["poke-terraform-instance"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.self_link
    access_config {
    }
  }

  metadata = {
    ssh-keys="agustinallamanocosta:${file("${local_file.ssh_public_key.filename}")}"
  }

  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
    sudo groupadd docker
    sudo usermod -aG docker $USER
    sudo newgrp docker
  EOF

}

resource "google_compute_firewall" "vpc_network" {
  name    = "terraform-firewall-api"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["8080","22"]
  }
  target_tags = ["poke-terraform-instance"]
  source_ranges = ["0.0.0.0/0"]
  source_tags = ["api"]
}


resource "google_compute_firewall" "ssh-rule" {
  name = "terraform-firewall-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports=["22"]
  }
  target_tags = ["poke-terraform-instance"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_network" "vpc_network" {
  name                    = "terraform-network"
  auto_create_subnetworks = "true"
}
