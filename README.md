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

## Code

```python
import streamlit as st
from groq import Groq

st.set_page_config(layout="wide")

client = Groq(api_key="")

col1, col2 = st.columns([1,2])

with col1:
    mode = st.radio(
        "Task",
        ["Email", "Grammar", "Shorten"],
        horizontal=True
    )

with col2:
    context = st.text_input(
        "Context",
        "Use simple Indian English and avoid complex words."
    )

text_col, button_col = st.columns([8,1])

with text_col:
    text = st.text_area("Enter your text")

with button_col:
    st.write("")
    st.write("")
    generate = st.button("Generate")

if generate and len(text.strip()) > 5:

    if mode == "Grammar":
        prompt = f"""{context}
Fix grammar of the following text.

Text:
{text}
"""

    elif mode == "Email":
        prompt = f"""{context}
Write a professional email and must be very concise and if possible 2–3 lines.

Topic:
{text}
"""

    elif mode == "Shorten":
        prompt = f"""{context}
Make the following text shorter.

Text:
{text}
"""

    with st.spinner("AI is writing..."):

        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )

        st.subheader("Result")
        result_placeholder = st.empty()

        full_response = ""

        for chunk in stream:
            if chunk.choices[0].delta.content:
                full_response += chunk.choices[0].delta.content
                result_placeholder.markdown(full_response)
```

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
