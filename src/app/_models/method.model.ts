export interface DocMethodParam {
  name: string;
  type: string;
  description: string;
}

export interface DocMethodReturn {
  type: string;
  description?: string;
}

export interface DocMethod {
  name: string[];
  description: string;
  params?: DocMethodParam[];
  return: DocMethodReturn;
}
