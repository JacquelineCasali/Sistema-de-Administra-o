export function formatCPF(cpf) {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "") // Remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}