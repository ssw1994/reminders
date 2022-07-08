import "./App.css";
import { Button, TextField } from "@material-ui/core";
import { useFormGroup } from "./hooks/use-form-group";
import Validator from "./utils/Validator";
import axios from "axios";
import { useState } from "react";

const httpInstance = axios.create({
  baseURL: "/reminder",
  headers: {
    "Content-Type": "application/json",
  },
});
function App() {
  const [errorState, setErrorState] = useState(null);
  const [reminderForm, updateReminderForm, clearForm, runValidator] =
    useFormGroup({
      Title: {
        value: "",
        validation: {
          required: true,
          msgs: {
            required: "Title is required",
          },
        },
      },
      Message: {
        value: "",
        validation: {
          required: true,
          msgs: {
            required: "Message is required",
          },
        },
      },
      SendTime: {
        value: "",
        validation: {
          required: true,
          msgs: {
            required: "Send Time is required",
          },
        },
      },
      UserId: {
        value: "",
        validation: {
          required: true,
          msgs: {
            required: "Email is required",
          },
        },
      },
    });

  const Title = (
    <div>
      <TextField
        id="Title"
        value={reminderForm.Title.value}
        onChange={updateReminderForm}
        label="Title"
        variant="outlined"
        helperText={reminderForm.Title?.errorMessage}
      />
    </div>
  );

  const Message = (
    <div>
      <TextField
        id="Message"
        value={reminderForm.Message.value}
        onChange={updateReminderForm}
        label="Message"
        variant="outlined"
        helperText={reminderForm.Message?.errorMessage}
      />
    </div>
  );

  const SendTime = (
    <div>
      <TextField
        id="SendTime"
        value={reminderForm.SendTime.value}
        onChange={updateReminderForm}
        label="Send Time"
        type="datetime-local"
        variant="outlined"
        helperText={reminderForm.SendTime?.errorMessage}
      />
    </div>
  );

  const UserId = (
    <div>
      <TextField
        id="UserId"
        value={reminderForm.UserId.value}
        onChange={updateReminderForm}
        label="Email"
        type="email"
        variant="outlined"
        helperText={reminderForm.UserId?.errorMessage}
      />
    </div>
  );

  const save = function () {
    runValidator();
    const isValid = Validator.isFormValid(reminderForm);
    if (isValid) {
      const { Title, Message, SendTime, UserId } = reminderForm;
      const record = {
        Title: Title.value,
        Message: Message.value,
        SendTime: SendTime.value,
        UserId: UserId.value,
      };
      httpInstance
        .post("/add", record)
        .then(() => {
          setErrorState({
            message: "Reminder Saved Successfully",
            isError: false,
          });
          setTimeout(() => {
            clearForm();
            setErrorState(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorState({
            message: "Error in saving reminder",
            isError: true,
          });
          setTimeout(() => {
            setErrorState(null);
          }, 5000);
        });
    }
  };

  if (errorState) {
    return errorState.message;
  }

  return (
    <div className="App">
      <div class="input-controls">
        {Title}
        {Message}
        {SendTime}
        {UserId}
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={() => save()}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default App;
