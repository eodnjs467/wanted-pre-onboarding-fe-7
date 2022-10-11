import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { text } from "stream/consumers";
import { LoginService } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../router/routes";


export default function Login() {
    const navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //로컬 스토리지 토큰 있을 시, /todo 경로 이동
    useEffect(() => {
        if(localStorage.getItem('USER_TOKEN')){
            navigation(ROUTER.TODO_LIST);
        }
    }, []);

    const handleSubmit = async () => {
        try{
            const res = await LoginService.signUp({
                email,
                password,
            });
            if(res.status===201){
                console.info('res : ', res);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const handleLogin = async () => {
        try{
            const res = await LoginService.signIn({
                email,
                password,
            });

            if(res.status === 200){     // 로그인 성공시, todo 페이지 이동 & 세션 저장
                localStorage.setItem('USER_TOKEN', res.data.access_token);
                navigation(ROUTER.TODO_LIST);
            }
        } catch (error) { 
            console.log('error : ', error)
            
        }
    }

    
    return(
        <>
            <div>
                <h1>로그인 </h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        id="outlined-basic" 
                        variant="outlined" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />
                    <label>비밀번호 : </label>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button variant="contained" onClick={handleLogin}>로그인</Button>
                    <Button variant="contained" onClick={handleSubmit}>회원가입</Button>
                </form>
            </div>
            <div>
                아이디가 없을 시, 입력한 아이디로 자동가입 됩니다.
            </div>
        </>
    )
};