/**
 * Feature: state management powered by zustand & typescript
 * Date: 2023-12-15
 * Author: @markshawn
 */

import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { produce } from "immer"
import { Producer } from "@/types/immer"

export const capitalize = (s: string) => s[0]?.toUpperCase() + s.substring(1)

export type BearSlice<K extends string, V> = {
  [P in K]: V
} & {
  [P in `set${Capitalize<K>}`]: (v: V | Producer<V>) => void
} & {
  [P in `reset${Capitalize<K>}`]: () => void
}

const createBearSlice =
  <K extends string, V>(
    k: K,
    defaultValue: V,
  ): StateCreator<BearSlice<K, V>, [], [], BearSlice<K, V>> =>
  (setState, getState, store) => {
    return {
      [k]: defaultValue,
      [`set${capitalize(k)}`]: (v: V | Producer<V>) => {
        const newState = typeof v === "function" ? produce(getState()[k], v) : v
        setState({ [k]: newState } as Partial<BearSlice<K, V>>)
      },
      [`reset${capitalize(k)}`]: () => {
        setState({ [k]: defaultValue } as Partial<BearSlice<K, V>>)
      },
    } as BearSlice<K, V>
  }

export const createBearStore =
  <V>() =>
  <K extends string>(k: K, defaultValue: V, persistEnabled?: boolean) => {
    const f = (...a: any[]) => ({
      // @ts-ignore
      ...createBearSlice<K, V>(k, defaultValue)(...a),
    })
    return persistEnabled
      ? create<BearSlice<K, V>>()(
          // persist middleware
          persist(f, {
            name: "StarAgent." + k,
            version: 0.4,
            migrate: (persistedState: any, version) => {
              if (version === 0.3) delete persistedState.targetUserId

              if (version === 0.1) delete persistedState.userId

              return persistedState
            },
          }),
        )
      : create<BearSlice<K, V>>()(f)
  }
