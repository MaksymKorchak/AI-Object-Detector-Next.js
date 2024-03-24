"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import { renderPredictions } from "@/utils/render-predictions";
import * as tf from "@tensorflow/tfjs";


let detectInterval;

export const ObjectDetection = () => {

    const [isLoading, setIsLoading] = useState(true);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runCoco = async () => {
        setIsLoading(true);
        const model = await cocoSSDLoad();
        setIsLoading(false);

        detectInterval = setInterval(() => runObjectDetection(model),500);
    };

    async function runObjectDetection(model) {
        if(canvasRef.current && webcamRef.current && webcamRef.current.video?.readyState === 4) {
            const {videoWidth, videoHeight} = webcamRef.current.video;
            [canvasRef.current.width, canvasRef.current.height] = [videoWidth, videoHeight];

            //Find detected objects
            const predictions = await model.detect(webcamRef.current.video, undefined, 0.6);

            //Draw detected objects
            const context = canvasRef.current.getContext("2d");
            renderPredictions(predictions, context);
        }
    };

    const showMyVideo = () => {
        if(webcamRef.current && webcamRef.current.video?.readyState === 4) {
            const {videoWidth, videoHeight} = webcamRef.current.video;
            [webcamRef.current.video.width,webcamRef.current.video.height] = [videoWidth,videoHeight];
        }
    };

    useEffect(() => {
        runCoco();
        showMyVideo();
    },[]);

    return (
        <div className="mt-8">
            {isLoading && <p className="text-center gradient-title mb-5">Loading AI Model ...</p>}
            <div className="flex justify-center items-center relative gradient p-1.5 rounded-lg">
                <Webcam 
                    ref={webcamRef}
                    className="rounded-xl w-full lg:h-[550px]" 
                    muted={true}
                />
                <canvas
                    ref = {canvasRef}
                    className="absolute top-0 left-0 rounded-xl w-full lg:h-[550px] z-50"
                />
            </div>
        </div>
    )
};