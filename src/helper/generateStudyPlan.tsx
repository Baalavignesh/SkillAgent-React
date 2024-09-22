let CreateStudyPlanDBJson = (rawPlan: CreateStudyPlan[], dbData: any, introduction:string) => {
  let finalPlan: CreateStudyPlan[] = rawPlan;
  finalPlan.map((plan: any) => {
    plan["tasks"] = plan["tasks"].map((task: string, index: number) => {
      return {
        [index]: task,
        isDone: false,
      };
    });
  });

  let finalJson = {
    email: dbData.email,
    title: dbData.title,
    plan: finalPlan,
    introduction: introduction
  };

  return finalJson;
};

export default CreateStudyPlanDBJson;
