import {
  Text,
  Button,
  ResourceList,
  ResourceItem,
  Badge,
  InlineStack,
} from "@shopify/polaris";
import { useState } from "react";

const TodoList = ({
  listTodo,
  complete,
  destroy,
  updateSelected,
  deleteSelected,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const completeClick = (id) => {
    complete(id);
  };

  const deleteClick = (id) => {
    destroy(id);
  };
  
  const selectedComplete = () => {
    updateSelected({
      selected: selectedItems,
      // isCompleted: true,
    });
    setSelectedItems([]);
  };

  const selectedIncomplete = () => {
    updateSelected({
      selected: selectedItems,
      // isCompleted: false,
    });
    setSelectedItems([]);
  };

  const deleteSelectTodo = () => {
    deleteSelected({ selected: selectedItems });
    setSelectedItems([]);
  };

  console.log(selectedItems);

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: () => selectedComplete(),
      // disabled: listTodo.every((item) => item.isCompleted === true),
    },
    {
      content: "Incomplete",
      onAction: () => selectedIncomplete(),
      // disabled: listTodo.every((item) => item.isCompleted === false),
    },
    {
      content: "Delete",
      onAction: () => deleteSelectTodo(),
    },
  ];
  // console.log(listTodo);
  return (
    <>
      <ResourceList
        resourceName={{
          singular: "todo",
          plural: "todos",
        }}
        promotedBulkActions={promotedBulkActions}
        items={listTodo}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const { id, task, isCompleted } = item;
          return (
            <ResourceItem
              key={task + id}
              id={id}
              accessibilityLabel={`View details for ${task}`}
              name={task}
            >
              <InlineStack blockAlign="center" align="space-between">
                <Text variant="headingSm" as="h6">
                  {task}
                </Text>
                <InlineStack gap="400">
                  <Badge tone={isCompleted === true ? "success" : "attention"}>
                    {isCompleted === true ? "Complete" : "InComplete"}
                  </Badge>
                  <Button
                    disabled={isCompleted}
                    onClick={() => completeClick(id)}
                    tone="success"
                  >
                    Complete
                  </Button>
                  <Button onClick={() => deleteClick(id)} tone="critical">
                    Delete
                  </Button>
                </InlineStack>
              </InlineStack>
            </ResourceItem>
          );
        }}
      />
    </>
  );
};

export default TodoList;
