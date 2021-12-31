import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AppBar, IconButton, Toolbar, Typography, ButtonGroup, Button } from '@material-ui/core';
import { OpenCvProvider, useOpenCv } from 'opencv-react'
import FileUpload from './fileupload'

const Content = ({value}) => {
    return (
        <Container>
            {value === 0? 
                <Content1></Content1> 
                : value === 1 ? 
                <Content2></Content2>
                : <Content3></Content3>
            }
        </Container>
    )
};

const Container = styled.div`
    position: absolute;
    // right: 0;
    top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    // color: white;
    // background: black;
    margin-top: 40px;
    text-align: center;
    font-size: 50px;
`;


const CanvasSrc = styled.canvas`
    position: absolute;
    // right: 0;
    left: 0;
    top: 200px;
    // width: 100%;
    width: 640px;
    height: 360px;
    // height: calc(100% - 200px);
    // color: white;
    background: transparent;
    // background-image: url(https://source.unsplash.com/random/640x360?${props => props.imgValue});
    // margin-top: 40px;
    // text-align: center;
    // font-size: 50px;
`;


const Content1 = () => {
    return (
        <div>
            <Typography variant='h3' color='primary'>Welcome to kwoncy's severless web app</Typography>
            <Typography variant='h3' color='secondary'>kwoncy 의 서버리스 웹앱입니다</Typography>
            <Typography variant='h3'>kwoncyのサバリスウェブアップルです</Typography>
            <br></br>
            <Typography variant='h3' color='primary'>This web app is made for my portfolio</Typography>
            <Typography variant='h3' color='secondary'>저의 포트폴리오 용도로 만들어 졌습니다</Typography>
            <Typography variant='h3'>私のポートフォリオぉ為に作られました</Typography>
            <br></br>
            <Typography variant='h2'>Made by using React, hooks, material-ui, aws s3, aws lambda, opencv.js</Typography>
            <br></br>
            <Typography variant='h3' color='primary'>In this web app, you can try load some random images then convert, save and upload it to my aws s3 bucket</Typography>
            <Typography variant='h3' color='secondary'>이 웹앱에서는 랜덤이미지 로딩, 변환, 저장 후 aws s3 버킷에 업로드 할 수 있습니다</Typography>
            <Typography variant='h3'>このウェブアップルぉ使っでランダムイメージぉローディング、変換、セーブ、アップロードができます</Typography>
            <br></br>
            <Typography variant='h3' color='primary'>Since this app is supported by aws freetier account, uploading to my bucket is only valid on particular day</Typography>
            <Typography variant='h3' color='secondary'>aws 프리티어 사용량 내에서 사용되어야 하므로 버킷에 업로드 하는것은 특정한 날에만 유효합니다</Typography>
            <Typography variant='h3'>awsフリチアアカウントだから、アプロードゎ特別な日にできます</Typography>
        </div>
    )
}

const Content2 = () => {
    return (
        <div>
            <Typography>you can see my github</Typography>
            <a href='https://github.com/kwoncy2020'>https://github.com/kwoncy2020</a>
        </div>
    )
}

const Content3 = () => {
    const { loaded, cv } = useOpenCv()
    const [ imgValue, setImgValue ] = useState();
    const [ cvtValue, setCvtValue ] = useState();
    const onSetImage = (e) => {
        let text = e.target.innerHTML;
        text = text.slice(7);
        text = text.toLowerCase();
        if (text === 'image'){
            text = ''
            // text = 'any'
        }
        // console.log(text);
        setImgValue(text);
        let img = document.getElementById('img3');

        img.src = `https://source.unsplash.com/random/640x360?${text}`;
        // img.src=`https://placeimg.com/640/360/${text}`
        
        img.setAttribute('crossOrigin', '');
    }
    const onCvtImage = (e) => {
        if (cv){
            let text = e.target.innerHTML;
            console.log(text);
            setCvtValue(text);

            let imgElement = document.getElementById('img3');
            let dstElement = document.getElementById('canvas3');
            // dstElement.setAttribute('crossOrigin', '');
            let src = cv.imread('img3');
            let dst = new cv.Mat();
            
            if (text === 'original'){
                dst = src
            }
            if (text === 'gray'){
                cv.cvtColor(src,dst,cv.COLOR_RGBA2GRAY,0);
            }
            if (text === 'canny edge'){
                cv.cvtColor(src,src,cv.COLOR_RGBA2GRAY,0);
                cv.Canny(src, dst, 50, 100, 3, false);
            }
            if (text === 'adaptive threshold'){
                cv.cvtColor(src,src,cv.COLOR_RGBA2GRAY,0);
                cv.adaptiveThreshold(src, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
            }

            cv.imshow("canvasDst", dst);
            src.delete();
            dst.delete();
        }
    }
    useEffect(() => {
        if (cv) {
            // console.log("cv on") 
        }
    }, [cv])

    const onSaveImg = (e) => {
        const canvas = document.getElementById('canvasDst')
        const link = document.createElement('a');
        link.download = 'myCvtImg.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    return (
        <div>
            <Typography>buttons for load image</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={onSetImage}>random image</Button>
                <Button onClick={onSetImage}>random nature</Button>
                <Button onClick={onSetImage}>random tech</Button>
                <Button onClick={onSetImage}>random people</Button>
                <Button onClick={onSetImage}>random animal</Button>
            </ButtonGroup>
            <br></br><br></br>
            <img id="img3" alt="no image" width='640px' height='360px'></img>
            <br></br><br></br>
            <Typography>buttons for image processing by opencv.js</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={onCvtImage}>original</Button>
                <Button onClick={onCvtImage}>gray</Button>
                <Button onClick={onCvtImage}>canny edge</Button>
                <Button onClick={onCvtImage}>adaptive threshold</Button>
            </ButtonGroup>
            <br></br><br></br>
            {/* <CanvasSrc id="canvasSrc" imgValue={imgValue}></CanvasSrc> */}
            <canvas id="canvasDst"></canvas>
            <br></br>
            <div>
            <Typography>download the converted image </Typography>
                <button id="btnSaveImg" onClick={onSaveImg}>download</button>
            </div>
            <FileUpload></FileUpload>
            <Typography>upload the selected file to my aws s3 bucket through aws lambda </Typography>
        </div>
    )
}

export default Content;

