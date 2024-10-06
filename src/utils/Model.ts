// Task
export interface addTask {
  name: string;
  startTime: Date;
  endTime: Date;
  details: string;
  status: string;
  tags: string[];
}

export interface updateTask {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  details: string;
  status: string;
  tags: string[];
}

// Tags
export interface addTag {
  name: string;
  color: string;
}