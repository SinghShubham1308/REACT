import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Button } from '@mui/material';
import TaskApi from '../APIs/ApiClient';
import TaskService from '../APIs/TaskService';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        TaskService.getTasks()
            .then(response => setTasks(response.data))
            .catch(error => console.error("There was an error fetching the tasks!", error));
    }, []);

    return (
        <Container>
            <h2>Task List</h2>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id}>
                        <ListItemText
                            primary={task.title}
                            secondary={`Priority: ${task.priority}, Status: ${task.status}`}
                        />
                        <Button variant="contained" color="primary" onClick={() => alert(`Task ID: ${task.id}`)}>
                            View
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TaskList;
