import * as Blockly from 'blockly';

export const jsonGenerator = new Blockly.Generator('JSON');

jsonGenerator['input_object'] = function (block) {
  const textValue = jsonGenerator.statementToCode(block, 'NAME');
  let statement = jsonGenerator.statementToCode(block, 'VALUE').trimStart();
  let code = `${textValue.trimStart()}`;

  if (statement.startsWith('{') || statement.startsWith('[')) {
    code = code + `: ${statement}`;
  } else {
    code = code + `: ${statement}`;
  }

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['input_object_directly'] = function (block) {
  const textValue = block.getFieldValue('NAME');
  const value = block.getFieldValue('VALUE');
  let code = `"${textValue}": "${value}"`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['input_id_directly'] = function (block) {
  const textValue = block.getFieldValue('ID');
  let code = `"ID": "${textValue}"`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['input_id'] = function (block) {
  const textValue = jsonGenerator.statementToCode(block, 'ID').trimStart();
  let code = `"ID": ${textValue}`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['text'] = function (block) {
  const textValue = block.getFieldValue('inputText');
  let code = `${textValue}`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['userInput'] = function (block) {
  let code = `userInput`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ',\n' + jsonGenerator.blockToCode(nextBlock);
  }
  //

  return code;
};

jsonGenerator['object'] = function (block) {
  const statement_members = jsonGenerator.statementToCode(block, 'object');
  const code = '{\n' + statement_members + '\n}';
  return code;
};

jsonGenerator['array'] = function (block) {
  const statement_members = jsonGenerator.statementToCode(block, 'array');
  const code = '[\n' + statement_members + '\n]';
  return code;
};

jsonGenerator['action_setValue'] = function (block) {
  let controlType = JSON.parse(block.getFieldValue('controlType'));
  let stepValue = block.getFieldValue('STEP');
  let controlValue = jsonGenerator.statementToCode(block, 'controlValue').trimStart();
  if (controlValue == ""){
    controlValue = "userInput";
  }
  let hintValue = block.getFieldValue('hint');
  let code = "";

  // Top block will add "["
  const previousBlock = block.previousConnection && block.previousConnection.targetBlock();
  if(!previousBlock){
    code = code + `[`;
  }

  code = code + `{
    "order": ${stepValue},
    "action": "setValue",
    "element": {
      "id": "${controlType._id}",
      "controlType": "${controlType.controlType}",
      "type": "${controlType.type}",
      "value": "${controlType.value}",
      "label": "${controlType.label}",
      "parent": null
    },
    "params": {"value" : "${controlValue}"},
    "hint": "${hintValue}"
}`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ",\n" + jsonGenerator.blockToCode(nextBlock);
  }
  else{
    code = code + `]`; // Bottom block will add "]"
  }
  //

  return code;
};

jsonGenerator['action_click'] = function (block) {
  const controlType = JSON.parse(block.getFieldValue('controlType'));
  const stepValue = block.getFieldValue('STEP');
  const hintValue = block.getFieldValue('Hint');
  let code = "";

  // Top block will add "["
  const previousBlock = block.previousConnection && block.previousConnection.targetBlock();
  if(!previousBlock){
    code = code + `[`;
  }

  code = `{
    "order": ${stepValue},
    "action": "click",
    "element": {
      "id": ${controlType._id},
      "controlType": ${controlType.controlType},
      "type": ${controlType.type},
      "value": ${controlType.value},
      "label": ${controlType.label},
      "parent": ${controlType.parent || null}
    },
    "hint": "${hintValue}"
}`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ",\n" + jsonGenerator.blockToCode(nextBlock);
  }
  else{
    code = code + `]`; // Bottom block will add "]"
  }
  //

  return code;
};

jsonGenerator['action_launch'] = function (block) {
  const URL = block.getFieldValue('URL');
  const stepValue = block.getFieldValue('STEP');
  const hintValue = block.getFieldValue('Hint');
  let code = "";

  // Top block will add "["
  const previousBlock = block.previousConnection && block.previousConnection.targetBlock();
  if(!previousBlock){
    code = code + `[`;
  }
  
  code = `{
    "order": ${stepValue},
    "action": "launch",
    "params": {
      "value": "${URL}"
    },
    "hint": "${hintValue}"
}`;

  // Copy this one for all block have connection
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code = code + ",\n" + jsonGenerator.blockToCode(nextBlock);
  }
  else{
    code = code + `]`; // Bottom block will add "]"
  }
  //

  return code;
};