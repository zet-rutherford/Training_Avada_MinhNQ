import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

export default function CreateModal({ open, onClose, create }) {
  const [task, setTask] = useState("");
  const addSubmit = () => {
    const data = {
      task: task,
      // isCompleted: false,
    };
    create(data);
    setTask("");
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Todo"
      primaryAction={{
        content: "Add",
        onAction: addSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
      size="small"
    >
      <Modal.Section>
        <Form onSubmit={addSubmit}>
          <FormLayout>
            <TextField
              value={task}
              onChange={(value) => setTask(value)}
              label="Title"
              type="text"
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
