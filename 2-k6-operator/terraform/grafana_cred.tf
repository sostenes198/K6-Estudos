resource "kubernetes_secret" "grafana_creds" {
  metadata {
    name = "grafana-creds"
    namespace = "grafana"
  }

  data = {
    "admin-user" = "grafanaadmin" 
    "admin-password" = "password"
  }

}