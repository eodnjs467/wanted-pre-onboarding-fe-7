import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../router/routes";
import { TodoService } from "../../services";

export default function TodoList(){
    const navigation = useNavigate();
    const [text, setText] = useState('');
    const [updateTodo, setUpdateTodo] = useState('');
    
    const [todoList, setTodoList] = useState([{
        id: null,
        todo: '',
        isCompleted: false,
        userId: null,
        updateYn: false,
    }]);

    useEffect(() => {
        console.info('localStorage : ', localStorage.getItem('USER_TOKEN'));
    }, [localStorage]);

    useEffect(() => {
        if(!localStorage.getItem('USER_TOKEN')){
            navigation(ROUTER.LOGIN);
            return;
        };

        getTodoList();
        return() => {};
    }, []);

    const getTodoList = async () => {
        try{
            const res = await TodoService.getTodos();
            if(res.status === 200) {
                setTodoList(res.data);
            }
        }catch(error) {
            console.info(error);
        }
    }

    const addTodoList = async () => {
        try{
            const res = await TodoService.createTodo({
                todo: text,
            });
            if(res.status===201){
                getTodoList();
                setText('');
            }else{
                console.info(res.status);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const updateTodoList = async (id: any) => {
        setUpdateTodo('');
        try{
            const res = await TodoService.updateTodo(id, {
                todo: updateTodo,
                isCompleted: true,          //todoList[index].isCompleted,
            });
            if(res.status===200){
                getTodoList();
            }else{
                console.info(res.status);
            }
        }catch(error){
            console.log('error : ', error);
        }

    }

    const onChangeText = (e: any) =>{
        setUpdateTodo(e.target.value);
    }

    const updateButton = (id: any) => {
        setTodoList(todoList.map(i => i.id === id ? {...i, updateYn: !i.updateYn} : i));

    }

    const deleteTodoList = (id: any) => {
        TodoService.deleteTodo(id);
    }

    return(
        <div>
            <ul>
                {todoList.map((item, index) => (
                    <li key={index}>
                      {!!item.isCompleted ? '완료' : ''}
                      {!!!item.updateYn ? (
                        <>
                            <input value={item.todo} readOnly style={{border: 0}} onClick={() => {
                            }} /> 
                            <button onClick={() => updateButton(item.id)}>수정</button>
                            <button onClick={() => deleteTodoList(item.id)}>삭제</button>
                            <br/>
                        </>
                        ) : (
                        <>
                            <input value={updateTodo} onChange={onChangeText} />
                            <button onClick={() => updateTodoList(item.id)}>제출</button>
                            <button onClick={() => updateButton(item.id)}>취소</button>
                            <br />
                        </>
                        )}
                    </li>
                ))}
            </ul>
            <textarea value={text} onChange={e => setText(e.target.value)} />
            <button onClick={addTodoList}> 추가 (+)</button>
        </div>
    )
}
