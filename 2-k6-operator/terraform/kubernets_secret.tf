resource "kubernetes_secret" "influxdb_creds" {
  metadata {
    name = "influxdb-creds"
    namespace = "influxdb"
  }

  data = {
    "INFLUXDB_USER_PASSWORD" = "password"
    "INFLUXDB_WRITE_USER_PASSWORD" = "password"
    "INFLUXDB_READ_USER_PASSWORD" = "password"
    "INFLUXDB_ADMIN_PASSWORD" = "password"
  }

}