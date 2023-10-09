# Auto-generated by 'happy infra'. Do not edit
# Make improvements in happy, so that everyone can benefit.
output "dashboard" {
  sensitive = false
  value     = module.stack.dashboard
}
output "service_ecrs" {
  sensitive = false
  value     = module.stack.service_ecrs
}
output "service_endpoints" {
  description = "The URL endpoints for services"
  sensitive   = false
  value       = module.stack.service_endpoints
}
output "task_arns" {
  description = "ARNs for all the tasks"
  sensitive   = false
  value       = module.stack.task_arns
}
