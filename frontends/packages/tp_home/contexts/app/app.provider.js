import { useCreateContext } from '../create-context';
import React, { useReducer } from 'react';
import { reducer, initialState } from './app.reducer';
import { AppContext } from './app.context';


const [state, useDispatch, provider] = useCreateContext(initialState, reducer);
export const useStickyState = state;
export const useStickyDispatch = useDispatch;
export const StickyProvider = provider;
