# AI Writing Assistant

## Tech Stack
- Python
- Streamlit
- Groq LLM API

---

## Overview
AI Writing Assistant is a simple web application that helps users improve and generate text using a large language model.

The application provides three main features:

- **Grammar Fix** – Corrects grammar and improves the text.
- **Email Generator** – Generates a short professional email from a topic.
- **Text Shortener** – Reduces the length of text while keeping the main meaning.

The application is built using **Streamlit for the user interface** and **Groq API for LLM inference**.  
Responses are streamed in real time so the user can see the output appearing progressively.

---

## Challenges Faced

### 1. Unnecessary API Calls
Streamlit reruns the entire script whenever a widget value changes.  
This caused the API to be called multiple times when users typed text or changed the task mode.

**Solution**

A **Generate button** was added and wrap all content in **streamlite form** so the API runs only when the user explicitly requests a response.

---

### 2. Streaming Response Handling
While streaming the LLM response, some chunks returned empty content.

**Solution**

A condition was added to check if content exists before appending it to the response.

---

### 3. UI Layout Alignment
The Generate button was not aligned properly with the text input field.

**Solution**

Streamlit **columns** were used to structure the layout and place the button next to the text area.

---

## Requirements

Create a `requirements.txt` file:

```
streamlit
groq
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the application:

```
streamlit run app.py
```
