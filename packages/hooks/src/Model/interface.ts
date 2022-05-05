export interface IIterateType {
  (): IterableIterator<any>;
}

export interface IModelListener {
  <T>(state: T): void;
}

export type IModelMapByName<ModelDataType> = Record<string, ModelDataType>;
