import { setLocale } from "yup"

setLocale({
  mixed: {
    required(params) {
      return `${params.label} é obrigatório`
    },
  },
  string: {
    email() {
      return "Digite um email válido"
    },
    min(params) {
      return `${params.label} deve ter pelo menos ${params.min} caracteres`
    },
    max(params) {
      return `${params.label} deve ter no máximo ${params.max} caracteres`
    },
  }
})