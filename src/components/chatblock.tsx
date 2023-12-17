import { useEffect, useState } from "react"
import "./chatblock.css"
import axios, { AxiosResponse } from "axios";
import { Readable } from "stream";

interface ChatBlockProps {
    input: string,
    sessionId: string
}

export function ChatBlock({ input, sessionId, ...props }: ChatBlockProps) {

    const [assistantReply, setAssistantReply] = useState("");
    const [isRed, setIsRed] = useState(false);

    useEffect(() => {

        const fetchReply = async () => {

            const queryParams = new URLSearchParams({
                "message": input,
                "conversation_id": sessionId
            });
        
            const url = `http://localhost:8000/conversation?${queryParams}`;
        
            const response = await fetch(url);

            if(!response.ok) {
                setIsRed(true);
                const responseBody = await response.json();
                setAssistantReply(`${responseBody.detail}`)
                return;
            }
        
            const stream = response.body;
            const decoder = new TextDecoder();

            if(stream) {
                const reader = stream.getReader();
            
                while (true) {
                    const { done, value } = await reader.read();
            
                    if (done) {
                        break;
                    }

                    const decodedChunk = decoder.decode(value, { stream: true });
                    setAssistantReply(assistantReply => assistantReply + decodedChunk)
                }
            }

        }

        fetchReply()
        
    }, [])
    
    return (
        <>
            <p><span className="title">user</span> : {input}</p>
            <p style={{color: isRed ? "red" : "black"}}><span className="title">assitant</span> : {assistantReply}</p>
        </>
    )

}