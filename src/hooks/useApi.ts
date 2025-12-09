/**
 * Custom hooks for API data fetching
 * Provides loading states, error handling, and caching
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  showErrorToast?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = [],
  options: UseApiOptions = {}
) {
  const {
    immediate = true,
    onSuccess,
    onError,
    showErrorToast = true
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiCall();
      setState({
        data: result,
        loading: false,
        error: null
      });
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });

      if (showErrorToast) {
        toast.error(errorMessage);
      }

      if (onError) {
        onError(errorMessage);
      }

      throw error;
    }
  }, [apiCall, onSuccess, onError, showErrorToast]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    ...state,
    execute,
    refetch
  };
}

// Mutation hook for POST, PUT, DELETE operations
export function useMutation<T, P = any>(
  mutationFn: (params: P) => Promise<T>,
  options: UseApiOptions = {}
) {
  const {
    onSuccess,
    onError,
    showErrorToast = true
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const mutate = useCallback(async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await mutationFn(params);
      setState({
        data: result,
        loading: false,
        error: null
      });

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });

      if (showErrorToast) {
        toast.error(errorMessage);
      }

      if (onError) {
        onError(errorMessage);
      }

      throw error;
    }
  }, [mutationFn, onSuccess, onError, showErrorToast]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    mutate,
    reset
  };
}