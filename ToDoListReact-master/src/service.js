import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/tasks`)    
    return result.data;
  },

  addTask: async (name)=>{
    console.log('addTask', name)
    const result = await axios.post(
    `/tasks`,
    null,
    {
      params: { name }
    }
  );
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });

    // מביאים את כל המשימות
    const tasks = await axios.get(`/tasks`);
    const task = tasks.data.find(t => t.id === id);

    if (!task) return;

    // מעדכנים רק את השדה
    const updatedTask = {
      ...task,
      isComplete: isComplete
    };

    const response = await axios.put(`/tasks/${id}`, updatedTask);
    return response.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    await axios.delete(`/tasks/${id}`);
  }
};
