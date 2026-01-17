import { useContext } from 'react';
import { AuthContext } from './cognito-provider';
import type { AuthContextType } from '{{PACKAGE_SCOPE}}/common-types';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
