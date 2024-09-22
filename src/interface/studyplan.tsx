interface CreateStudyPlan {
  day: string;
  topic: string;
  objectives: string[];
  tasks: string[];
}

interface Task {
  [key: string]: string | boolean;
  isDone: boolean;
}

interface Plan {
  day: string;
  topic: string;
  objectives: string[];
  tasks: Task[];
}

interface LearningPlan {
  introduction: string;
  title: string;
  email: string;
  plan: Plan[];
}
