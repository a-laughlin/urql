import { ReactNode } from 'react';
import { DocumentNode } from 'graphql';
import { OperationResult } from '../types';
import { useMutation, UseMutationState } from '../hooks';

export interface MutationProps<T, V> {
  query: DocumentNode | string;
  children: (arg: MutationState<T, V>) => ReactNode;
}

export interface MutationState<T, V> extends UseMutationState<T> {
  executeMutation: (variables?: V) => Promise<OperationResult<T>>;
}

export function Mutation<T = any, V = any>({
  children,
  query,
}: MutationProps<T, V>): ReactNode {
  const [state, executeMutation] = useMutation<T, V>(query);
  return children({ ...state, executeMutation });
}