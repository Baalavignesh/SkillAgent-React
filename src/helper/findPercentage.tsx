let findPercentage = (myPlan: Plan[]) => {
  let percentage: number = 0;
  let totalTask: number = 0;
  let isDone: number = 0;

  myPlan.forEach((day: Plan, index: number) => {
    myPlan[index].tasks.forEach((task: Task) => {
      totalTask += 1;
      if (task.isDone) {
        isDone = isDone + 1;
      }
    });
  });

  percentage = Math.floor((isDone / totalTask)* 100) ;
  return percentage;
};

export default findPercentage;
