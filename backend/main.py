from fastapi import FastAPI
from pydantic import BaseModel

from rag import rag_chain


app = FastAPI()


class ChatRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "KnowMe AI backend is running"}


@app.post("/chat")
def chat(request: ChatRequest):
    answer = rag_chain.invoke(request.question)

    return {
        "answer": answer
    }