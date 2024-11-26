export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se o número de telefone é uma string contendo apenas dígitos.
 */
export const isValidTelefone = (telefone: string): boolean => {
  // Verifica se a string contém apenas números
  return /^\d+$/.test(telefone);
};

export const isValidNome = (nome: string): boolean => {
  return nome.length >= 3;
};