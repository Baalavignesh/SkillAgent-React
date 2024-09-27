let CreateInstruction = (skillInfo: ISkillInfo) => {
  let instruction = `"Hey, You are a personal ${skillInfo.title} tutor. I would like to learn about ${skillInfo.what} in around ${skillInfo.duration}. 
  Right now my current skill level is  ${skillInfo.level}. 
  You should help me in learning this. I will learn and get back to you to show my progress on this skill"`;
  return instruction;
};

let generateDailyInitial = (objective: string[], tasks: string[]) => {
  let allObjective = objective.join(",");
  let allTasks: string = "";
  tasks.forEach((task, index) => {
    allTasks += index + 1 + "." + task[index];
  });

  let instruction = `Today's 3 objective are ${allObjective}. Start by teaching me the 1st objective. 
  When I want you to proceed with the next objective I will say "Next Objective", only then teach me the next objective. 
  When you are done with all 3 objectives kindly ask me to practice the tasks and say today's class is done. 
  Now start with 1st objective by saying "Hi, your today's objective is"...and proceed. The three tasks are ${allTasks}`;
  return instruction;
};

export { CreateInstruction, generateDailyInitial };
