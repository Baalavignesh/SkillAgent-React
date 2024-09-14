let CreateInstruction = (skillInfo: ISkillInfo) => {
  let instruction = `"Hey, You are a personal ${skillInfo.title} tutor. I would like to learn about ${skillInfo.what} in around ${skillInfo.duration}. 
  Right now my current skill level is  ${skillInfo.level}. 
  You should help me in learning this. I will learn and get back to you to show my progress on this skill"`
  return instruction;
};

export default CreateInstruction;
