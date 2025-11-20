// Simple authentication helper
// In production, use proper JWT authentication

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_token', token)
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_token')
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

export async function checkAuth(): Promise<boolean> {
  const token = getAuthToken()
  if (!token) return false

  // In production, verify token with backend
  return true
}

