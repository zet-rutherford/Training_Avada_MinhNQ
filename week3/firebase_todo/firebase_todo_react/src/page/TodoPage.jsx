import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import axios from "axios";
import CreateModal from "../components/CreateModal";
import { Page } from "@shopify/polaris";
import useFetch from "../hooks/fetchTodo";

export default function TodoPage() {
  const API_URL = `http://127.0.0.1:5000/api/todos`;
  const [active, setActive] = useState(false);
  const {
    data: listTodo,
    setData: setListTodo,
    // refreshData,
  } = useFetch(API_URL);

  const onActive = () => {
    setActive(true);
  };

  const onClose = () => {
    setActive(false);
  };

  useEffect(() => {
    // console.log("listTodo:", listTodo);
  }, [listTodo]);

  // console.log(selectedItems);

  const create = async (data) => {
    try {
      if (!data.task) {
        return;
      }
      const res = await axios.post(API_URL, data);
      if (res.data.success === true) {
        setListTodo((prev) => [res.data.todo, ...prev]);
        // console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async (id) => {
    try {
      await axios.put(API_URL + `/${id}`);
      // refreshData();
      setListTodo((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isCompleted: true };
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async (id) => {
    try {
      const res = await axios.delete(API_URL + `/${id}`);
      if (res.data.success) {
        const todos = listTodo.filter((item) => item.id !== id);
        setListTodo(todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelected = async (data) => {
    try {
      const res = await axios.post(API_URL + "/update", data);
      if (res.data.success === true) {
        // setListTodo(res.data.data);
        // console.log(data.selected);
        const selectedItems = data.selected;
        setListTodo((prev) =>
          prev.map((item) => {
            if (selectedItems.includes(item.id)) {
              return { ...item, isCompleted: true };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelected = async (data) => {
    try {
      const res = await axios.post(API_URL + "/remove", data);
      if (res.data.success === true) {
        console.log(res);
        const selectedItems = data.selected;
        setListTodo((prev) =>
          prev.filter((item) => !selectedItems.includes(item.id))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Page
        title="Todos"
        primaryAction={{
          content: "Create",
          onAction: () => onActive(),
        }}
      >
        <TodoList
          listTodo={listTodo}
          complete={complete}
          destroy={destroy}
          updateSelected={updateSelected}
          deleteSelected={deleteSelected}
        />
        <CreateModal open={active} create={create} onClose={onClose} />
      </Page>
    </>
  );
}
