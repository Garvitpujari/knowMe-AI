from pathlib import Path
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough



load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
FAISS_PATH = BASE_DIR / "vectorstore" / "faiss_index"


embeddings = HuggingFaceEndpointEmbeddings(
    model="sentence-transformers/all-MiniLM-L6-v2",
    task="feature-extraction"
)


vector_store = FAISS.load_local(
    str(FAISS_PATH),
    embeddings,
    allow_dangerous_deserialization=True
)



retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)


def format_docs(docs):
    return "\n\n".join(
        doc.page_content
        for doc in docs
    )



prompt = ChatPromptTemplate.from_template("""
You are KnowMe AI, a personal knowledge assistant for Garvit Pujari.

Answer the user's question using ONLY the context provided below.

Rules:
- Do not invent information.
- Do not add information that is not in the context.
- Do not create tables unless the user explicitly asks for a table.
- Answer naturally and concisely.
- If the answer is not present in the context, say:
  "I don't have that information in my knowledge base."

Context:
{context}

Question:
{question}

Answer:
""")



llm = ChatGroq(
    model="openai/gpt-oss-120b"
)


parser = StrOutputParser()


rag_chain = (
    {
        "context": retriever | RunnableLambda(format_docs),
        "question": RunnablePassthrough()
    }
    | prompt
    | llm
    | parser
)