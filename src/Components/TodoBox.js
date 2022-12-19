import React, { useState } from "react";
import { Input, Button, Card, Icon, Modal } from "semantic-ui-react";

function TodoBox({ todo, title, setTitle, handleUpdate, handleDelete }) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  return (
    <div className="app__task">
      <Icon
        circular
        inverted
        color="green"
        name="check"
        size="large"
        onClick={() => setComplete(!complete)}
      />

      <Card
        fluid
        color="blue"
        header={todo.title}
        style={{ textDecoration: complete ? "line-through" : "none" }}
      />

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Icon
            circular
            inverted
            color="blue"
            name="pencil"
            size="large"
            onClick={() => setOpen(true)}
          />
        }
      >
        <Modal.Header>Edit your task</Modal.Header>

        <Modal.Content>
          <Input
            placeholder="Add a Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              handleUpdate(todo._id);
              setTitle("");
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>

      <Icon
        circular
        inverted
        color="red"
        name="delete"
        size="large"
        onClick={() => handleDelete(todo._id)}
      />
    </div>
  );
}

export default TodoBox;
