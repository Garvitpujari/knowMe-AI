from fastapi import FastAPI
from pydantic import BaseModel

from rag import rag_chain


app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)


class ChatRequest(BaseModel):
    question: str


@app.get("/api")
def home():
    return {"message": "KnowMe AI backend is running"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    answer = rag_chain.invoke(request.question)

    return {
        "answer": answer
    }