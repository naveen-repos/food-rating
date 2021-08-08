const { values, clone } = require('ramda');
const { FirebaseDbChild } = require('./firebase');

const findById = async (modelName, id) => {
  const modelRef = FirebaseDbChild(modelName);
  
  const snapshot = await modelRef.child(id).once('value');
  const data = snapshot.val();
  if (data) {
    return { data, message: null };
  } else {
    return { data: null, message: `No ${modelName} with id: ${id}` };
  }
};

const findByKeyValues = async (modelName, filter) => {
  const modelRef = FirebaseDbChild(modelName)
    .orderByChild(filter.key)
    .equalTo(filter.value);

  const snapshot = await modelRef.once('value');
  const data = snapshot.val();

  return { data: values(data), message: null };
};

const findAll = async (modelName) => {
  const modelRef = FirebaseDbChild(modelName);
  const snapshot = await modelRef.once('value');
  const data = snapshot.val();
  return { data: values(data), message: null };
};

const populateCreateFields = (model) => {
  const cloneModel = clone(model);

  cloneModel.createdAt = cloneModel.createdAt || Date.now();
  cloneModel.updatedAt = cloneModel.createdAt;

  return cloneModel;
};

// const populateUpdateFields = (model) => {
//   const clonedModel = clone(model);

//   clonedModel.updatedAt = Date.now();

//   clonedModel.createdAt = clonedModel.createdAt || clonedModel.updatedAt;

//   return clonedModel;
// };

const create = async (modelName, data) => {
  const modelRef = FirebaseDbChild(modelName);

  if (!data.id) {
    data.id = modelRef.push().key;
  }

  data = populateCreateFields(data);

  await modelRef.child(data.id).set(data);

  return { data, message: null };
};

const fetch = async (modelName) => {
  let modelRef = FirebaseDbChild(modelName);
  const snapshot = await modelRef.once('value');
  const data = snapshot.val() || {};
  if (data) return { data, message: null };
  return { data: null, message: 'No data exist on this model name ' };
};

module.exports = {
  findById,
  findByKeyValues,
  findAll,
  fetch,
  create,
};
