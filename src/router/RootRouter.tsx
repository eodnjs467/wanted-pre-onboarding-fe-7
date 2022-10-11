import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import TodoList from "../pages/todo-list";
import { ROUTER } from "./routes";

export default function RootRouter() {
    const ListRoutes = [
        {
            path: ROUTER.TODO_LIST,
            component: <TodoList />,
        },
    ]

    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />

                {ListRoutes.map((page, index) => {
                    return <Route key={index} path={page.path} element={page.component} />
                })}

            </Routes>
        </>
    )
};