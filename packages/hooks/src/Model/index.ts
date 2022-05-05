import { useState, useMemo, useCallback, useEffect } from 'react';
import { IIterateType, IModelListener } from './interface';
import { deepClone } from '@b1/utils';

class Model<StateType, ActionType> {
  state: StateType;
  action: ActionType;
  listenerList: IModelListener[];

  constructor(state: StateType, action: ActionType) {
    this.state = state;
    this.listenerList = [];
    Object.assign(this, state);
    Object.assign(this, action);
  }

  set<T extends IIterateType>(newPartialState: T) {
    Object.assign(this, { ...newPartialState });
    Object.assign(this.state, { ...newPartialState });
    this.listenerList.forEach(listener => {
      listener({ ...this.state, ...newPartialState });
    });
  }

  addListener(fn: IModelListener) {
    if (this.listenerList.includes(fn)) {
      return;
    }

    this.listenerList.push(fn);
  }

  removeListener(fn: IModelListener) {
    this.listenerList = this.listenerList.filter(listener => listener !== fn);
  }
}

function instantiateModelHook<T>(config: T) {
  const clonedConfig = deepClone(config);
  const state: any = {};
  const action: any = {};

  Object.entries(clonedConfig).forEach(item => {
    const [key, val] = item;
    const isFunc = typeof val === 'function';

    if (isFunc) {
      action[key] = val;
    } else {
      state[key] = val;
    }
  });

  type StateType = typeof state;
  type ActionType = typeof action;

  const model = new Model<StateType, ActionType>(deepClone(state), action);

  const Hook = (initState: StateType, { isLocal = false } = {}) => {
    const [modelState, setState] = useState({ ...initState });

    const set = useCallback(
      newPartialState => {
        if (isLocal) {
          setState({ ...modelState, ...newPartialState });
        } else {
          type partialStateType = typeof newPartialState;
          model.set<partialStateType>(newPartialState);
        }
      },
      [isLocal, modelState]
    );

    useEffect(() => {
      if (!isLocal) {
        model.addListener(setState);
      }

      return () => {
        if (!isLocal) {
          model.removeListener(setState);
        }
      };
    }, [isLocal]);

    return {
      ...modelState,
      ...action,
      set
    };
  };

  return {
    model,
    hook: Hook,
    config,
    originState: state
  };
}

const modelMapByName: any = {};

function initModel<T>(modelConfigMapByName: T) {
  Object.entries(modelConfigMapByName).forEach(item => {
    const [key, val] = item;
    type ModelConfigType = typeof val;
    modelMapByName[key] = instantiateModelHook<ModelConfigType>(val);
  });
}

function useModel(modelName: string) {
  const modelData = modelMapByName[modelName];

  if (modelData) {
    return modelData.hook(modelData.model.state);
  }

  throw Error(`Model ${modelName} is not exist.`);
}

function useLocalModel(modelName: string, initState?: any) {
  const modelData = modelMapByName[modelName];
  const state = useMemo(() => deepClone({ ...modelData.originState, ...initState }), []);

  if (modelData) {
    return modelData.hook(state, {
      isLocal: true
    });
  }

  throw Error(`Model ${modelName} is not exist.`);
}

function createModelHook(
  myModelName: string,
  modelName: string
  // initState: any,
) {
  const modelData = modelMapByName[modelName];

  if (!modelData) {
    throw Error(`Model ${modelName} is not exist.`);
  }

  if (modelMapByName[myModelName]) {
    throw Error(`Model ${myModelName} is already exist.`);
  }

  modelMapByName[myModelName] = instantiateModelHook(modelData.config);
}

function getModel(modelName: string) {
  const modelData = modelMapByName[modelName];

  if (modelData) {
    return modelData.model;
  }

  throw Error(`Model ${modelName} is not exist.`);
}

export default {
  initModel,
  useModel,
  useLocalModel,
  createModelHook,
  getModel
};
