import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TaskApi from '../APIs/ApiClient';


const CreateTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'LOW',
        status: 'PENDING',
        dueDate: '',
        assignee: { id: 2 } // assuming assignee id is 2, you can update dynamically
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        TaskApi.createTask(task)
            .then(response => {
                console.log("Task created successfully:", response.data);
                // Optionally redirect or reset form
            })
            .catch(error => console.error("There was an error creating the task!", error));
    };

    return (
        <Container>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={task.dueDate}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Create Task
                </Button>
            </form>
        </Container>
    );
};

export default CreateTask;
