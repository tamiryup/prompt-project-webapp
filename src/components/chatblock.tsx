import { useEffect, useState } from "react"
import "./chatblock.css"

interface ChatBlockProps {
    input: string,
    sessionId: string
}

export function ChatBlock({ input, sessionId, ...props }: ChatBlockProps) {

    const [assistantReply, setAssistantReply] = useState("");
    
    return (
        <>
            <p><span className="title">user</span> : {input}</p>
        </>
    )

}