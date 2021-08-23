const { values, clone, reject, isNil, mergeDeepRight } = require('ramda');
const { FirebaseDbChild } = require('./firebase');
const removeNull = reject(isNil);

const findById = async (modelName, id) => {
  const modelRef = FirebaseDbChild(modelName);
  const snapshot = await modelRef.child(id).once('value');

  const data = snapshot.val();

  if (data) {
    return { data, message: null };
  } else {
    return {
      data: null,
      message: `No ${modelName} with id: ${id}`,
    };
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
const update = async (modelName, data) => {
  const modelRef = FirebaseDbChild(modelName);
  if (!data.id) {
    return {
      data: null,
      message: `"id" field is unspecified for ${modelName}: ${JSON.stringify(
        data
      )}`,
    };
  }
  const { data: old } = await findById(modelName, data.id);
  console.log({ old, data });
  let updatedData = mergeDeepRight(old, removeNull(data));
  console.log({ updatedData });
  updatedData = populateUpdateFields(updatedData);
  await modelRef.child(data.id).set(updatedData);
  return { data: updatedData, message: null };
};
const forceUpdate = async (modelName, data) => {
  const modelRef = FirebaseDbChild(modelName);
  data = populateUpdateFields(data);
  await modelRef.set(data);
  return { data, message: null };
};

//Force Update and this doesn't need an Id field. It does a plain push to DB
const forceUpdateWithOutTimeUpdate = async (modelName, data) => {
  const modelRef = FirebaseDbChild(modelName);
  await modelRef.set(data);
  return { data, message: null };
};

const populateUpdateFields = (model) => {
  const clonedModel = clone(model);
  clonedModel.updatedAt = Date.now();
  clonedModel.createdAt = clonedModel.createdAt || clonedModel.updatedAt;
  return clonedModel;
};

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
const remove = async (modelName, id) => {
  if (!id) {
    return {
      data: null,
      message: `Id need to specify for the removal operation.`,
    };
  }
  let modelRef = FirebaseDbChild(modelName).child(id);

  const resp = await modelRef.remove();

  return { data: resp, message: null };
};

module.exports = {
  findById,
  findByKeyValues,
  findAll,
  fetch,
  create,
  update,
  forceUpdate,
  forceUpdateWithOutTimeUpdate,
  remove,
};
