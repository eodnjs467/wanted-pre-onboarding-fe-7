import { API } from "./api";

const token = localStorage.getItem('USER_TOKEN');

export const createTodo = (data: any) => {
    const url = 'todos';
    return API.post(url, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};

export const getTodos = () => {
    const url = 'todos';
    return API.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updateTodo = (id: number, data: any) => {
    const url = `todos/${id}`;
    // data.map((i) => console.info(i));
    console.info('data : ', data);
    return API.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const deleteTodo = (id:number) => {
    const url = `todos/${id}`;
    return API.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}