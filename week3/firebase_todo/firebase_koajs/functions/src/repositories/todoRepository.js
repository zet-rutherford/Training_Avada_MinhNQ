// const { collection, getDocs } = require("firebase/firestore");

const db = require("../database/db");
const todosRef = db.collection("todos");

/**
 *
 * @returns {Promise<[{id:string, title:string, isCompleted:boolean, createdAt:Date, updatedAt:Date}]>}
 */
const getAll = async () => {
  try {
    const query = await todosRef.orderBy("createdAt", "desc").get();
    const todos = query.docs.map((doc) => {
      const id = doc.id;
      return {
        id,
        ...doc.data(),
      };
    });
    return todos;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param data
 * @returns {Promise<{success:true, todo:{id:string, title:string, isCompleted: boolean, createdAt: Date, updatedAt: Date}}>}
 */
const add = async (data) => {
  try {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.isCompleted = false;
    const res = await todosRef.add(data);
    const todo = await res.get();
    if (todo.data()) {
      return {
        success: true,
        todo: {
          id: res.id,
          ...todo.data(),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async ({ id, data }) => {
  try {
    const todo = await todosRef.doc(id).get();
    data.updatedAt = new Date();
    if (!todo.data()) {
      return false;
    }
    await todosRef.doc(id).update(data);
    return true;
  } catch (error) {
    console.log(error);
  }
};
/**
 *
 * @param {string} id
 * @returns {Promise<boolean>}
 */
const remove = async (id) => {
  try {
    const todo = await todosRef.doc(id).get();
    if (!todo.data()) {
      return false;
    }
    todosRef.doc(id).delete();
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @returns {Promise<boolean>}
 */
const updateSeleted = async (data) => {
  try {
    const selected = data.selected;
    selected.forEach(async (id) => {
      const updatedAt = new Date();
      await todosRef
        .doc(id)
        .update({ isCompleted: data.isCompleted, updatedAt: updatedAt });
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @returns {Promise<boolean>}
 */
const removeSelected = async (data) => {
  try {
    const selected = data.selected;
    console.log(typeof selected);
    selected.forEach(async (id) => {
      await todosRef.doc(id).delete();
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAll,
  add,
  remove,
  update,
  removeSelected,
  updateSeleted,
};
