vi.mock('../hooks/use-toast', async (importOriginal:()=>Promise<any>) => {
  const mod = await importOriginal();
  return {
    ...mod,
    genId: vi.fn().mockImplementation(() => '1'),
  };
});

import {act, renderHook} from '@testing-library/react';
import {reducer, ToasterToast, useToast} from '../hooks/use-toast';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

vi.useFakeTimers();

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('toast関数とdismiss関数を返すことを確認', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toast).toBeDefined();
    expect(typeof result.current.toast).toBe('function');
    
    expect(result.current.dismiss).toBeDefined();
    expect(typeof result.current.dismiss).toBe('function');
    
    expect(result.current.toasts).toBeDefined();
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it('toast関数が呼ばれたときにトーストが追加されることを確認', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast',
      });
    });
    
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
    expect(result.current.toasts[0].description).toBe('This is a test toast');
    expect(result.current.toasts[0].open).toBe(true);
  });

  it('IDを指定してdismissを呼ぶと特定のトーストが削除されることを確認', () => {
    const { result } = renderHook(() => useToast());
    
    let toastId: string;
    
    act(() => {
      const { id } = result.current.toast({ title: 'Test Toast' });
      toastId = id;
    });
    
    expect(result.current.toasts.length).toBe(1);
    
    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.toasts.length).toBe(0);
  });

  it('IDなしでdismissを呼ぶと全てのトーストが削除されることを確認', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Toast 2');
    
    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.runAllTimers();
    });
    
    expect(result.current.toasts.length).toBe(0);
  });

  it('トーストの更新が正しく行われることを確認', () => {
    const { result } = renderHook(() => useToast());

    
    act(() => {
      result.current.toast({ title: 'Original Title' });
    });
    
    expect(result.current.toasts[0].title).toBe('Original Title');
    
    act(() => {
      result.current.toast({
        title: 'Updated Title'
      });
    });
    
    expect(result.current.toasts[0].title).toBe('Updated Title');
  });

  it('トースト追加時にTOAST_LIMIT制限が適用されることを確認', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
      result.current.toast({ title: 'Toast 3' });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Toast 3');
  });

  it('onOpenChangeコールバックが正しく処理されることを確認', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });
    
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      if (result.current.toasts[0].onOpenChange) {
        result.current.toasts[0].onOpenChange(false);
      }
    });

    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.runAllTimers();
    });
    
    expect(result.current.toasts.length).toBe(0);
  });
});

describe('reducer', () => {
  const TOAST_LIMIT = 1;
  
  it('ADD_TOASTアクションがトーストを追加することを確認', () => {
    const initialState = { toasts: [] };
    const toast = { id: '1', title: 'Test Toast', open: true };
    
    const newState = reducer(initialState, {
      type: 'ADD_TOAST',
      toast,
    });
    
    expect(newState.toasts.length).toBe(1);
    expect(newState.toasts[0]).toEqual(toast);
  });

  it('UPDATE_TOASTアクションがトーストを更新することを確認', () => {
    const initialState = {
      toasts: [{ id: '1', title: 'Original Title', open: true }],
    };
    
    const newState = reducer(initialState, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated Title' },
    });
    
    expect(newState.toasts[0].title).toBe('Updated Title');
    expect(newState.toasts[0].open).toBe(true);
  });

  it('DISMISS_TOASTアクションが特定のトーストを非表示にすることを確認', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };
    
    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });
    
    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(true);
  });

  it('DISMISS_TOASTアクションがすべてのトーストを非表示にすることを確認', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };
    
    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
    });
    
    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(false);
  });

  it('REMOVE_TOASTアクションが特定のトーストを削除することを確認', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };
    
    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });
    
    expect(newState.toasts.length).toBe(1);
    expect(newState.toasts[0].id).toBe('2');
  });

  it('REMOVE_TOASTアクションがすべてのトーストを削除することを確認', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };
    
    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
    });
    
    expect(newState.toasts.length).toBe(0);
  });

  it('TOAST_LIMIT定数を尊重してトースト数を制限することを確認', () => {
    let state = {toasts: [] as ToasterToast[]};
    
    for (let i = 1; i <= 3; i++) {
      state = reducer(state, {
        type: 'ADD_TOAST',
        toast: { id: String(i), title: `Toast ${i}`, open: true },
      });
    }

    expect(state.toasts.length).toBe(TOAST_LIMIT);
  });
  
  it('トーストが適切なopenプロパティとonOpenChangeプロパティで追加されることを確認', () => {
    const initialState = { toasts: [] };
    const onOpenChange = vi.fn();
    const toast = { 
      id: '1', 
      title: 'Test Toast',
      open: true,
      onOpenChange
    };
    
    const newState = reducer(initialState, {
      type: 'ADD_TOAST',
      toast,
    });
    
    expect(newState.toasts[0].open).toBe(true);
    expect(newState.toasts[0].onOpenChange).toBe(onOpenChange);
  });
});
